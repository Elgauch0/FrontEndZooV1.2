import { Form } from "react-router";




export async function action({request}){
  const formData = await  request.formData();
  const usurname = formData.get('email');
  const password = formData.get('password');
  try{

    const response = await fetch('http://localhost:8000/api/login',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body: JSON.stringify({usurname,password})
     });
    if(response.ok){
      const data = await response.json();
      console.log(data);
    }
    
    
    
  }catch(err){
    console.log(err);
    return 'une erreur s\'est produite';

  }
  
  
  
   ;
}


const Administration = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-green-900 mb-6">
          Connexion Administrateur
        </h1>

       
        <Form method='post'>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 mb-2">
              Nom d'utilisateur
            </label>
            <input
              type="email"
              id="username"
              name="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Entrez votre nom d'utilisateur"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 mb-2">
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Entrez votre mot de passe"
            />
          </div>


          <button
            type="submit"
            className="w-full bg-green-900 text-white py-2 px-4 rounded-lg hover:bg-green-800 transition-colors duration-300"
          >
            Se connecter
          </button>
        </Form>
      </div>
    </div>
  );
};

export default Administration;