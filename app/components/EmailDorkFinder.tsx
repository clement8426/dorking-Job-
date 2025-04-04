'use client';

import { useState } from 'react';
import { ClipboardDocumentIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

// Données simplifiées
const COMPANY_DOMAINS = [
  "airbus.com",
  "thalesgroup.com",
  "safran-group.com",
  "dassault-aviation.com",
  "renault-group.fr",
];

export function EmailDorkFinder() {
  const [keyword, setKeyword] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const [customDomain, setCustomDomain] = useState('');
  const [generatedQueries, setGeneratedQueries] = useState<string[]>([]);

  const generateQueries = () => {
    if (!keyword || (!selectedDomain && !customDomain)) return;

    const domain = selectedDomain || customDomain;
    const newQueries = [
      `site:${domain} "${keyword}" "@${domain}"`,
      `site:linkedin.com/in/ "${keyword}" "${domain}" email OR mail`,
      `site:${domain} (contact OR "nous contacter") intext:@${domain}`,
    ];

    setGeneratedQueries(newQueries);
  };

  const copyQuery = (query: string) => {
    navigator.clipboard.writeText(query);
  };

  const searchOnGoogle = (query: string) => {
    window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">EmailHunter Pro</h1>
      <p className="text-gray-400 mb-6">
        Recherche d&apos;emails professionnels
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg shadow">
          <div className="mb-4">
            <label htmlFor="keyword" className="block text-sm font-medium mb-2">
              Mot-clé de recherche <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="keyword"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Ex: RH, recrutement..."
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="domain" className="block text-sm font-medium mb-2">
              Domaine d&apos;entreprise
            </label>
            <select
              id="domain"
              value={selectedDomain || ''}
              onChange={(e) => setSelectedDomain(e.target.value || null)}
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded mb-2"
            >
              <option value="">Sélectionner ou saisir ci-dessous</option>
              {COMPANY_DOMAINS.map((domain) => (
                <option key={domain} value={domain}>
                  {domain}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={customDomain}
              onChange={(e) => setCustomDomain(e.target.value)}
              placeholder="Domaine personnalisé (ex: entreprise.com)"
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded"
            />
          </div>

          <button
            onClick={generateQueries}
            disabled={!keyword || (!selectedDomain && !customDomain)}
            className="w-full py-3 bg-blue-600 text-white rounded-md flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <MagnifyingGlassIcon className="h-5 w-5" />
            Générer des requêtes
          </button>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Requêtes générées</h2>
          {generatedQueries.length > 0 ? (
            <div className="space-y-4">
              {generatedQueries.map((query, index) => (
                <div key={index} className="p-4 bg-gray-800 rounded-lg shadow">
                  <p className="font-mono text-sm mb-3 break-all">{query}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => copyQuery(query)}
                      className="flex items-center gap-1 text-xs py-1.5 px-3 bg-gray-700 rounded"
                    >
                      <ClipboardDocumentIcon className="h-4 w-4" />
                      Copier
                    </button>
                    <button
                      onClick={() => searchOnGoogle(query)}
                      className="flex items-center gap-1 text-xs py-1.5 px-3 bg-blue-900 text-blue-200 rounded"
                    >
                      <MagnifyingGlassIcon className="h-4 w-4" />
                      Rechercher sur Google
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 bg-gray-800 rounded-lg text-center">
              <p className="text-gray-400">Générez des requêtes pour voir les résultats ici</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
