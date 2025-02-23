const AdminReview = ({ username, id, avis, handleCLick }) => {
  return (
    <div className="bg-green-900 text-white rounded-lg shadow-md my-4 p-4 w-full max-w-2xl mx-auto transition duration-300 hover:scale-105">
      <div className="flex items-center justify-between mb-2">
        <span className="font-bold text-lg">{username}</span>
        <span className="text-sm text-gray-300">ID: {id}</span>
      </div>
      <p className="text-gray-200 leading-relaxed">{avis}</p>
      <div className="flex justify-end gap-2 mt-3">
        <button
          onClick={() => handleCLick(id, 'validate')}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition duration-200"
        >
          Valider
        </button>
        <button
          onClick={() => handleCLick(id, 'delete')}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-200"
        >
          Supprimer
        </button>
      </div>
    </div>
  );
};

export default AdminReview;