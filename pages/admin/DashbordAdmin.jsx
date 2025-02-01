import UserComponent from '../../components/UserComponent';


// Composant principal pour afficher la liste des utilisateurs
function UserList() {
  // Données des utilisateurs initiales
  const initialUsers = [
    {
      id: 1,
      nom: 'Dupont',
      prenom: 'Jean',
      email: 'jean.dupont@example.com',
      role: 'Admin'
    },
    {
      id: 2,
      nom: 'Martin',
      prenom: 'Sophie',
      email: 'sophie.martin@example.com',
      role: 'Employé Simple'
    },
    {
      id: 3,
      nom: 'Bernard',
      prenom: 'Marc',
      email: 'marc.bernard@example.com',
      role: 'Vétérinaire'
    }
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Liste des Utilisateurs</h1>
      {initialUsers.map(user => (
        <UserComponent
          key={user.id}
          id={user.id}
          nom={user.nom}
          prenom={user.prenom}
          email={user.email}
          role={user.role}
        />
      ))}
    </div>
  );
}

export default UserList;
