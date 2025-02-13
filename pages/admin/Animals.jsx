import { useLoaderData, useSearchParams,useNavigate } from 'react-router';
import AnimalComponent from '../../components/AnimalComponent';
import { getAnimals } from '../../functions';
import { useEffect } from 'react';

export async function loader() {
    return await getAnimals();
}

function Animals() {
    const animals = useLoaderData();
    const [searchParams] = useSearchParams();
    const message = searchParams.get('message');
    const navigate = useNavigate();


    useEffect(()=>{
       console.log('useEffect lunched')
    },[message])

    async function handleDelete(id){
        try {
            const response = await fetch(`https://localhost:8000/api/animal/${id}`, {
              method: "DELETE",
            });
            if (!response.ok) {
                console.log('response not ok')
              throw new Error("Erreur lors de la suppression de l'animal");
            }
           navigate('?message=Animal Supprimé avec succes')
           
          } catch (error) {
            console.error("Erreur:", error);
          }
    
}

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold text-green-900 mb-8">Liste des Animaux</h1>
            {message && (
                <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6">
                    {message}
                </div>
            )}
            <div className="space-y-6">
                {animals && animals.map((animal) => (
                    <AnimalComponent
                        key={animal.id}
                        id={animal.id}
                        nom={animal.nom}
                        description={animal.description}
                        habitat={animal.habitat}
                        onDelete={handleDelete}
                    />
                ))}
            </div>
        </div>
    );
}

export default Animals;