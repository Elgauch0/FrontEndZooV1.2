

const Service = () => {
    return (
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center text-green-900 mb-8">
            Nos Services
          </h1>
  
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Service 1 : Restauration */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-2xl font-semibold text-green-900 mb-4">
                🍴 Restauration
              </h2>
              <p className="text-gray-700">
                Profitez d'une pause gourmande dans nos restaurants et cafés situés au cœur du zoo. Nous proposons une variété de plats pour tous les goûts, y compris des options végétariennes et sans gluten.
              </p>
            </div>
  
            {/* Service 2 : Visite Guidée */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-2xl font-semibold text-green-900 mb-4">
                🚶‍♂️ Visite Guidée
              </h2>
              <p className="text-gray-700">
                Découvrez les secrets du zoo avec nos guides experts. Apprenez-en plus sur les animaux, leur habitat et les efforts de conservation. Parfait pour les familles et les groupes scolaires.
              </p>
            </div>
  
            {/* Service 3 : Visite en Petit Train */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-2xl font-semibold text-green-900 mb-4">
                🚂 Visite en Petit Train
              </h2>
              <p className="text-gray-700">
                Explorez le zoo de manière ludique et relaxante à bord de notre petit train. Parfait pour les enfants et les personnes à mobilité réduite. Un parcours commenté vous fera découvrir les points forts du zoo.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Service;