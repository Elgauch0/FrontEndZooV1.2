import React from 'react';
import { Form, useActionData, useNavigation } from 'react-router';

export async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get('email');
  const titre = formData.get('titre');
  const description = formData.get('description');

  // Validation basique
  if (!email || !titre || !description) {
    return { message: 'Veuillez remplir tous les champs.', isError: true };
  }

  // Simuler l'envoi du formulaire
  console.log('Email:', email);
  console.log('Titre:', titre);
  console.log('Description:', description);

  return { message: 'Votre message a été envoyé avec succès !', isError: false };
}

const Contact = () => {
  const actionData = useActionData(); // Données retournées par l'action
  const navigation = useNavigation(); // État de navigation (pour gérer le loading)

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-green-900 mb-8">
          Nous Contacter
        </h1>

        <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
          <Form method="post">
            {/* Champ Email */}
            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Entrez votre email"
                required
              />
            </div>

            {/* Champ Titre */}
            <div className="mb-6">
              <label htmlFor="titre" className="block text-gray-700 mb-2">
                Titre
              </label>
              <input
                type="text"
                id="titre"
                name="titre"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Entrez le titre de votre message"
                required
              />
            </div>

            {/* Champ Description */}
            <div className="mb-6">
              <label htmlFor="description" className="block text-gray-700 mb-2">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                rows="5"
                placeholder="Décrivez votre demande ou votre message"
                required
              />
            </div>

            {/* Affichage des messages */}
            {actionData?.message && (
              <div className="mb-6 text-center text-sm">
                <p className={actionData.isError ? 'text-red-500' : 'text-green-600'}>
                  {actionData.message}
                </p>
              </div>
            )}

            {/* Bouton de soumission */}
            <button
              type="submit"
              className="w-full bg-green-900 text-white py-2 px-4 rounded-lg hover:bg-green-800 transition-colors duration-300"
              disabled={navigation.state === 'submitting'} // Désactiver le bouton pendant la soumission
            >
              {navigation.state === 'submitting' ? 'Envoi en cours...' : 'Envoyer'}
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Contact;