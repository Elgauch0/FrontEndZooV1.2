import { Link, useLoaderData, useSearchParams } from 'react-router';
import { useState } from 'react';
import { getreviews } from '../functions';
import Review from '../components/Review';
import ReviewForm from '../components/ReviewForm';

// Nombre d'avis par page
const REVIEWS_PER_PAGE = 6;

export async function loader() {
  const data = await getreviews('valid');
  return data;
}

const Accueil = () => {
  const reviews = useLoaderData();
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);

  // Récupération des messages d'erreur/succès depuis l'URL
  const message = searchParams.get('message');
  const error = searchParams.get('error');

  // Calcul de la pagination
  const totalPages = Math.ceil((reviews?.length || 0) / REVIEWS_PER_PAGE);
  const startIndex = (currentPage - 1) * REVIEWS_PER_PAGE;
  const endIndex = startIndex + REVIEWS_PER_PAGE;
  const currentReviews = reviews?.slice(startIndex, endIndex) || [];

  // Composant de pagination
  const Pagination = () => (
    <div className="flex justify-center gap-2 mt-6">
      <button
        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-green-800 text-white rounded-lg disabled:bg-gray-400"
      >
        Précédent
      </button>
      <span className="px-4 py-2">
        Page {currentPage} sur {totalPages}
      </span>
      <button
        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-green-800 text-white rounded-lg disabled:bg-gray-400"
      >
        Suivant
      </button>
    </div>
  );

  // Section d'en-tête
  const Header = () => (
    <header className="bg-green-900 text-white py-20 text-center">
      <h1 className="text-5xl font-bold">Bienvenue à Arcadia Zoo</h1>
      <p className="mt-4 text-xl">
        Découvrez un monde fascinant d'animaux et de nature.
      </p>
    </header>
  );

  // Section des avis
  const ReviewsSection = () => (
    <div className="my-8">
      <h2 className="text-3xl text-green-900 text-center mb-6">Nos Avis</h2>
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-4">
          {currentReviews.length > 0 ? (
            currentReviews.map((review) => (
              <Review
                key={review.id}
                id={review.id}
                username={review.username}
                avis={review.avis}
              />
            ))
          ) : (
            <p className="text-gray-600 text-center">Aucun avis pour le moment.</p>
          )}
        </div>
        {reviews?.length > REVIEWS_PER_PAGE && <Pagination />}
      </div>
    </div>
  );

  // Navigation principale
  const MainNavigation = () => (
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
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <section className="text-center">
          <h2 className="text-3xl font-bold text-green-900 mb-6">
            Explorez Notre Zoo
          </h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Arcadia Zoo est un lieu magique où vous pouvez rencontrer des animaux 
            incroyables, des habitats naturels reconstitués et participer à des 
            activités éducatives pour toute la famille. Que vous soyez passionné 
            de nature ou simplement curieux, notre zoo a quelque chose à vous offrir.
          </p>
        </section>

        <ReviewsSection />

        <div className="mt-6">
          {message && (
            <p className="text-green-500 font-bold text-center">{message}</p>
          )}
          {error && (
            <p className="text-red-500 font-bold text-center">{error}</p>
          )}
          <ReviewForm />
        </div>

        <MainNavigation />
      </div>
    </div>
  );
};

export default Accueil;