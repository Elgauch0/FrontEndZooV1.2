

const Alimentation = ({ nom, animal_id, nourritureDonnée, quantité, givenAt }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-4 hover:shadow-xl transition-shadow duration-300">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-green-700">{nom}</h3>
        <span className="text-sm text-gray-500">{new Date(givenAt).toLocaleString()}</span>
      </div>
      <div className="space-y-2">
        {/* <p className="text-gray-700">
          <span className="font-semibold">Animal:</span> {animal_id.nom}
        </p> */}
        <p className="text-gray-700">
          <span className="font-semibold">Nourriture donnée:</span> {nourritureDonnée}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Quantité:</span> {quantité}
        </p>
      </div>
    </div>
  );
};

export default Alimentation;