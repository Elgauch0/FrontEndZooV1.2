import { setRole } from "../functions";




const UserComponent = (props) => {

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-xl font-semibold">{props.nom} {props.prenom}</h2>
      <p className="text-gray-700">Email: {props.email}</p>
      <p className="text-gray-700">Fonction : {setRole(props.roles)}</p>
      <button className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
       onClick={(event)=>props.onDelete(props.id)}>Supprimer</button>
    </div>
  );
};

export default UserComponent;