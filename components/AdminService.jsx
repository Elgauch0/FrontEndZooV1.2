import { Link } from 'react-router';

function AdminService({ id, nom, description, onDelete }) {
    const handleDeleteClick = (event) => {
        event.preventDefault();
        onDelete(id);
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
            <Link 
                to={`${id}`} 
                state={{ nom, description }}  
                className="block cursor-pointer"
            >
                <h3 className="text-xl font-bold mb-2">{nom}</h3>
                <p className="text-gray-600 mb-4">{description}</p>
                <p className="text-sm text-blue-500 italic">
                    Cliquez pour modifier ce service.
                </p>
            </Link>
            <button 
                onClick={handleDeleteClick} 
                className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors duration-300"
            >
                Supprimer ce service
            </button>
        </div>
    );
}

export default AdminService;

