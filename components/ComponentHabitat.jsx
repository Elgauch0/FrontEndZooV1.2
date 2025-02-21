import { Link } from 'react-router';
import habitatParDefault from '~public/habitatParDefault.jpg';
import { API_SOURCE } from '../functions';

function HabitatComponent({ habitat, onDelete }) {
  const imageUrl = habitat.imageName
    ? `${API_SOURCE}/uploads/images/habitats/${habitat.imageName}`
    : habitatParDefault;

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden m-4">
      <Link
        to={`${habitat.id}`}
        state={{ habitat }} // Passer l'habitat via le state
        className="block hover:shadow-lg transition duration-300"
      >
        <img
          src={imageUrl}
          alt={habitat.nom}
          className="w-full h-48 object-cover"
        />
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-2 text-green-800">
            {habitat.nom}
          </h2>
          <p className="text-gray-700 mb-4">{habitat.description}</p>
        </div>
      </Link>
      {/* Bouton Supprimer en dehors du Link */}
      <div className="p-6">
        <button
          onClick={() => onDelete(habitat.id)}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 transition duration-300"
        >
          Supprimer
        </button>
      </div>
    </div>
  );
}

export default HabitatComponent;

