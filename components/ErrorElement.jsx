import { Link, useRouteError } from 'react-router';

function ErrorElement() {
  const error = useRouteError();
  console.error('my code',error);

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
          <pre className="text-sm text-gray-500 bg-gray-100 p-4 rounded mb-4">
            {error.message}
          </pre>
        )}
        <Link
          to="/"
          className="inline-block bg-green-600  text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition-all duration-300 hover:bg-green-700 hover:shadow-lg"
        >
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}

export default ErrorElement;

