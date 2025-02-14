
import { useLoaderData} from 'react-router';
import AdminService from '../../components/AdminService';
import { deleteService, getServices } from '../../functions';
import { useState } from 'react';

export async function loader() {
    return await getServices();
}

function EmployeDashbord() {
    const initialServices = useLoaderData();
    const [services, setServices] = useState(initialServices);

    
    const handleDelete = async (id) => {
       const success = await deleteService(id);
       if(success){
        setServices(prevServices => prevServices.filter(service => service.id !== id));
       }
    };

    return (
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
       
    );
}

export default EmployeDashbord;
