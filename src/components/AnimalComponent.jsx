import { Link } from "react-router";
import { API_SOURCE } from "@functions";
import photoparDefault from '@assets/photoParDefault.jpg';

function AnimalComponent({ animal, onDelete }) {
    const state = {
        id: animal.id,
        nom: animal.nom,
        description: animal.description,
        habitatId: animal.habitat.id
    };

    const imageUrl = animal.imageName ? `${API_SOURCE}uploads/images/animaux/${animal.imageName}` : photoparDefault;

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-4 relative">
            <Link
                to={`${animal.id}`}
                state={state}
                className="block"
            >
                <img
                    src={imageUrl}
                    alt={animal.nom}
                    className="w-full h-48 object-cover rounded-md mb-4"
                    onError={(e) => { e.target.onerror = null; e.target.src = "/placeholder.jpg"; }}
                />

                <h2 className="text-xl font-bold text-green-800 mb-2">{animal.nom}</h2>
                <p className="text-gray-700 mb-4">{animal.description}</p>
                <div className="flex items-center">
                    <span className="text-sm text-gray-600">Habitat:</span>
                    <span className="ml-2 text-sm font-medium text-green-700">
                        {animal.habitat.nom}
                    </span>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                    Cliquez pour modifier cet animal.
                </p>
            </Link>

            
            <button
                className="mt-4 bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600 transition-colors duration-200"
                onClick={() => onDelete(animal.id)}
            >
                Supprimer
            </button>
        </div>
    );
}

export default AnimalComponent;