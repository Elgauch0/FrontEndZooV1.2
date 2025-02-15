import { useLoaderData, useSearchParams, useNavigate } from 'react-router';
import AnimalComponent from '../../components/AnimalComponent';
import { deleteAnimal, getAnimals } from '../../functions';
import { useEffect } from 'react';




export async function loader() {
    return await getAnimals();
}

function Animals() {
    const animals = useLoaderData();
    const [searchParams] = useSearchParams();
    const message = searchParams.get('message');
    const navigate = useNavigate();

    useEffect(() => {
        console.log('useEffect launched');
    }, [message]);

    async function handleDelete(id) {
        try {
            await deleteAnimal(id);
            navigate('?message=Animal Supprimé avec succes');
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {animals && animals.map((animal) => (
                    <AnimalComponent
                        key={animal.id}
                        animal={animal}
                        onDelete={handleDelete}
                    />
                ))}
            </div>
        </div>
    );
}

export default Animals;