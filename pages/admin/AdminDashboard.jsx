import { useLoaderData } from "react-router";
import { getStatistic } from "../../functions";


export async function loader() {
  try {
    const statistics = await getStatistic();
    
    return statistics || [];
  } catch (error) {
    console.error("Erreur lors du chargement des statistiques :", error);
    return []; 
  }
}

function AdminDashboard() {
  const statistics = useLoaderData();

  // Vérification supplémentaire dans le composant
  if (!statistics || statistics.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Dashboard des visites d'animaux
        </h1>
        <p className="text-gray-600">Aucune statistique à afficher pour le moment.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Dashboard des visites d'animaux
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr>
              <th className="py-3 px-5 bg-gray-200 text-gray-600 font-bold uppercase text-sm">
                Animal
              </th>
              <th className="py-3 px-5 bg-gray-200 text-gray-600 font-bold uppercase text-sm">
                Nombre de visites
              </th>
            </tr>
          </thead>
          <tbody>
            {statistics.map((stat) => (
              <tr key={stat.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-5 text-gray-700">{stat.animalName}</td>
                <td className="py-3 px-5 text-gray-700">{stat.animalCountVisit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDashboard;

