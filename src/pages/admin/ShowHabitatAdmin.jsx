import { useLoaderData, useSearchParams } from 'react-router';
import ComponentHabitat from '@components/ComponentHabitat';
import { getHabitats, deleteHabitat } from '@functions';
import { useState, useEffect } from 'react';

export async function loader() {
  return await getHabitats();
}

function ShowHabitatAdmin() {
  const initialData = useLoaderData();
  const [habitatsData, setHabitatsData] = useState(initialData);
  const [message, setMessage] = useState('');
  const [searchParams]= useSearchParams();
  const isError = searchParams.get('error') === 'true';
  const text = searchParams.get('message');
 

  
  useEffect(() => {
    setHabitatsData(initialData);
  }, [initialData]);

  async function handleDelete(id) {
    try {
      await deleteHabitat(id);
      const updatedData = await getHabitats(); 
      setHabitatsData(updatedData);
      setMessage('Habitat supprimé avec succès');
    } catch (error) {
      setMessage("Erreur lors de la suppression");
    }
  }

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div>
      {message && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {message}
        </div>
      )}
      {text && (
        <div
          className={`mb-4 px-4 py-3 rounded ${
            isError
              ? 'bg-red-100 border border-red-400 text-red-700'
              : 'bg-green-100 border border-green-400 text-green-700'
          }`}
        >
          {text}
        </div>
      )}

      <div className="flex flex-wrap justify-center">
        {habitatsData.map((habitat) => (
          <ComponentHabitat
            key={habitat.id}
            habitat={habitat}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default ShowHabitatAdmin;
