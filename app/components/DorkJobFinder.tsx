'use client';

import { useState, useEffect } from 'react';
import { ClipboardDocumentIcon, MagnifyingGlassIcon, MapPinIcon, BuildingOfficeIcon, BookmarkIcon, PlusCircleIcon, XMarkIcon, QuestionMarkCircleIcon, LightBulbIcon } from '@heroicons/react/24/outline';
import { TutorialModal } from './TutorialModal';

// Catégories de mots-clés pour l'ingénierie mécanique
const KEYWORD_CATEGORIES = [
  {
    id: 'software',
    name: 'Logiciels',
    keywords: [
      "CATIA",
      "CATIA V5",
      "CATIA VR",
      "ADAMS",
      "ABAQUS",
      "SOLIDWORKS",
      "3DEXPERIENCE",
      "ACTRAN",
      "MATLAB",
      "SOLIDEDGE",
      "JAVA",
      "PACK OFFICE",
      "CAD",
      "CAO",
      "ANSYS",
      "SIMULIA",
      "NASTRAN",
      "HYPERMESH",
      "ALTAIR",
      "SIEMENS NX",
      "FUSION 360",
      "AUTOCAD",
      "CREO",
      "INVENTOR",
    ]
  },
  {
    id: 'skills',
    name: 'Compétences techniques',
    keywords: [
      "conception mécanique",
      "simulation mécanique",
      "dimensionnement",
      "calcul mécanique",
      "solides rigides",
      "solides déformables",
      "rétroingénierie",
      "impression 3D",
      "machines spéciales",
      "analyse vibratoire",
      "calcul de fatigue",
      "analyse thermique",
      "mécanique des fluides",
      "résistance des matériaux",
      "élastoplasticité",
      "flambement",
      "grande déformation",
      "éléments finis",
      "analyse modale",
      "assemblages boulonnés",
      "modélisation numérique",
      "choix de matériaux",
      "usinage",
      "fonderie",
    ]
  },
  {
    id: 'domains',
    name: 'Domaines d\'application',
    keywords: [
      "aéronautique",
      "automobile",
      "naval",
      "spatial",
      "énergie",
      "pétrole",
      "gaz",
      "hydraulique",
      "flexibles hydrauliques",
      "industrie lourde",
      "ferroviaire",
      "défense",
      "nucléaire",
      "biomécanique",
      "robotique",
      "construction",
      "production industrielle",
      "sous-marin",
      "satellite",
      "pyrolyse",
      "vibration",
      "dentelle",
      "textile",
    ]
  },
  {
    id: 'positions',
    name: 'Postes recherchés',
    keywords: [
      "ingénieur mécanique",
      "ingénieur calcul",
      "ingénieur bureau d'études",
      "ingénieur R&D",
      "ingénieur structure",
      "chef de projet mécanique",
      "ingénieur conception",
      "ingénieur procédés",
      "ingénieur matériaux",
      "ingénieur simulation",
      "ingénieur production",
      "ingénieur méthodes",
      "ingénieur qualité",
      "responsable technique",
      "ingénieur essais",
      "ingénieur industrialisation",
      "ingénieur développement",
      "ingénieur d'affaires",
      "expert technique",
      "consultant technique",
    ]
  },
];

// Sites populaires d'offres d'emploi
const JOB_SITES = [
  "careers.veolia.com",
  "jobs.engie.com",
  "careers.thalesgroup.com",
  "airbus.com/careers",
  "jobs.safran-group.com",
  "careers.valeo.com",
  "jobs.alstom.com",
  "jobs.naval-group.com",
  "stellantis.com/fr/carriere",
  "renault-group.fr/carriere",
  "careers.dassault-aviation.com",
  "edf.fr/carriere",
  "michelin.fr/carrieres",
  "orano.group/fr/carrieres",
  "arianegroup.com/fr/carrieres",
  "sncf.com/fr/emploi",
  "careers.3ds.com", // Dassault Systèmes
  "fr.linkedin.com/jobs",
  "indeed.fr",
  "apec.fr",
  "welcometothejungle.com",
  "monster.fr",
  "regionsjob.com",
];

// Villes françaises importantes avec industries mécaniques
const CITIES = [
  "Paris",
  "Lyon",
  "Toulouse",
  "Marseille",
  "Nantes",
  "Bordeaux",
  "Lille",
  "Strasbourg",
  "Grenoble",
  "Clermont-Ferrand",
  "Belfort",
  "Valenciennes",
  "Saint-Nazaire",
  "Le Havre",
  "Valence",
  "Alès",
  "Chasseneuil-du-Poitou",
  "Villeurbanne",
  "Poitiers",
  "Ambonil",
];

// Grandes entreprises d'ingénierie mécanique
const COMPANIES = [
  "Safran",
  "Airbus",
  "Dassault Aviation",
  "Dassault Systèmes",
  "Thales",
  "Naval Group",
  "Alstom",
  "Renault",
  "Stellantis",
  "PSA",
  "Valeo",
  "Faurecia",
  "Michelin",
  "Schneider Electric",
  "EDF",
  "Orano",
  "Hydrosystem",
  "Avnir Energy",
  "Desimone",
  "Fluiconnecto",
  "Manuli",
  "Total",
  "Saint-Gobain",
  "Air Liquide",
  "Ariane Group",
  "SNCF",
];

// Types de formats de documents
const FILE_FORMATS = [
  { value: "pdf", label: "PDF" },
  { value: "doc OR docx", label: "Word" },
  { value: "ppt OR pptx", label: "PowerPoint" },
  { value: "xls OR xlsx", label: "Excel" },
  { value: "dwg", label: "AutoCAD" },
  { value: "sldprt OR sldasm", label: "SolidWorks" },
  { value: "catpart OR catproduct", label: "CATIA" },
  { value: "igs OR iges", label: "IGES" },
  { value: "stp OR step", label: "STEP" },
  { value: "stl", label: "STL" },
];

// Types de requêtes Dork avancées
const DORK_TYPES = [
  {
    id: 'site_keyword',
    name: "Site avec mot-clé",
    template: 'site:${site} "${keyword}"',
    description: "Recherche un mot-clé sur un site spécifique"
  },
  {
    id: 'intitle',
    name: "Dans le titre",
    template: 'intitle:"${keyword}" "offre emploi" site:.fr',
    description: "Recherche les pages dont le titre contient le mot-clé"
  },
  {
    id: 'inurl',
    name: "Dans l'URL",
    template: '"recrutement" intitle:${keyword} inurl:job OR inurl:career OR inurl:emploi',
    description: "Recherche les pages dont l'URL contient job/career/emploi"
  },
  {
    id: 'job_offer',
    name: "Offre d'emploi",
    template: '"offre d\'emploi" "${keyword}" site:.fr',
    description: "Recherche des offres d'emploi avec le mot-clé"
  },
  {
    id: 'location_based',
    name: "Par localisation",
    template: '"${keyword}" "${location}" "recrutement" OR "nous recrutons" OR "offre emploi"',
    description: "Recherche par mot-clé et localisation"
  },
  {
    id: 'company_based',
    name: "Par entreprise",
    template: '"${company}" "${keyword}" "postuler" OR "candidature" OR "rejoignez-nous"',
    description: "Recherche par entreprise et mot-clé"
  },
  {
    id: 'specific_format',
    name: "Format spécifique",
    template: 'filetype:${filetype} "${keyword}" "CV" OR "candidature" OR "recrutement"',
    description: "Recherche des documents d'un format spécifique"
  },
  {
    id: 'exclude_sites',
    name: "Exclure sites",
    template: '"${keyword}" "offre emploi" -site:linkedin.com -site:indeed.com',
    description: "Recherche en excluant les grands sites d'emploi"
  },
  {
    id: 'recent_results',
    name: "Résultats récents",
    template: '"${keyword}" "recrutement" after:${date}',
    description: "Recherche des résultats après une date donnée"
  },
  {
    id: 'experience_level',
    name: "Niveau d'expérience",
    template: '"${keyword}" "${experience}" "offre emploi" OR "recrutement"',
    description: "Recherche par niveau d'expérience"
  },
  {
    id: 'mechanical_specific',
    name: "Ingénierie mécanique",
    template: '"${keyword}" "ingénieur" ("CATIA" OR "SOLIDWORKS" OR "ABAQUS" OR "calcul" OR "conception")',
    description: "Recherche spécifique pour l'ingénierie mécanique"
  }
];

// Niveaux d'expérience
const EXPERIENCE_LEVELS = [
  "débutant",
  "junior",
  "confirmé",
  "senior",
  "expert",
  "0-2 ans",
  "2-5 ans",
  "5-10 ans",
  "+10 ans",
  "stage",
  "alternance",
  "jeune diplômé"
];

export function DorkJobFinder() {
  const [keyword, setKeyword] = useState('');
  const [customKeyword, setCustomKeyword] = useState('');
  const [customQuery, setCustomQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('positions');
  const [selectedSite, setSelectedSite] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [selectedFileType, setSelectedFileType] = useState<string | null>(null);
  const [selectedDorkType, setSelectedDorkType] = useState<string>('site_keyword');
  const [selectedExperience, setSelectedExperience] = useState<string | null>(null);
  const [customDate, setCustomDate] = useState<string>(() => {
    const date = new Date();
    date.setMonth(date.getMonth() - 1); // 1 mois en arrière par défaut
    return date.toISOString().split('T')[0];
  });
  const [generatedQueries, setGeneratedQueries] = useState<string[]>([]);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [savedQueries, setSavedQueries] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [userKeywords, setUserKeywords] = useState<string[]>([]);
  const [isTutorialOpen, setIsTutorialOpen] = useState(true); // Ouvrir le tutoriel par défaut

  // Charger l'historique et les requêtes sauvegardées depuis localStorage au chargement initial
  useEffect(() => {
    const savedHistory = localStorage.getItem('searchHistory');
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }

    const savedQueryList = localStorage.getItem('savedQueries');
    if (savedQueryList) {
      setSavedQueries(JSON.parse(savedQueryList));
    }

    const savedUserKeywords = localStorage.getItem('userKeywords');
    if (savedUserKeywords) {
      setUserKeywords(JSON.parse(savedUserKeywords));
    }
  }, []);

  // Sauvegarder l'historique, les requêtes sauvegardées et les mots-clés utilisateur
  useEffect(() => {
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  }, [searchHistory]);

  useEffect(() => {
    localStorage.setItem('savedQueries', JSON.stringify(savedQueries));
  }, [savedQueries]);

  useEffect(() => {
    localStorage.setItem('userKeywords', JSON.stringify(userKeywords));
  }, [userKeywords]);

  const addCustomKeyword = () => {
    if (customKeyword.trim() && !userKeywords.includes(customKeyword.trim())) {
      setUserKeywords(prev => [customKeyword.trim(), ...prev]);
      setCustomKeyword('');
    }
  };

  const removeUserKeyword = (keywordToRemove: string) => {
    setUserKeywords(prev => prev.filter(kw => kw !== keywordToRemove));
  };

  const generateQueries = () => {
    if (!keyword && !customQuery) return;

    let newQueries: string[] = [];

    // Si une requête personnalisée est fournie, l'utiliser directement
    if (customQuery) {
      newQueries = [customQuery];
    } else {
      // Sinon, générer des requêtes basées sur le mot-clé et les autres paramètres
      const selectedDork = DORK_TYPES.find(dork => dork.id === selectedDorkType);

      if (selectedDork) {
        let query = selectedDork.template;

        // Remplacer les variables dans le template
        if (query.includes('${keyword}')) {
          query = query.replace(/\${keyword}/g, keyword);
        }

        if (query.includes('${site}') && selectedSite) {
          query = query.replace(/\${site}/g, selectedSite);
        } else if (query.includes('${site}')) {
          query = query.replace(/\${site}/g, JOB_SITES[0]);
        }

        if (query.includes('${location}') && selectedLocation) {
          query = query.replace(/\${location}/g, selectedLocation);
        } else if (query.includes('${location}')) {
          query = query.replace(/\${location}/g, "France");
        }

        if (query.includes('${company}') && selectedCompany) {
          query = query.replace(/\${company}/g, selectedCompany);
        } else if (query.includes('${company}')) {
          query = query.replace(/\${company}/g, COMPANIES[0]);
        }

        if (query.includes('${filetype}') && selectedFileType) {
          query = query.replace(/\${filetype}/g, selectedFileType);
        } else if (query.includes('${filetype}')) {
          query = query.replace(/\${filetype}/g, "pdf");
        }

        if (query.includes('${date}')) {
          query = query.replace(/\${date}/g, customDate);
        }

        if (query.includes('${experience}') && selectedExperience) {
          query = query.replace(/\${experience}/g, selectedExperience);
        } else if (query.includes('${experience}')) {
          query = query.replace(/\${experience}/g, "débutant OR confirmé");
        }

        newQueries.push(query);
      }

      // En mode avancé, génération améliorée avec des requêtes plus précises
      // Toujours actif car advancedMode est true par défaut maintenant
      // Ajouter une requête avec la localisation si elle est sélectionnée
      if (selectedLocation) {
        newQueries.push(`"${keyword}" "${selectedLocation}" ("emploi" OR "recrutement" OR "job" OR "offre d'emploi" OR "poste")`);

        // Combiner avec le type de fichier si sélectionné
        if (selectedFileType) {
          newQueries.push(`filetype:${selectedFileType} "${keyword}" "${selectedLocation}" ("emploi" OR "recrutement")`);
        }
      }

      // Ajouter une requête avec l'entreprise si elle est sélectionnée
      if (selectedCompany) {
        newQueries.push(`"${selectedCompany}" "${keyword}" ("postuler" OR "candidature" OR "rejoignez-nous" OR "nous recrutons")`);

        // Requête plus spécifique pour les sites d'entreprises
        const companyNormalized = selectedCompany.toLowerCase().replace(/\s+/g, '');
        newQueries.push(`site:${companyNormalized}.com OR site:${companyNormalized}.fr "${keyword}" ("carrières" OR "careers" OR "emploi" OR "jobs")`);
      }

      // Ajouter des requêtes spécifiques aux logiciels de CAO si le mot-clé est technique
      const softwareKeywords = KEYWORD_CATEGORIES.find(c => c.id === 'software')?.keywords || [];
      const isCADRelated = softwareKeywords.some(sw => keyword.toUpperCase().includes(sw.toUpperCase()));
      if (isCADRelated) {
        newQueries.push(`"${keyword}" ("ingénieur" OR "engineer") ("modélisation" OR "conception" OR "CAO" OR "CAD")`);
      }

      // Expertise spécifique en mécanique
      newQueries.push(`"${keyword}" ("mécanique" OR "mechanical") ("ingénieur" OR "engineer") -"formation" -"stage terminé"`);

      // Sites d'emploi spécialisés en ingénierie (une sélection aléatoire de 3 sites)
      const engineeringJobSites = JOB_SITES.filter(site =>
        site.includes('careers') ||
        site.includes('jobs') ||
        site.includes('carriere')
      );

      const randomSites = engineeringJobSites
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);

      randomSites.forEach(site => {
        newQueries.push(`site:${site} "${keyword}" ("ingénieur" OR "engineer" OR "mécanique" OR "mechanical")`);
      });

      // Pour les résultats récents avec date plus précise
      newQueries.push(`"${keyword}" ("emploi" OR "recrutement" OR "job") after:${customDate}`);

      // Requête excluant les grands sites d'emploi génériques pour trouver des sites spécifiques
      newQueries.push(`"${keyword}" "ingénieur" "offre" -site:linkedin.com -site:indeed.com -site:monster.fr -site:welcometothejungle.com`);

      // Requête incluant des compétences spécifiques
      if (selectedExperience) {
        newQueries.push(`"${keyword}" "${selectedExperience}" ("compétences" OR "savoir-faire" OR "expertise")`);
      }
    }

    // Filtrer les doublons et limiter à 8 requêtes maximum pour éviter la surcharge
    newQueries = [...new Set(newQueries)];
    if (newQueries.length > 8) {
      newQueries = newQueries.slice(0, 8);
    }

    setGeneratedQueries(newQueries);

    // Ajouter à l'historique si c'est un nouveau mot-clé
    if (keyword && !searchHistory.includes(keyword)) {
      setSearchHistory(prev => [keyword, ...prev.slice(0, 9)]);
    }
  };

  const copyQuery = (query: string, index: number) => {
    navigator.clipboard.writeText(query);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const previewOnGoogle = (query: string) => {
    window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
  };

  const searchCurrentKeyword = () => {
    if (keyword) {
      window.open(`https://www.google.com/search?q=${encodeURIComponent(keyword)}`, '_blank');
    }
  };

  const saveQuery = (query: string) => {
    if (!savedQueries.includes(query)) {
      setSavedQueries(prev => [query, ...prev]);
    }
  };

  const deleteSavedQuery = (index: number) => {
    setSavedQueries(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      {/* Entête avec le titre et bouton de tutoriel */}
      <div className="flex justify-between items-center mb-6 bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700">
        <div>
          <h1 className="text-3xl font-bold text-blue-400">DorkJobFinder Pro</h1>
          <p className="text-gray-400">
            Générateur avancé de requêtes Google pour trouver des offres d&apos;emploi en ingénierie mécanique
          </p>
          <p className="text-gray-500 text-sm mt-1 italic">
            Un cadeau de Clément Bastien pour Clément Baty
          </p>
        </div>
        <button
          onClick={() => setIsTutorialOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-md transition-colors"
        >
          <QuestionMarkCircleIcon className="h-5 w-5" />
          Aide / Tutoriel
        </button>
      </div>

      {/* Layout en grille amélioré */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Colonne de gauche: Configuration */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700">
            {/* Section des catégories de mots-clés */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <label className="text-lg font-medium text-blue-300">
                  Catégories de mots-clés
                </label>
                <div className="flex items-center gap-2">
                  <LightBulbIcon className="h-5 w-5 text-yellow-400" />
                  <span className="text-xs text-gray-400">Sélectionnez une catégorie pour explorer les mots-clés</span>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
                {KEYWORD_CATEGORIES.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-3 py-2 text-sm rounded-md transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-blue-900 text-blue-200 font-medium'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Mots-clés prédéfinis selon la catégorie */}
            <div className="mb-6">
              <p className="text-sm font-medium mb-2 text-blue-300">
                {KEYWORD_CATEGORIES.find(c => c.id === selectedCategory)?.name || 'Mots-clés'}:
              </p>
              <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-3 bg-gray-900 rounded-md border border-gray-700">
                {KEYWORD_CATEGORIES.find(c => c.id === selectedCategory)?.keywords.map((kw) => (
                  <button
                    key={kw}
                    onClick={() => setKeyword(kw)}
                    className={`px-3 py-1.5 text-sm rounded-full hover:bg-blue-800 transition-colors ${
                      keyword === kw ? 'bg-blue-700 text-white' : 'bg-blue-900 text-blue-200'
                    }`}
                  >
                    {kw}
                  </button>
                ))}
              </div>
            </div>

            {/* Mots-clés personnalisés */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-blue-300">Vos mots-clés personnalisés:</p>
                <div className="flex items-center">
                  <input
                    type="text"
                    value={customKeyword}
                    onChange={(e) => setCustomKeyword(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addCustomKeyword()}
                    placeholder="Ajouter un mot-clé..."
                    className="px-3 py-1.5 text-sm bg-gray-900 border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none mr-2"
                  />
                  <button
                    onClick={addCustomKeyword}
                    className="p-1.5 bg-green-900 text-green-200 rounded-md hover:bg-green-800 transition-colors"
                    title="Ajouter"
                  >
                    <PlusCircleIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {userKeywords.length > 0 ? (
                <div className="flex flex-wrap gap-2 mb-3 p-3 bg-gray-900 rounded-md border border-gray-700">
                  {userKeywords.map((kw) => (
                    <div key={kw}
                      className={`flex items-center px-3 py-1.5 text-sm rounded-full ${
                        keyword === kw ? 'bg-green-700 text-white' : 'bg-green-900 text-green-200'
                      }`}>
                      <span className="mr-1 cursor-pointer" onClick={() => setKeyword(kw)}>{kw}</span>
                      <button
                        onClick={() => removeUserKeyword(kw)}
                        className="text-green-300 hover:text-white ml-1"
                      >
                        <XMarkIcon className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-gray-500 mb-3 italic">
                  Ajoutez vos propres mots-clés spécialisés pour des recherches personnalisées
                </p>
              )}
            </div>

            {/* Mot-clé principal avec recherche Google directe */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="keyword" className="text-sm font-medium text-blue-300">
                  Mot-clé d&apos;emploi sélectionné <span className="text-red-500">*</span>
                </label>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  id="keyword"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="Ex: ingénieur bureau d'études"
                  className="flex-1 p-3 border rounded-md bg-gray-900 border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
                <button
                  onClick={searchCurrentKeyword}
                  disabled={!keyword}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <MagnifyingGlassIcon className="h-5 w-5" />
                  <span className="hidden md:inline">Google</span>
                </button>
              </div>
            </div>

            {/* Options avancées en accordéon */}
            <div className="space-y-4 mb-6">
              <details className="bg-gray-900 rounded-md p-1">
                <summary className="cursor-pointer p-3 font-medium text-blue-300">Options de base</summary>
                <div className="p-4 pt-2 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Type de recherche Dork */}
                    <div>
                      <label htmlFor="dork-type" className="block text-sm font-medium mb-2 text-gray-300">
                        Type de recherche
                      </label>
                      <select
                        id="dork-type"
                        value={selectedDorkType}
                        onChange={(e) => setSelectedDorkType(e.target.value)}
                        className="w-full p-2.5 border rounded-md bg-gray-800 border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      >
                        {DORK_TYPES.map((dorkType) => (
                          <option key={dorkType.id} value={dorkType.id}>
                            {dorkType.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Filtrer par site */}
                    <div>
                      <label htmlFor="site-filter" className="flex items-center gap-1 text-sm font-medium mb-2 text-gray-300">
                        <BuildingOfficeIcon className="h-4 w-4" />
                        Site d&apos;emploi
                      </label>
                      <select
                        id="site-filter"
                        value={selectedSite || ''}
                        onChange={(e) => setSelectedSite(e.target.value || null)}
                        className="w-full p-2.5 border rounded-md bg-gray-800 border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      >
                        <option value="">Tous les sites</option>
                        {JOB_SITES.map((site) => (
                          <option key={site} value={site}>
                            {site}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </details>

              <details className="bg-gray-900 rounded-md p-1">
                <summary className="cursor-pointer p-3 font-medium text-blue-300">Filtres géographiques et entreprises</summary>
                <div className="p-4 pt-2 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Filtrer par localisation */}
                    <div>
                      <label htmlFor="location-filter" className="flex items-center gap-1 text-sm font-medium mb-2 text-gray-300">
                        <MapPinIcon className="h-4 w-4" />
                        Localisation
                      </label>
                      <select
                        id="location-filter"
                        value={selectedLocation || ''}
                        onChange={(e) => setSelectedLocation(e.target.value || null)}
                        className="w-full p-2.5 border rounded-md bg-gray-800 border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      >
                        <option value="">Toute la France</option>
                        {CITIES.map((city) => (
                          <option key={city} value={city}>
                            {city}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Filtrer par entreprise */}
                    <div>
                      <label htmlFor="company-filter" className="flex items-center gap-1 text-sm font-medium mb-2 text-gray-300">
                        <BuildingOfficeIcon className="h-4 w-4" />
                        Entreprise
                      </label>
                      <select
                        id="company-filter"
                        value={selectedCompany || ''}
                        onChange={(e) => setSelectedCompany(e.target.value || null)}
                        className="w-full p-2.5 border rounded-md bg-gray-800 border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      >
                        <option value="">Toutes les entreprises</option>
                        {COMPANIES.map((company) => (
                          <option key={company} value={company}>
                            {company}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </details>

              <details className="bg-gray-900 rounded-md p-1">
                <summary className="cursor-pointer p-3 font-medium text-blue-300">Filtres de format et expérience</summary>
                <div className="p-4 pt-2 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Filtrer par type de fichier */}
                    <div>
                      <label htmlFor="filetype-filter" className="flex items-center gap-1 text-sm font-medium mb-2 text-gray-300">
                        <MapPinIcon className="h-4 w-4" />
                        Format de fichier
                      </label>
                      <select
                        id="filetype-filter"
                        value={selectedFileType || ''}
                        onChange={(e) => setSelectedFileType(e.target.value || null)}
                        className="w-full p-2.5 border rounded-md bg-gray-800 border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      >
                        <option value="">Tous les formats</option>
                        {FILE_FORMATS.map((format) => (
                          <option key={format.value} value={format.value}>
                            {format.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Niveau d'expérience */}
                    <div>
                      <label htmlFor="experience-filter" className="flex items-center gap-1 text-sm font-medium mb-2 text-gray-300">
                        Niveau d&apos;expérience
                      </label>
                      <select
                        id="experience-filter"
                        value={selectedExperience || ''}
                        onChange={(e) => setSelectedExperience(e.target.value || null)}
                        className="w-full p-2.5 border rounded-md bg-gray-800 border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      >
                        <option value="">Tous niveaux</option>
                        {EXPERIENCE_LEVELS.map((level) => (
                          <option key={level} value={level}>
                            {level}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </details>

              <details className="bg-gray-900 rounded-md p-1">
                <summary className="cursor-pointer p-3 font-medium text-blue-300">Filtres de date et requête personnalisée</summary>
                <div className="p-4 pt-2 space-y-4">
                  {/* Date pour les résultats récents */}
                  <div>
                    <label htmlFor="date-filter" className="flex items-center gap-1 text-sm font-medium mb-2 text-gray-300">
                      Date (après)
                    </label>
                    <input
                      type="date"
                      id="date-filter"
                      value={customDate}
                      onChange={(e) => setCustomDate(e.target.value)}
                      className="w-full p-2.5 border rounded-md bg-gray-800 border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>

                  {/* Requête personnalisée */}
                  <div>
                    <label htmlFor="custom-query" className="block text-sm font-medium mb-2 text-gray-300">
                      Requête personnalisée (optionnel)
                    </label>
                    <input
                      type="text"
                      id="custom-query"
                      value={customQuery}
                      onChange={(e) => setCustomQuery(e.target.value)}
                      placeholder="Ex: site:linkedin.com/jobs intitle:&quot;ingénieur mécanique&quot;"
                      className="w-full p-2.5 border rounded-md bg-gray-800 border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                </div>
              </details>
            </div>

            {/* Bouton de génération */}
            <button
              onClick={generateQueries}
              disabled={!keyword && !customQuery}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg font-medium"
            >
              <MagnifyingGlassIcon className="h-6 w-6" />
              Générer des requêtes de recherche
            </button>
          </div>
        </div>

        {/* Colonne de droite: Résultats et historique */}
        <div className="lg:col-span-5 space-y-6">
          {/* Historique des recherches */}
          {searchHistory.length > 0 && (
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-medium text-blue-300">Recherches récentes</h2>
                <span className="text-xs text-gray-400">Cliquez pour réutiliser</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {searchHistory.map((item) => (
                  <button
                    key={item}
                    onClick={() => setKeyword(item)}
                    className="px-3 py-1.5 text-sm bg-gray-700 text-gray-200 rounded-full hover:bg-gray-600 transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Requêtes générées */}
          {generatedQueries.length > 0 ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-gray-800 p-4 rounded-t-lg border border-gray-700 shadow-md">
                <h2 className="font-medium text-lg text-blue-300">Requêtes générées</h2>
                <span className="text-xs text-gray-400">{generatedQueries.length} requête(s)</span>
              </div>

              <div className="bg-gray-800 p-5 rounded-b-lg border border-gray-700 shadow-md space-y-4 max-h-[600px] overflow-y-auto">
                {generatedQueries.map((query, index) => (
                  <div key={index} className="p-4 bg-gray-900 rounded-lg shadow border border-gray-700 hover:border-gray-600 transition-colors">
                    <p className="font-mono text-sm mb-3 break-all bg-gray-800 p-3 rounded-md text-blue-100">{query}</p>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => copyQuery(query, index)}
                        className="flex items-center gap-1 text-xs py-1.5 px-3 bg-gray-700 hover:bg-gray-600 rounded transition-colors"
                      >
                        <ClipboardDocumentIcon className="h-4 w-4" />
                        {copiedIndex === index ? 'Copié!' : 'Copier'}
                      </button>
                      <button
                        onClick={() => previewOnGoogle(query)}
                        className="flex items-center gap-1 flex-grow text-xs py-1.5 px-3 bg-blue-900 text-blue-200 hover:bg-blue-800 rounded transition-colors"
                      >
                        <MagnifyingGlassIcon className="h-4 w-4" />
                        Rechercher sur Google
                      </button>
                      <button
                        onClick={() => saveQuery(query)}
                        className="flex items-center gap-1 text-xs py-1.5 px-3 bg-green-900 text-green-200 hover:bg-green-800 rounded transition-colors"
                      >
                        <BookmarkIcon className="h-4 w-4" />
                        Sauvegarder
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 text-center shadow-md flex flex-col items-center">
              <div className="mb-4">
                <img
                  src="https://img.icons8.com/color/96/000000/search--v1.png"
                  alt="Search"
                  className="mx-auto h-20 w-20 opacity-70"
                />
              </div>
              <p className="text-gray-400 mb-4">Sélectionnez un mot-clé et générez des requêtes pour voir les résultats ici</p>
              {keyword && (
                <button
                  onClick={searchCurrentKeyword}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  <MagnifyingGlassIcon className="h-5 w-5" />
                  Rechercher &quot;{keyword}&quot; sur Google
                </button>
              )}
            </div>
          )}

          {/* Requêtes sauvegardées */}
          {savedQueries.length > 0 && (
            <div className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-medium text-blue-300">Requêtes sauvegardées</h2>
                <span className="text-xs text-gray-400">{savedQueries.length} sauvegarde(s)</span>
              </div>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {savedQueries.map((query, index) => (
                  <div key={index} className="flex items-center justify-between p-2.5 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors">
                    <span className="text-sm font-mono truncate max-w-[280px]">{query}</span>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => previewOnGoogle(query)}
                        className="text-xs p-1 text-blue-400 hover:text-blue-300"
                        title="Rechercher sur Google"
                      >
                        <MagnifyingGlassIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => copyQuery(query, index)}
                        className="text-xs p-1 text-gray-400 hover:text-gray-300"
                        title="Copier"
                      >
                        <ClipboardDocumentIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => deleteSavedQuery(index)}
                        className="text-xs p-1 text-red-400 hover:text-red-300"
                        title="Supprimer"
                      >
                        <XMarkIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tutoriel Modal */}
      <TutorialModal isOpen={isTutorialOpen} onClose={() => setIsTutorialOpen(false)} />
    </div>
  );
}
