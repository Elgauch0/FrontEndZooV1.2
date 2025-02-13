import { Link } from "react-router";

function AnimalComponent({ id, nom, description, habitat,onDelete}) {
  
  const state = {
    id,
    nom,
    description,
    habitatId: habitat.id
  };


  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-4 relative">
     
      <Link
        to={`${id}`}
        state={state}
        className="block"
      >
        <h2 className="text-xl font-bold text-green-800 mb-2">{nom}</h2>
        <p className="text-gray-700 mb-4">{description}</p>
        <div className="flex items-center">
          <span className="text-sm text-gray-600">Habitat:</span>
          <span className="ml-2 text-sm font-medium text-green-700">
            {habitat.nom}
          </span>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Cliquez pour modifier cet animal.
        </p>
      </Link>

      
      <button
        
        className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600 transition-colors duration-200"
        onClick={(event)=>onDelete(id)}
      >
        Supprimer
      </button>
    </div>
  );
}

export default AnimalComponent;