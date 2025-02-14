import Service from '../components/ServiceConponent';
import { getServices } from '../functions';
import { useLoaderData } from 'react-router';


export async function loader(){
return await  getServices();
}

const Services = () => {

  const services= useLoaderData();
 

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Nos Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services && services.map((service) => (
          <Service key={service.id} nom={service.nom} description={service.description} />
        ))}
      </div>
    </div>
  );
};

export default Services;