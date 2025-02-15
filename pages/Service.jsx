import { useLoaderData } from 'react-router';
import ServiceCard from '../components/ServiceConponent'
import { getServices } from '../functions';

export async function loader() {
  try {
    const services = await getServices();
    return { services, error: null };
  } catch (error) {
    return { services: [], error: error.message };
  }
}

const ServicesPage = () => {
  const { services, error } = useLoaderData();

  return (
    <main className="bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4 py-12 lg:py-16 max-w-7xl">
        <header className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Nos Services
          </h1>
        </header>

        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-8 text-center">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services?.map((service) => (
            <ServiceCard
              key={service.id}
              nom={service.nom}
              description={service.description}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default ServicesPage;