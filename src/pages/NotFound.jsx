
import { Link } from 'react-router';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="text-center">
        {/* Titre */}
        <h1 className="text-9xl font-bold text-green-900">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mt-4">
          Oups ! Page introuvable
        </h2>
        <p className="text-gray-600 mt-2">
          La page que vous recherchez n'existe pas ou a été déplacée.
        </p>

        {/* Bouton pour retourner à l'accueil */}
        <Link
          to="/"
          className="mt-6 inline-block bg-green-900 text-white py-2 px-4 rounded-lg hover:bg-green-800 transition-colors duration-300"
        >
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
};

export default NotFound;