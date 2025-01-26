import React, { useState } from 'react';

const Administration = () => {
  // États pour gérer les champs du formulaire
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Fonction pour gérer la soumission du formulaire
  const handleLogin = (e) => {
    e.preventDefault();

    // Validation basique
    if (!username || !password) {
      setError('Veuillez remplir tous les champs.');
      return;
    }

    // Ici, vous pouvez ajouter une logique pour vérifier les identifiants
    // Par exemple, une requête API vers un backend
    if (username === 'admin' && password === 'admin123') {
      setError('');
      alert('Connexion réussie !');
      // Rediriger vers le tableau de bord d'administration
    } else {
      setError('Identifiants incorrects.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-green-900 mb-6">
          Connexion Administrateur
        </h1>

        {/* Formulaire de login */}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 mb-2">
              Nom d'utilisateur
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Entrez votre nom d'utilisateur"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 mb-2">
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Entrez votre mot de passe"
            />
          </div>

          {/* Affichage des erreurs */}
          {error && (
            <div className="mb-4 text-red-500 text-sm text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-green-900 text-white py-2 px-4 rounded-lg hover:bg-green-800 transition-colors duration-300"
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
};

export default Administration;