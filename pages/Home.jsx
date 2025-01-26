import { Link } from 'react-router';

const Accueil = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* En-tête */}
      <header className="bg-green-900 text-white py-20 text-center">
        <h1 className="text-5xl font-bold">Bienvenue à Arcadia Zoo</h1>
        <p className="mt-4 text-xl">
          Découvrez un monde fascinant d'animaux et de nature.
        </p>
      </header>

      {/* Contenu principal */}
      <div className="container mx-auto px-4 py-12">
        <section className="text-center">
          <h2 className="text-3xl font-bold text-green-900 mb-6">
            Explorez Notre Zoo
          </h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Arcadia Zoo est un lieu magique où vous pouvez rencontrer des animaux incroyables, des habitats naturels reconstitués et participer à des activités éducatives pour toute la famille. Que vous soyez passionné de nature ou simplement curieux, notre zoo a quelque chose à vous offrir.
          </p>
        </section>

        {/* Liens vers les services et contact */}
        <div className="mt-12 flex justify-center space-x-6">
          <Link
            to="/services"
            className="bg-green-900 text-white py-3 px-6 rounded-lg hover:bg-green-800 transition-colors duration-300"
          >
            Nos Services
          </Link>
          <Link
            to="/contact"
            className="bg-green-900 text-white py-3 px-6 rounded-lg hover:bg-green-800 transition-colors duration-300"
          >
            Nous Contacter
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Accueil;