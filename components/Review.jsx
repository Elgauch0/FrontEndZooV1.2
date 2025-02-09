const Review = ({ username, id, avis }) => {
  return (
    <div className="bg-green-900 text-white rounded-lg shadow-md p-4 transition duration-300 hover:scale-105 w-full md:w-80 overflow-hidden"> {/* Largeur fixe pour tous les avis */}
      <div className="flex items-center justify-between mb-2">
        <span className="font-bold text-lg">{username}</span>
        <span className="text-sm text-gray-300">ID: {id}</span>
      </div>
      <p className="text-gray-200 leading-relaxed break-words overflow-y-auto max-h-24"> {/* Limite la hauteur et ajoute une barre de défilement si nécessaire */}
        {avis}
      </p>
    </div>
  );
};

export default Review;