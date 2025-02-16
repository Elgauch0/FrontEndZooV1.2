import { useLoaderData, useSearchParams } from 'react-router';
import AdminService from '../../components/AdminService';
import { deleteService, getServices } from '../../functions';
import { useState } from 'react';

export async function loader() {
  return await getServices();
}

function EmployeDashbord() {
  const initialServices = useLoaderData();
  const [services, setServices] = useState(initialServices);
  const [searchParams] = useSearchParams();

  const errorParam = searchParams.get('error');
  const message = searchParams.get('message');
  const isError = errorParam === 'true';

  const handleDelete = async (id) => {
    const success = await deleteService(id);
    if (success) {
      setServices(prevServices => prevServices.filter(service => service.id !== id));
    }
  };

  return (
    <div>
      {message && (
        <div
          className={`mb-4 px-4 py-3 rounded ${
            isError
              ? 'bg-red-100 border border-red-400 text-red-700'
              : 'bg-green-100 border border-green-400 text-green-700'
          }`}
        >
          {decodeURIComponent(message)}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {services && services.map(service => (
          <AdminService
            key={service.id}
            id={service.id}
            nom={service.nom}
            description={service.description}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default EmployeDashbord;

