import { Link, useRouteError } from 'react-router';

function ErrorElement() {
  const error = useRouteError();
  console.error('Erreur capturée :', error);

  // Extraire les informations d'erreur
  const errorStatus = error.status || error.response?.status || 'Erreur inconnue';
  const errorMessage = error.message || error.response?.data?.message || 'Une erreur s\'est produite.';

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-900">
      <div className="bg-white p-8 rounded-lg shadow-2xl text-center transform transition-all duration-500 hover:scale-105">
        <div className="flex justify-center mb-4">
          <span role="img" aria-label="Warning" className="text-6xl text-yellow-500 animate-bounce">
            ⚠️
          </span>
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Oups !</h1>
        <p className="text-lg text-gray-600 mb-6">
          Quelque chose s'est mal passé.
        </p>
        {error && (
          <div className="text-left mb-6">
            <h2 className="text-2xl font-semibold mb-2">Détails de l'erreur :</h2>
            <p className="text-lg mb-1"><strong>Code :</strong> {errorStatus}</p>
            <p className="text-lg"><strong>Message :</strong> {errorMessage}</p>
            {error.response?.data?.errors && (
              <div className="mt-4">
                <h3 className="text-xl font-semibold">Erreurs :</h3>
                <pre className="text-sm text-gray-500 bg-gray-100 p-4 rounded">
                  {JSON.stringify(error.response.data.errors, null, 2)}
                </pre>
              </div>
            )}
          </div>
        )}
        <Link
          to="/"
          className="inline-block bg-green-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition-all duration-300 hover:bg-green-700 hover:shadow-lg"
        >
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}

export default ErrorElement;


