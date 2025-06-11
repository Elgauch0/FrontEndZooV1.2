import { Link, useLoaderData, useSearchParams } from 'react-router';
import { useState, useEffect } from 'react';
import { getreviews } from '../functions';
import Review from '../components/Review';
import ReviewForm from '../components/ReviewForm';
import ZooBienvenue from '../public/ZooBienvenue.jpg';
import trainHabitats from '../public/trainHabitats.jpg';

const REVIEWS_PER_PAGE = 6;

export async function loader() {
  return await getreviews('valid');
}

const Accueil = () => {
  const reviews = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const message = searchParams.get('message');
  const error = searchParams.get('error');

  // Gestion automatique de la disparition des messages
  useEffect(() => {
    const timer = setTimeout(() => {
      if (message || error) {
        searchParams.delete('message');
        searchParams.delete('error');
        setSearchParams(searchParams);
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [message, error, searchParams, setSearchParams]);

  // Calculs de pagination
  const totalItems = reviews?.length || 0;
  const totalPages = Math.ceil(totalItems / REVIEWS_PER_PAGE);
  const paginatedReviews = reviews?.slice(
    (currentPage - 1) * REVIEWS_PER_PAGE,
    currentPage * REVIEWS_PER_PAGE
  ) || [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Section Héro avec image */}
      <header className="relative h-96 overflow-hidden">
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Bienvenue au Zoo Arcadia
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto">
              Un sanctuaire naturel où la biodiversité rencontre l'émerveillement
            </p>
          </div>
        </div>
        <img
          src={ZooBienvenue}
          alt="Entrée majestueuse du zoo Arcadia"
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </header>

      {/* Contenu principal */}
      <main className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Section présentation */}
        <section className="mb-16 text-center">
          <h2 className="text-3xl font-bold text-green-900 mb-8">
            Explorez Notre Univers Sauvage
          </h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4 text-gray-700 text-lg">
              <p>
                Venez découvrir notre Zoo au cœur de la forêt de Brocéliande situez en Bretagne,
                Évadez-vous et partez à la rencontre de plus de 200 espèces animal issue de la faune mondiale répartis sur
                18 hectares, depuis 50 ans Arcadia s'engage auprès de l'écologie, au maintien de la biodiversité et à la
                conservation des espèces
              </p>
              <p>
                Nos programmes de conservation et de recherche contribuent
                activement à la protection des espèces menacées.
              </p>
            </div>
            <div className="relative h-80 rounded-xl overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1552410260-0fd9b577afa6"
                alt="Lion dans son habitat"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* Section train des habitats - NOUVELLE SECTION */}
        <section className="my-16">
          <Link to="/habitats" className="block group">
            <div className="relative h-80 w-full rounded-xl overflow-hidden shadow-xl">
              <img
                src={trainHabitats}
                alt="Train des habitats du zoo Arcadia"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 transform group-hover:scale-110 transition-transform">
                    Découvrez Nos Habitats
                  </h3>
                  <p className="inline-block bg-green-800 text-white px-4 py-2 rounded-lg shadow-md group-hover:bg-green-700 transition-colors">
                    Cliquez pour visiter
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </section>

        {/* Section avis */}
        <section className="my-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-green-900 mb-2">
              Témoignages de Nos Visiteurs
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Découvrez ce que nos visiteurs pensent de leur expérience au Zoo
            </p>
          </div>

          {/* Liste des avis */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {paginatedReviews.length > 0 ? (
              paginatedReviews.map((review) => (
                <Review key={review.id} {...review} />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500 py-8">
                Soyez le premier à partager votre expérience !
              </p>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-6 py-2 bg-green-800 text-white rounded-lg disabled:opacity-50 transition-opacity"
              >
                Précédent
              </button>
              <span className="flex items-center px-4">
                Page {currentPage} / {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-6 py-2 bg-green-800 text-white rounded-lg disabled:opacity-50 transition-opacity"
              >
                Suivant
              </button>
            </div>
          )}
        </section>

        {/* Formulaire d'avis */}
        <section className="my-16">
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold text-green-900 mb-6 text-center">
              Partagez Votre Expérience
            </h3>
            {message && (
              <p className="text-green-600 text-center mb-4 animate-fade-in">
                {message}
              </p>
            )}
            {error && (
              <p className="text-red-500 text-center mb-4 animate-fade-in">
                {error}
              </p>
            )}
            <ReviewForm />
          </div>
        </section>

        {/* Navigation */}
        <nav className="flex flex-col sm:flex-row justify-center gap-6 mt-16">
          <Link
            to="/services"
            className="bg-green-800 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-medium transition-colors text-center"
          >
            Découvrir Nos Services
          </Link>
          <Link
            to="/contact"
            className="bg-green-800 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-medium transition-colors text-center"
          >
            Planifier Votre Visite
          </Link>
        </nav>
      </main>
    </div>
  );
};

export default Accueil;