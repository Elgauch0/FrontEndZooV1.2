import { useLocation, Form, redirect } from 'react-router';
import habitatParDefault from '@assets/habitatParDefault.jpg';
import { updateHabitat ,API_SOURCE} from '@functions';


export async function action({ request, params }) {
  const formData = await request.formData();
  const nom = formData.get('nom');
  const description=formData.get('description');
  const imageFile = formData.get('imageFile');
  const response =  await updateHabitat({nom,description,imageFile}, params.id);
  
   return redirect(`/dashboardAdmin/habitats?error=${response.error}&message=${response.text}`);
}



function HabitatDetail() {
  const location = useLocation();
  const habitat = location.state?.habitat;
  

  
    if (!habitat) {
      navigate('/dashboardAdmin/habitats?',{replace:true}); 
    }
  

  const imageUrl = habitat?.imageName
    ? `${API_SOURCE}/uploads/images/habitats/${habitat.imageName}`
    : habitatParDefault;

  return (
    <div className="max-w-4xl mx-auto my-10">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <img
          src={imageUrl}
          alt={habitat.nom}
          className="w-full h-64 object-cover"
        />
        <div className="p-8">
          <Form
            method="post"
            encType="multipart/form-data"
          >

            <div className="mb-4">
              <label htmlFor="nom" className="block text-gray-700 font-bold mb-2">
                Nom de l'habitat
              </label>
              <input
                type="text"
                id="nom"
                name="nom"
                defaultValue={habitat.nom}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                defaultValue={habitat.description}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="image" className="block text-gray-700 font-bold mb-2">
                Image de l'habitat
              </label>
              <input
                type="file" 
                id="image"
                name="imageFile"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>

            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Enregistrer les modifications
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default HabitatDetail;