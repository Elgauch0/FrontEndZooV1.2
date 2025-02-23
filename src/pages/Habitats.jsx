import { useLoaderData, Link } from 'react-router';
import Habitat from '@components/Habitat';
import { getHabitats } from '@functions';

export async function loader() {
  try {
    const habitats = await getHabitats();
    return {
      data: Array.isArray(habitats) ? habitats.map(h => ({
        ...h,
        animaux: Array.isArray(h.animaux) ? h.animaux : []
      })) : [],
      error: null
    };
  } catch (error) {
    return { data: [], error: error.message };
  }
}

function Habitats() {
  const { data: habitats, error } = useLoaderData();
  const safeHabitats = Array.isArray(habitats) ? habitats : [];

  return (
    <div className="space-y-8 p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-green-900 text-center mb-8">
        Liste des Habitats
      </h1>

      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-8 text-center">
          Erreur de chargement : {error}
        </div>
      )}

      {safeHabitats.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm">
          <p className="text-gray-500 italic">
            {error ?
              "Impossible de charger les habitats" :
              "Aucun habitat disponible pour le moment"
            }
          </p>
        </div>
      ) : (
        safeHabitats.map((habitat) => (
          <div
            key={habitat.id}
            className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <Habitat
              nom={habitat.nom}
              description={habitat.description}
              imageName={habitat.imageName}
            />

            <div className="mt-6">
              <h3 className="text-2xl font-semibold text-green-800 mb-4 border-b-2 border-green-200 pb-2">
                Animaux dans cet habitat
              </h3>

              {habitat.animaux?.length > 0 ? (
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {habitat.animaux.map((animal) => (
                    <li
                      key={animal.id}
                      className="bg-green-50 p-4 rounded-lg hover:bg-green-100 transition-colors duration-200"
                    >
                      <Link
                        to={`/animal/${animal.id}`}
                        className="flex items-center space-x-3"
                      >
                        <span className="text-green-600">🐾</span>
                        <span className="text-lg font-medium text-green-900">
                          {animal.nom}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="bg-yellow-50 text-yellow-700 p-4 rounded-lg">
                  Aucun animal recensé dans cet habitat
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Habitats;