import { Form, useActionData } from "react-router";
import { addService } from "../../functions";

export async function action({ request }) {
  const formData = await request.formData();
  const nom = formData.get('nom');
  const description = formData.get('description');
  const response = await addService({ nom, description });

  if (!response.success) {
    return { error: response.error };
  }
  return { success: true };
}

function AddServices() {
  const actionData = useActionData();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Form method="post" className="bg-green-900 p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-50 mb-6">Ajouter un nouveau service</h1>

        
        {actionData?.error && (
          <div className="bg-red-500 text-white p-2 rounded mb-4">
            {actionData.error}
          </div>
        )}
        {actionData?.success && (
          <div className="bg-green-500 text-white p-2 rounded mb-4">
            Service ajouté avec succès !
          </div>
        )}

        
        <div className="mb-4">
          <label htmlFor="nom" className="block text-sm font-medium text-gray-50">
            Nom:
          </label>
          <input
            type="text"
            id="nom"
            name="nom"
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
          />
        </div>

        
        <div className="mb-6">
          <label htmlFor="description" className="block text-sm font-medium text-gray-50">
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            required
            className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
          ></textarea>
        </div>

        {/* Bouton pour soumettre le formulaire */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Ajouter le Service
        </button>
      </Form>
    </div>
  );
}

export default AddServices;