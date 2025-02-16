import { useLoaderData, Form, useActionData ,useNavigation } from 'react-router';
import { getUsers, deleteUser, createUser,requireAuth } from '../../functions';
import UserComponent from '../../components/UserComponent';
import { useState,useRef, useEffect } from 'react';



export async function loader() {
  
  if(!requireAuth()){
    return redirect('/administration?message=Vous devez être connecté pour aller à cette page');
   }
  return await getUsers();
}

export async function action({ request }) {
  const formData = await request.formData();
  const userData = {
    email: formData.get('email'),
    prenom: formData.get('prenom'),
    nom: formData.get('nom'),
    Vet: formData.get('Vet') === 'on',
    password: formData.get('password'),
  };

  try {
    await createUser(userData);
    return { success: 'Utilisateur créé avec succès!' };
  } catch (error) {
    console.error('Erreur lors de la création de l\'utilisateur:', error);
    return { error: 'Erreur lors de la création de l\'utilisateur.' };
  }
}

function DashboardAdmin() {
  const initialUsers = useLoaderData();
  const actionData = useActionData();
  const [users, setUsers] = useState(initialUsers);
  const [deleteError, setDeleteError] = useState(null);
  const navigation = useNavigation();
  const formRef = useRef();


  useEffect(()=>{
    formRef.current.reset();
    getUsers().then(users => setUsers(users));
    

  },[actionData])

  async function handleDelete(id) {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      try {
        await deleteUser(id);
        setUsers(users.filter(user => user.id !== id));
        setDeleteError(null);
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        setDeleteError('Erreur lors de la suppression de l\'utilisateur.');
      }
    }
  }

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Liste des Utilisateurs</h1>
        {users.map(user => (
          <UserComponent
            key={user.id}
            id={user.id}
            nom={user.nom}
            prenom={user.prenom}
            email={user.email}
            roles={user.roles}
            onDelete={handleDelete}
          />
        ))}
      </div>
      <h1 className="text-center bg-green-700 text-white py-4 px-6 rounded-2xl shadow-md">Ajouter un employé</h1>
      <div className="flex flex-col items-center p-6">
        {actionData?.success && (
          <div className="w-full max-w-md mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
            {actionData.success}
          </div>
        )}
        
        {actionData?.error && (
          <div className="w-full max-w-md mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {actionData.error}
          </div>
        )}
        
        {deleteError && (
          <div className="w-full max-w-md mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {deleteError}
          </div>
        )}

        <Form 
          method="post" 
          className="space-y-4 max-w-md w-full p-6 bg-white shadow-md rounded-lg"
          ref={formRef}
          
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Prénom</label>
            <input
              type="text"
              name="prenom"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Nom</label>
            <input
              type="text"
              name="nom"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Vétérinaire</label>
            <input
              type="checkbox"
              name="Vet"
              className="mt-1 block"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Mot de passe</label>
            <input
              type="password"
              name="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={navigation.state==='submitting'}
              className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${
                navigation.state==='submitting' ? 'bg-indigo-300' : 'bg-indigo-600 hover:bg-indigo-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            >
              {navigation.state==='submitting'? 'Création en cours...' : 'Créer l\'utilisateur'}
            </button>
          </div>
        </Form>
      </div>
    </>
  );
}

export default DashboardAdmin;
