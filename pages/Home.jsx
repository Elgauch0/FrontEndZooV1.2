import { Link, useLoaderData,useSearchParams } from 'react-router';
import { getreviews } from '../functions';
import Review from '../components/Review';
import ReviewForm from '../components/ReviewForm';




export async function loader(){
  const data = await getreviews('valid');
  return data;
}

const Accueil = () => {
  sessionStorage.clear();

const Reviews = useLoaderData();
const [searchParams] = useSearchParams();
const message = searchParams.get('message');
const error = searchParams.get('error');
  



  const ReviewElements = Reviews?.map(review => (
    <Review key={review.id} id={review.id} username={review.username} avis={review.avis} />
  )) ?? <p>Aucun avis pour le moment.</p>;

  

 
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
        <h1 className="m-3 text-3xl text-green-900 text-center">Nos Avis :</h1>
      <div className="container mx-auto flex justify-center flex-wrap gap-2">
        {ReviewElements}
      </div>
      <div>
      {message && (
        <p className="text-green-500 font-bold mt-2 text-center">
          {message}
        </p>
      )}
      {error && (
        <p className="text-red-500 font-bold mt-2 text-center">
          {error}
        </p>
      )}
            <ReviewForm/>
      </div>
        

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