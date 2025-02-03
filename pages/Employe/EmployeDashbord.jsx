import React, { useState } from 'react';
import { useLoaderData } from 'react-router';
import AdminService from '../../components/AdminService';
import { getServices } from '../../functions';

export async function loader() {
    return getServices();
}

function EmployeDashbord() {
    const initialServices = useLoaderData();
    const [services, setServices] = useState(initialServices);

    
    const handleDelete = async (id) => {
        try {
            const response = await fetch(`https://localhost:8000/api/services/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la suppression du service');
            }

            // Mettre à jour l'état local pour retirer le service supprimé
            setServices(prevServices => prevServices.filter(service => service.id !== id));

            console.log('Service supprimé avec succès');
        } catch (error) {
            console.error('Erreur:', error);
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {services.map(service => (
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
