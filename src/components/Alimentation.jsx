import { Form, useActionData, useLoaderData } from "react-router";
import { getAnimals ,addAlimentation} from "@functions";
import { useEffect, useRef } from "react";

export async function loader() {
  const animals = await getAnimals();
  return animals;
}

export async function action({ request }) {
  const formData = await request.formData();
  const animal_id = formData.get("animal_id");
  const nourriture_donnée = formData.get("nourriture_donnée");
  const quantité = formData.get("quantité");

  if (!animal_id || !nourriture_donnée || !quantité) {
    return { type: 'error', text: "Tous les champs sont obligatoires." };
  }

  try {
    await addAlimentation(animal_id, nourriture_donnée, quantité);
    return { type: 'success', text: 'Nourriture ajoutée avec succès.' };
  } catch (err) {
    console.error(err);
    return { type: 'error', text: err.message || 'Une erreur est survenue, veuillez réessayer plus tard.' };
  }
}

function Alimentation() {
  const animals = useLoaderData();
  const message = useActionData();
  const formRef = useRef(null);

  useEffect(() => {
    if (message) {
      formRef.current.reset();
    }
  }, [message]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 p-4">
      <div className="w-full max-w-md space-y-4">
        {message && (
          <p className={`text-center text-${message.type === 'error' ? 'red' : 'green'}-500`}>
            {message.text}
          </p>
        )}

        <Form method="post" className="bg-white shadow-lg rounded-lg p-6 space-y-6" ref={formRef}>
          <div>
            <label htmlFor="animal_id" className="block text-sm font-medium text-green-900">
              Sélectionnez un animal :
            </label>
            <select
              name="animal_id"
              id="animal_id"
              className="mt-1 block w-full p-2 border border-green-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            >
              {animals.map((animal) => (
                <option key={animal.id} value={animal.id}>
                  {animal.nom}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="nourriture" className="block text-sm font-medium text-green-900">
              La nourriture à donner :
            </label>
            <input
              id="nourriture"
              name="nourriture_donnée"
              className="mt-1 block w-full p-2 border border-green-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div>
            <label htmlFor="quantité" className="block text-sm font-medium text-green-900">
              Quantité :
            </label>
            <input
              id="quantité"
              name="quantité"
              className="mt-1 block w-full p-2 border border-green-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-900 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Envoyer
          </button>
        </Form>
      </div>
    </div>
  );
}

export default Alimentation;