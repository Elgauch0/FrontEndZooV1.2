

// Composant pour afficher un utilisateur individuel avec Tailwind CSS
function User({ id, nom, prenom, email, role }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <h2 className="text-xl font-bold">{nom} {prenom}</h2>
      <p className="text-gray-600">Email: {email}</p>
      <p className="text-gray-600">Role: {role}</p>
    </div>
  );
}

export default User;
