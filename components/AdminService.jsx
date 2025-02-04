import { Link } from 'react-router';

function AdminService({ id, nom, description, onDelete }) {
    const handleClick = (event) => {
        event.preventDefault();
        onDelete(id);
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
            <Link to={`${id}`} state={{nom, description }}  className="block">
                <h3 className="text-xl font-bold mb-2">{nom}</h3>
                <p className="text-gray-600">{description}</p>
            </Link>
            <button 
                onClick={handleClick} 
                className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors duration-300"
            >
                Supprimer ce service
            </button>
        </div>
    );
}

export default AdminService;

