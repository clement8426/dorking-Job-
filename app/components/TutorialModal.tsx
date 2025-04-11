'use client';

import { useState, useEffect } from 'react';
import { XMarkIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

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
            <EnvelopeIcon className="h-6 w-6 text-blue-400 mr-2" />
            Bienvenue sur EmailHunter Pro
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
              <h3 className="text-lg font-semibold text-blue-400">Qu&apos;est-ce que le Google Dorking pour les emails?</h3>
              <p>
                Le <span className="text-yellow-400 font-medium">Google Dorking</span> (ou Google Hacking) est une technique avancée de recherche
                qui utilise des opérateurs spéciaux de Google pour affiner les résultats et trouver
                des informations précises, comme des adresses email professionnelles.
              </p>
              <p>
                En utilisant des commandes comme <code className="bg-gray-800 px-1 rounded">site:</code>, <code className="bg-gray-800 px-1 rounded">intext:</code>,
                <code className="bg-gray-800 px-1 rounded">@domaine.com</code>, ou <code className="bg-gray-800 px-1 rounded">filetype:</code>,
                vous pouvez cibler spécifiquement des sites web, du contenu, des domaines d&apos;emails
                ou des types de fichiers contenant des adresses email.
              </p>
              <div className="bg-gray-800 p-3 rounded-md">
                <p className="text-gray-300 mb-2">Exemple de requête dork pour les emails:</p>
                <code className="text-green-400">site:thalesgroup.com &quot;RH&quot; OR &quot;recrutement&quot; intext:@thalesgroup.com -inurl:pdf</code>
                <p className="text-gray-400 mt-2 text-sm">Cela recherche des pages sur le site Thales contenant des termes liés aux RH et des adresses email du domaine, excluant les PDF</p>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-blue-400">Comment utiliser EmailHunter Pro</h3>
              <p>
                EmailHunter Pro est un outil puissant conçu pour vous aider à trouver des adresses email
                professionnelles, notamment pour contacter des recruteurs ou des responsables RH.
              </p>
              <p>
                L&apos;application génère automatiquement des requêtes Google optimisées (Dorks) à partir de vos critères de recherche,
                puis vous permet de les rechercher directement sur Google ou de les copier pour une utilisation ultérieure.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="bg-gray-800 p-4 rounded-md">
                  <h4 className="font-medium text-blue-300 mb-2">Étape 1: Choisissez un mot-clé</h4>
                  <p className="text-sm">Sélectionnez des termes comme &quot;RH&quot;, &quot;recrutement&quot;, &quot;responsable&quot;, etc. ou utilisez vos propres mots-clés.</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-md">
                  <h4 className="font-medium text-blue-300 mb-2">Étape 2: Spécifiez le domaine</h4>
                  <p className="text-sm">Choisissez le domaine d&apos;entreprise (ex: airbus.com) pour cibler votre recherche d&apos;emails.</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-md">
                  <h4 className="font-medium text-blue-300 mb-2">Étape 3: Générez des requêtes</h4>
                  <p className="text-sm">Cliquez sur le bouton pour créer des dorks optimisés pour trouver des emails.</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-md">
                  <h4 className="font-medium text-blue-300 mb-2">Étape 4: Recherchez ou sauvegardez</h4>
                  <p className="text-sm">Utilisez les requêtes générées directement sur Google ou sauvegardez-les pour plus tard.</p>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-blue-400">Types de recherches d&apos;emails</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-800 p-4 rounded-md">
                  <h4 className="font-medium text-blue-300 mb-2">Recherche basique d&apos;emails</h4>
                  <p className="text-sm">Trouve des emails sur un domaine spécifique associés à un mot-clé ou un poste.</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-md">
                  <h4 className="font-medium text-blue-300 mb-2">Pages de contact</h4>
                  <p className="text-sm">Cible les pages de contact des entreprises où des emails peuvent être mentionnés.</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-md">
                  <h4 className="font-medium text-blue-300 mb-2">Emails dans des documents</h4>
                  <p className="text-sm">Recherche des emails dans des fichiers PDF, Word, Excel, etc.</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-md">
                  <h4 className="font-medium text-blue-300 mb-2">Recherche sur LinkedIn</h4>
                  <p className="text-sm">Cible les profils LinkedIn où des emails professionnels peuvent être mentionnés.</p>
                </div>
              </div>
              <p className="mt-4 text-gray-300">
                <strong>Astuce pro:</strong> Les formats d&apos;emails d&apos;entreprise suivent généralement un modèle comme prenom.nom@domaine.com ou p.nom@domaine.com.
                Vous pouvez rechercher le format utilisé par l&apos;entreprise en utilisant le type de recherche &quot;Format d&apos;email&quot;.
              </p>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-blue-400">Pourquoi chercher des emails professionnels?</h3>
              <div className="bg-gray-800 p-5 rounded-md space-y-3">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-blue-900 rounded-full p-1">
                    <span className="block w-4 h-4 text-center text-blue-200 font-bold">1</span>
                  </div>
                  <p className="ml-3 text-sm">Contacter <span className="text-green-400">directement</span> les recruteurs sans passer par des plateformes génériques</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-blue-900 rounded-full p-1">
                    <span className="block w-4 h-4 text-center text-blue-200 font-bold">2</span>
                  </div>
                  <p className="ml-3 text-sm">Se démarquer des autres candidats avec une approche <span className="text-green-400">personnalisée</span></p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-blue-900 rounded-full p-1">
                    <span className="block w-4 h-4 text-center text-blue-200 font-bold">3</span>
                  </div>
                  <p className="ml-3 text-sm">Cibler des <span className="text-green-400">services RH précis</span> plutôt que des adresses génériques</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-blue-900 rounded-full p-1">
                    <span className="block w-4 h-4 text-center text-blue-200 font-bold">4</span>
                  </div>
                  <p className="ml-3 text-sm">Établir un <span className="text-green-400">premier contact</span> avant même qu&apos;une offre ne soit publiée</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-blue-900 rounded-full p-1">
                    <span className="block w-4 h-4 text-center text-blue-200 font-bold">5</span>
                  </div>
                  <p className="ml-3 text-sm">Obtenir des <span className="text-green-400">informations précieuses</span> sur l&apos;entreprise et ses besoins</p>
                </div>
              </div>
              <p className="mt-4 text-gray-300 italic">
                Rappelez-vous: utilisez ces techniques de façon éthique et respectueuse. Les emails obtenus doivent être utilisés
                uniquement pour des communications professionnelles légitimes.
              </p>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-4 text-center">
              <div className="py-6">
                <EnvelopeIcon className="h-24 w-24 mx-auto text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-yellow-400">Un conseil supplémentaire</h3>
              <p className="text-lg">
                Une fois que vous avez trouvé une adresse email, <span className="font-bold text-blue-400">personnalisez votre message</span>
              </p>
              <p className="text-gray-300">
                Les recruteurs reçoivent des dizaines de candidatures génériques. Pour maximiser vos chances:
              </p>
              <div className="bg-blue-900 bg-opacity-30 p-5 rounded-lg mt-6 border border-blue-700">
                <ul className="text-left space-y-2 text-gray-300">
                  <li>• Personnalisez votre objet d&apos;email</li>
                  <li>• Mentionnez le nom du destinataire</li>
                  <li>• Référencez des projets spécifiques de l&apos;entreprise</li>
                  <li>• Expliquez pourquoi vous êtes intéressé par cette entreprise en particulier</li>
                  <li>• Soyez concis mais démontrez votre valeur ajoutée</li>
                </ul>
                <p className="mt-4 text-center font-medium text-blue-300">
                  Bonne chasse aux emails!
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
