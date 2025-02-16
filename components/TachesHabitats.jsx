import { useLoaderData, Form, useActionData } from "react-router";
import { getHabitats, addTache } from "../functions";
import { useState, useEffect } from "react";

export async function loader() {
    return await getHabitats();
}

export async function action({ request }) {
    const formData = await request.formData();
    const id = formData.get("habitatId");
    const data = {
        action: "editCommentaire",
        commentaire: null,
    };
    return await addTache(id, data);
}

function TachesHabitats() {
    const habitatsData = useLoaderData();
    const actionData = useActionData();
    const [habitats, setHabitats] = useState(habitatsData);

    useEffect(() => {
        // Rafraîchir les habitats après une action réussie
        const refreshData = async () => {
            if (actionData && !actionData.erreur) {
                const newData = await getHabitats();
                setHabitats(newData);
            }
        };
        refreshData();
    }, [actionData]);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold text-green-700 mb-6">Tâches des Habitats</h1>

            {actionData?.message && (
                <div className={`mb-4 p-4 rounded-md ${
                    actionData.erreur 
                        ? "bg-red-100 text-red-700" 
                        : "bg-green-100 text-green-700"
                }`}>
                    {actionData.message}
                </div>
            )}

            <ul className="space-y-4">
                {habitats.map(habitat => (
                    <li key={habitat.id} className="bg-white p-6 rounded-lg shadow-md">
                        <div className="flex justify-between items-center">
                            <div className="flex-1">
                                <strong className="text-xl text-green-700">{habitat.nom}</strong>
                                <div className="mt-2">
                                    <p className="text-gray-600 font-medium">
                                        {habitat.commentaire 
                                            ? "Tâche du jour :"
                                            : `Aucune tache dans l'habitat ${habitat.nom} aujourd'hui`}
                                    </p>
                                    {habitat.commentaire && (
                                        <p className="text-gray-600 mt-1 italic">
                                            {habitat.commentaire}
                                        </p>
                                    )}
                                </div>
                            </div>
                            
                            {habitat.commentaire && (
                                <Form method="post">
                                    <input type="hidden" name="habitatId" value={habitat.id} />
                                    <button
                                        type="submit"
                                        className="bg-green-700 text-white px-4 py-2 rounded-md 
                                                   hover:bg-green-800 transition-colors"
                                    >
                                        Tâche finie
                                    </button>
                                </Form>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TachesHabitats;