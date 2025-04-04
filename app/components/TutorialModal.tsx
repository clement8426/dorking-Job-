'use client';

import { useState, useEffect } from 'react';
import { XMarkIcon, LightBulbIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface TutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TutorialModal({ isOpen, onClose }: TutorialModalProps) {
  const [step, setStep] = useState(1);
  const totalSteps = 5;

  // Réinitialiser l'étape à 1 lorsque la modale s'ouvre
  useEffect(() => {
    if (isOpen) {
      setStep(1);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleNextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      onClose();
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold flex items-center">
            <LightBulbIcon className="h-6 w-6 text-yellow-400 mr-2" />
            Bienvenue sur DorkJobFinder Pro
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-blue-400">Qu'est-ce que le Google Dorking?</h3>
              <p>
                Le <span className="text-yellow-400 font-medium">Google Dorking</span> (ou Google Hacking) est une technique avancée de recherche
                qui utilise des opérateurs spéciaux de Google pour affiner les résultats et trouver
                des informations précises qui seraient autrement difficiles à découvrir.
              </p>
              <p>
                En utilisant des commandes comme <code className="bg-gray-800 px-1 rounded">site:</code>, <code className="bg-gray-800 px-1 rounded">intitle:</code>,
                <code className="bg-gray-800 px-1 rounded">inurl:</code>, ou <code className="bg-gray-800 px-1 rounded">filetype:</code>,
                vous pouvez cibler spécifiquement des sites web, des titres de pages, des URLs
                ou des types de fichiers.
              </p>
              <div className="bg-gray-800 p-3 rounded-md">
                <p className="text-gray-300 mb-2">Exemple de requête dork:</p>
                <code className="text-green-400">site:careers.thalesgroup.com "ingénieur bureau d'études" filetype:pdf</code>
                <p className="text-gray-400 mt-2 text-sm">Cela recherche des documents PDF sur le site de carrières Thales contenant la phrase "ingénieur bureau d'études"</p>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-blue-400">Comment utiliser DorkJobFinder Pro</h3>
              <p>
                DorkJobFinder Pro est un outil puissant conçu pour vous aider à trouver des offres d'emploi
                en ingénierie mécanique qui ne sont pas facilement accessibles sur les sites d'emploi standards.
              </p>
              <p>
                L'application génère automatiquement des requêtes Google optimisées (Dorks) à partir de vos mots-clés
                et critères, puis vous permet de les rechercher directement sur Google ou de les copier pour une utilisation ultérieure.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="bg-gray-800 p-4 rounded-md">
                  <h4 className="font-medium text-blue-300 mb-2">Étape 1: Sélectionnez un mot-clé</h4>
                  <p className="text-sm">Choisissez parmi les catégories prédéfinies ou ajoutez vos propres mots-clés personnalisés.</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-md">
                  <h4 className="font-medium text-blue-300 mb-2">Étape 2: Affinez votre recherche</h4>
                  <p className="text-sm">Utilisez les filtres (localisation, entreprise, format, etc.) pour cibler votre recherche.</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-md">
                  <h4 className="font-medium text-blue-300 mb-2">Étape 3: Générez des requêtes</h4>
                  <p className="text-sm">Cliquez sur le bouton "Générer des requêtes" pour créer des dorks optimisés.</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-md">
                  <h4 className="font-medium text-blue-300 mb-2">Étape 4: Recherchez ou sauvegardez</h4>
                  <p className="text-sm">Cliquez sur "Rechercher sur Google" pour ouvrir directement les résultats ou sauvegardez vos requêtes préférées.</p>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-blue-400">Fonctionnalités avancées</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-800 p-4 rounded-md">
                  <h4 className="font-medium text-blue-300 mb-2">Catégories spécialisées</h4>
                  <p className="text-sm">Explorez des mots-clés organisés par logiciels, compétences, domaines et postes recherchés.</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-md">
                  <h4 className="font-medium text-blue-300 mb-2">Mots-clés personnalisés</h4>
                  <p className="text-sm">Ajoutez et sauvegardez vos propres mots-clés pour des recherches futures.</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-md">
                  <h4 className="font-medium text-blue-300 mb-2">Requêtes optimisées</h4>
                  <p className="text-sm">L'algorithme génère des requêtes sophistiquées qui ciblent les sites d'emploi spécialisés.</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-md">
                  <h4 className="font-medium text-blue-300 mb-2">Historique et sauvegarde</h4>
                  <p className="text-sm">Retrouvez facilement vos recherches précédentes et vos requêtes sauvegardées.</p>
                </div>
              </div>
              <p className="mt-4 text-gray-300">
                <strong>Astuce pro:</strong> Combinez plusieurs filtres pour des résultats plus précis. Par exemple, utilisez à la fois la localisation et
                le format de fichier pour trouver des documents PDF d'offres d'emploi dans votre région.
              </p>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-blue-400">Pourquoi utiliser des techniques de dorking?</h3>
              <div className="bg-gray-800 p-5 rounded-md space-y-3">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-blue-900 rounded-full p-1">
                    <span className="block w-4 h-4 text-center text-blue-200 font-bold">1</span>
                  </div>
                  <p className="ml-3 text-sm">Découvrir des offres d'emploi <span className="text-green-400">cachées</span> qui n'apparaissent pas sur les portails d'emploi traditionnels</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-blue-900 rounded-full p-1">
                    <span className="block w-4 h-4 text-center text-blue-200 font-bold">2</span>
                  </div>
                  <p className="ml-3 text-sm">Trouver des documents <span className="text-green-400">spécifiques</span> comme des fiches de poste détaillées en format PDF</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-blue-900 rounded-full p-1">
                    <span className="block w-4 h-4 text-center text-blue-200 font-bold">3</span>
                  </div>
                  <p className="ml-3 text-sm">Cibler des <span className="text-green-400">entreprises précises</span> et leurs pages de carrières internes</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-blue-900 rounded-full p-1">
                    <span className="block w-4 h-4 text-center text-blue-200 font-bold">4</span>
                  </div>
                  <p className="ml-3 text-sm">Obtenir des <span className="text-green-400">résultats plus récents</span> avec le filtrage par date</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-blue-900 rounded-full p-1">
                    <span className="block w-4 h-4 text-center text-blue-200 font-bold">5</span>
                  </div>
                  <p className="ml-3 text-sm">Se démarquer dans votre recherche d'emploi avec une approche plus <span className="text-green-400">sophistiquée</span></p>
                </div>
              </div>
              <p className="mt-4 text-gray-300 italic">
                Le dorking est un processus qui demande du temps et de la patience, mais qui peut révéler des opportunités
                professionnelles que peu de candidats découvrent.
              </p>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-4 text-center">
              <div className="py-6">
                <img
                  src="https://img.icons8.com/fluency/96/000000/gift.png"
                  alt="Gift"
                  className="mx-auto h-24 w-24"
                />
              </div>
              <h3 className="text-xl font-semibold text-yellow-400">Un cadeau pour vous</h3>
              <p className="text-lg">
                Cet outil a été spécialement conçu pour <span className="font-bold text-blue-400">Clément Baty</span>
              </p>
              <p className="text-gray-300">
                Pour vous aider dans votre recherche d'emploi en ingénierie mécanique.
              </p>
              <div className="bg-blue-900 bg-opacity-30 p-5 rounded-lg mt-6 border border-blue-700">
                <p className="italic text-gray-300">
                  "Je vous offre cet outil pour faciliter votre recherche d'emploi et vous permettre de trouver des opportunités professionnelles à la hauteur de vos compétences."
                </p>
                <p className="mt-4 font-medium text-blue-300">
                  - Clément Bastien
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-gray-700 flex justify-between">
          <div>
            <button
              onClick={handlePrevStep}
              disabled={step === 1}
              className="px-4 py-2 bg-gray-700 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600"
            >
              Précédent
            </button>
          </div>
          <div className="flex items-center">
            {Array.from({ length: totalSteps }).map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 mx-1 rounded-full ${
                  index + 1 === step ? 'bg-blue-500' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
          <div>
            <button
              onClick={handleNextStep}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {step === totalSteps ? 'Terminer' : 'Suivant'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
