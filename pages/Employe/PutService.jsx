import { Form,useLocation,redirect,useNavigate} from "react-router";
import { putService } from "../../functions";





export async function action({ request, params }) {
  const formData = await request.formData();
  const nom = formData.get('nom');
  const description = formData.get('description');
  const { id } = params;

  const success = await putService(id, { nom, description });

  if (success) {
    return redirect(`/dashboardEmployee?error=false&message=${encodeURIComponent('Service modifié avec succès')}`);
  } else {
    return redirect(`/dashboardEmployee?error=true&message=${encodeURIComponent('Erreur lors de la modification du service')}`);
  }
}





function PutService() {
  const location =useLocation();
  const navigate = useNavigate();
  

  if (!location.state || !location.state.nom || !location.state.description) {
    navigate('/dashboardEmployee');
    return null;
}

   const { nom, description } = location.state;


  

    return (
        <div className="min-h-screen flex items-center justify-center bg-green-900">
          <Form method="put" className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            <div className="mb-4">
            <h1 className="text-2xl font-bold text-green-900 mb-4">Editer un service</h1>
          
              <label htmlFor="nom" className="block text-sm font-medium text-gray-700">Nom:</label>
              <input
                type="text"
                id="nom"
                name='nom'
                defaultValue={nom}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description:</label>
              <textarea
                id="description"
                name="description"
                defaultValue={description}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Editer le Service
            </button>
          </Form>
        </div>
      );
}


export default PutService