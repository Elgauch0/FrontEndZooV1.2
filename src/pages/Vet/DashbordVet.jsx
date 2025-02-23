import { useLoaderData,useNavigate } from 'react-router';
import ComponentAlimentation from '@components/ComponentAlimentation';
import { getRapports } from '@functions';
import { useState ,useEffect} from 'react';

export async function loader({ request }) {
  const url = new URL(request.url);
  const page = url.searchParams.get('page') || 1;
  const limit = url.searchParams.get('limit') || 10;
  return await getRapports(page, limit);
}



const AlimentationList = () => {
  const alimentations = useLoaderData();
  const [page, setPage] = useState(1);
  const limit = 9; 
  const navigate = useNavigate();

  useEffect(() => {
    if (alimentations == null) {
      setPage(1);
    }
  }, 
)
 
  const loadPage = async (newPage) => {
    const data = await getRapports(newPage, limit);
    if (data) {
      setPage( newPage);
      navigate(`?page=${newPage}&limit=${limit}`); 
    }
  };
 
  

  return (
    <div className="min-h-screen bg-green-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-green-700 mb-8">Alimentation donnée aux animaux</h1>
        <div className="space-y-6">
          {alimentations.map((alimentation) => (
            <ComponentAlimentation
              key={alimentation.id}
              nom={alimentation.animal_id.nom}
              animal_id={alimentation.animal_id}
              nourritureDonnée={alimentation.nourritureDonnée}
              quantité={alimentation.quantité}
              givenAt={alimentation.givenAt}
            />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-between mt-8">
          <button
            onClick={() => loadPage(page - 1)}
            disabled={page === 1}
            className="bg-green-700 text-white px-4 py-2 rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Précédent
          </button>
          <span className="text-green-700 font-bold">Page {page}</span>
          <button
            onClick={() => loadPage(page + 1)}
            disabled={alimentations.length < limit || alimentations.length === 0} 
            className="bg-green-700 text-white px-4 py-2 rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Suivant
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlimentationList;