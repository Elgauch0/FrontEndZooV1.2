import { useLoaderData } from 'react-router';
import ServiceCard from '@components/ServiceConponent'
import { getServices } from '@functions';

export async function loader() {
  try {
    const services = await getServices();
    // Vérification que le résultat est bien un tableau
    return { services: Array.isArray(services) ? services : [], error: null };
  } catch (error) {
    return { services: [], error: error.message };
  }
}

const ServicesPage = () => {
  const { services, error } = useLoaderData();

  // Conversion en tableau pour sécurité supplémentaire
  const safeServices = Array.isArray(services) ? services : [];

  return (
    <main className="bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4 py-12 lg:py-16 max-w-7xl">
        <header className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Nos Services
          </h1>
        </header>

        {/* Affichage des erreurs */}
        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-8 text-center">
            Problème de connexion au serveur : {error}
          </div>
        )}

        {/* Affichage conditionnel du contenu */}
        <div className="space-y-8">
          {safeServices.length === 0 ? (
            // Cas où il n'y a pas d'erreur mais aucun service
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <p className="text-gray-500 italic">
                {error ?
                  "Impossible de charger les services" :
                  "Aucun service disponible pour le moment"
                }
              </p>
            </div>
          ) : (
            // Affichage normal des services
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {safeServices.map((service) => (
                <ServiceCard
                  key={service.id}
                  nom={service.nom}
                  description={service.description}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default ServicesPage;