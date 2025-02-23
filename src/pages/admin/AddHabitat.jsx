import { Form, redirect, } from 'react-router';
import { createHabitat } from '@functions';


export async function action({request}){
    const formData =  await request.formData();
    const nom = formData.get('nom');
    const description = formData.get('description');
    const imageFile = formData.get('imageFile');
   const succes= await createHabitat({nom,description,imageFile});
   if(succes){
    return redirect("/dashboardAdmin/habitats?message=Animal ajouté avec succès");
   }

}



function AddHabitatForm() {
  return (
    <div className="max-w-4xl mx-auto my-10">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-8">
          <Form 
            method="post" 
            encType="multipart/form-data"
          >
            <div className="mb-4">
              <label htmlFor="nom" className="block text-gray-700 font-bold mb-2">
                Nom de l'habitat *
              </label>
              <input
                type="text"
                id="nom"
                name="nom"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="image" className="block text-gray-700 font-bold mb-2">
                Image de l'habitat *
              </label>
              <input
                type="file"
                id="image"
                name="imageFile"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                required
                accept="image/*"
              />
              <p className="text-sm text-gray-500 mt-1">Formats acceptés: JPEG, PNG</p>
            </div>

            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Créer l'habitat
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default AddHabitatForm;