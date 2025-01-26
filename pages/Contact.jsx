import React, { useState } from 'react';

const Contact = () => {
  // États pour gérer les champs du formulaire
  const [email, setEmail] = useState('');
  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation basique
    if (!email || !titre || !description) {
      setMessage('Veuillez remplir tous les champs.');
      return;
    }

    // Simuler l'envoi du formulaire
    setMessage('Votre message a été envoyé avec succès !');
    console.log('Email:', email);
    console.log('Titre:', titre);
    console.log('Description:', description);

    // Réinitialiser les champs après soumission
    setEmail('');
    setTitre('');
    setDescription('');
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-green-900 mb-8">
          Nous Contacter
        </h1>

        <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
          <form onSubmit={handleSubmit}>
            {/* Champ Email */}
            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={titre}
                onChange={(e) => setTitre(e.target.value)}
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
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                rows="5"
                placeholder="Décrivez votre demande ou votre message"
                required
              />
            </div>

            {/* Affichage des messages */}
            {message && (
              <div className="mb-6 text-center text-sm">
                <p className={message.includes('succès') ? 'text-green-600' : 'text-red-500'}>
                  {message}
                </p>
              </div>
            )}

            {/* Bouton de soumission */}
            <button
              type="submit"
              className="w-full bg-green-900 text-white py-2 px-4 rounded-lg hover:bg-green-800 transition-colors duration-300"
            >
              Envoyer
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;