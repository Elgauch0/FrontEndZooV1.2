import { Form,useLocation,redirect,useNavigate} from "react-router";



export async function action({ request, params }) {
  const formData = await request.formData();

  const nom = formData.get('nom');
  const description = formData.get('description');
  
  const { id } = params;

  try {
      const response = await fetch(`https://localhost:8000/api/services/${id}`, {
          method: 'put',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nom, description }),
      });

      if (!response.ok) {
          throw new Error('Erreur lors de la modification du service');
      }

      
      return redirect('/dashboardEmployee');
  } catch (error) {
      console.error('Erreur:', error);
      return { error: 'Une erreur s\'est produite lors de la mise à jour du service' };
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
            <h1 className="text-2xl font-bold text-green-900 mb-4">Editet un service</h1>
          
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