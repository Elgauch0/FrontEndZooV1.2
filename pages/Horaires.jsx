import { useLoaderData } from "react-router";
import { getHoraire } from "../functions";

export async function loader() {
    return await getHoraire();
}

function Horaires() {
    const horaire = useLoaderData();

    return (
        <div className="container mx-auto p-6 max-w-4xl">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Horaires d'ouverture</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {horaire.map((item) => (
                    <div 
                        key={item.id}
                        className="bg-white p-4 rounded-lg shadow-md transition duration-300 hover:shadow-lg"
                    >
                        <div className="flex items-center justify-between">
                            <span className="text-lg font-medium text-gray-700">
                                {item.jour}
                            </span>
                            <span className="text-gray-500 bg-gray-100 px-3 py-1 rounded-full text-sm">
                                {item.horaireDouverture}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Horaires;