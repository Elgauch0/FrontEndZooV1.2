

const ServiceCard = ({ nom, description }) => {
  return (
    <article className="group relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 h-full">
      <div className="p-6 flex flex-col h-full">
        {/* Icône SVG intégrée */}
        <div className="mb-4 text-green-600 group-hover:text-green-800 transition-colors">
          <svg 
            className="w-8 h-8" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" 
            />
          </svg>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-2">{nom}</h3>
        <p className="text-gray-600 flex-grow">{description}</p>
      </div>
    </article>
  );
};

export default ServiceCard;