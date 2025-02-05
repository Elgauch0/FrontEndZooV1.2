const Review = ({ username, id, avis }) => {
  return (
    <div className="bg-green-900 text-white rounded-lg shadow-md my-4 p-4 transition duration-300 hover:scale-105 max-w-md max-h-48 overflow-hidden"> {/* Ajout de max-w-md et max-h-48 */}
      <div className="flex items-center justify-between mb-2">
        <span className="font-bold text-lg">{username}</span>
        <span className="text-sm text-gray-300">ID: {id}</span>
      </div>
      <p className="text-gray-200 leading-relaxed break-words"> {/* Ajout de break-words */}
        {avis} {/* Rendu de avis */}
      </p>
    </div>
  );
};

export default Review;