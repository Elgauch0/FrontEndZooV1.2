import { useSearchParams,Link } from "react-router"

function Confirmation() {
    const [searchParm]= useSearchParams();
    const message = searchParm.get('message');

    return (
        <div className="min-h-screen bg-gray-100 py-8">
          <div className="container mx-auto px-4">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
              {message && (
                <div className="text-center">
                  <p className= 'text-grey-600'>
                    {message}
                  </p>
                </div>
              )}
              {!message && ( 
                <div className="text-center">
                  <p className="text-gray-500">
                    Aucun message à afficher.
                  </p>
                </div>
              )}
            </div>
            <div className="text-center"> {/* Centre le lien */}
            <Link to="/" className="text-green-900 mt-2.5  bg-green-400hover:underline">
              Retour à l'accueil
            </Link>
          </div>

          </div>
        </div>
    )
   
}

export default Confirmation