import { useLoaderData } from "react-router";
import { getAnimal, API_SOURCE } from "../functions";
import photoparDefault from "../src/assets/photoParDefault.png";

// Loader asynchrone pour récupérer l'animal via son id
export async function loader({ params }) {
  const animal = await getAnimal(params.id);
  return animal;
}

function GetAnimal() {
  const animal = useLoaderData();

  // Déstructuration des propriétés pour plus de clarté
  const { nom, imageName, description, habitat } = animal;
  const imageUrl = imageName
    ? `${API_SOURCE}uploads/images/animaux/${imageName}`
    : photoparDefault;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-2xl">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-4">{nom}</h1>

      <div className="flex justify-center mb-6">
        <img
          src={imageUrl}
          alt={nom}
          className="w-64 h-64 object-cover rounded-lg shadow-md"
        />
      </div>

      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-700">Description</h2>
          <p className="text-gray-600 mt-1">{description}</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-700">Habitat</h2>
          <p className="text-gray-600 mt-1">{habitat.nom}</p>
        </div>
      </div>
    </div>
  );
}

export default GetAnimal;

