

const Service = ({ nom, description }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
      <h3 className="text-xl font-bold mb-2">{nom}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default Service;