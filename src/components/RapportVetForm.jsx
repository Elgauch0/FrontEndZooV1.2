import { Form, useActionData, useLoaderData } from "react-router";
import { addRapport, getAnimals } from "@functions";
import { useEffect, useRef } from "react";


export async function loader() {
  const animals = await getAnimals();
  return animals;
}


export async function action({ request }) {
  const formData = await request.formData();
  const animalId = formData.get("animalId");
  const etat = formData.get("etat");
  const nourriture = formData.get("nourriture");
  const autreDetail = formData.get("autreDetail");

  
  if (!animalId || !etat || !nourriture || !autreDetail) {
    return { type: 'error', text: "Tous les champs sont obligatoires." };
  }

  try {
    const result = await addRapport({ etat, nourriture, autreDetail, animalId })
    if (result && result.type === 'error') {
      return result; 
  }

    return { type: 'success', text: 'Rapport vétérinaire ajouté avec succès.' };
  } catch (err) {
    console.error(err);
    return { type: 'error', text: 'Une erreur est survenue, veuillez réessayer plus tard.' };
  }
}

function RapportVetForm() {
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
            <label htmlFor="animalId" className="block text-sm font-medium text-green-900">
              Sélectionnez un animal :
            </label>
            <select
              name="animalId"
              id="animalId"
              className="mt-1 block w-full p-2 border border-green-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
              required
            >
              {animals.map((animal) => (
                <option key={animal.id} value={animal.id}>
                  {animal.nom}
                </option>
              ))}
            </select>
          </div>

         
          <div>
            <label htmlFor="etat" className="block text-sm font-medium text-green-900">
              État de l'animal :
            </label>
            <input
              id="etat"
              name="etat"
              className="mt-1 block w-full p-2 border border-green-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>

          {/* Nourriture donnée */}
          <div>
            <label htmlFor="nourriture" className="block text-sm font-medium text-green-900">
              Nourriture :
            </label>
            <input
              id="nourriture"
              name="nourriture"
              className="mt-1 block w-full p-2 border border-green-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>

          {/* Autres détails */}
          <div>
            <label htmlFor="autreDetail" className="block text-sm font-medium text-green-900">
              Autres détails :
            </label>
            <textarea
              id="autreDetail"
              name="autreDetail"
              rows="4"
              className="mt-1 block w-full p-2 border border-green-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>

          {/* Bouton de soumission */}
          <button
            type="submit"
            className="w-full bg-green-900 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Envoyer le rapport
          </button>
        </Form>
      </div>
    </div>
  );
}

export default RapportVetForm;