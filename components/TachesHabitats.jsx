import { useLoaderData, Form, useActionData } from "react-router";
import { getHabitats, updateHabitatCommentaire} from "../functions";
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
  
    try {
      await updateHabitatCommentaire(id, data);
      return { erreur: false, message: "Commentaire supprimé avec succès !", habitatId: id };
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'habitat :", error.message);
      return { erreur: true, message: error.message || "Problème serveur : le commentaire n'a pas pu être supprimé." };
    }
  }

function TachesHabitats() {
    const habitatsData = useLoaderData();
    const actionData = useActionData();
    const [habitats, setHabitats] = useState(habitatsData);

    
    useEffect(() => {
        if (actionData && !actionData.erreur && actionData.habitatId) {
            console.log('useEffect')
            setHabitats(prev => 
                prev.map(habitat => 
                    habitat.id === actionData.habitatId 
                        ? { ...habitat, commentaire: "Aucune tache" } 
                        : habitat
                )
            );
        }
    }, [actionData]);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold text-green-700 mb-6">Tâches des Habitats</h1>

            {/* Affichage du message */}
            {actionData?.message && (
                <div className={`mb-4 p-4 rounded-md ${actionData.erreur 
                    ? "bg-red-100 text-red-700" 
                    : "bg-green-100 text-green-700"}`}
                >
                    {actionData.message}
                </div>
            )}

            <ul className="space-y-4">
                {habitats.map(habitat => (
                    <li key={habitat.id} className="bg-white p-6 rounded-lg shadow-md">
                        <div className="flex justify-between items-center">
                            <div>
                                <strong className="text-xl text-green-700">{habitat.nom}</strong>
                                <p className="text-gray-600 mt-2">
                                    {habitat.commentaire || "Aucune tache"}
                                </p>
                            </div>
                            <Form method="post">
                                <input type="hidden" name="habitatId" value={habitat.id} />
                                <button
                                    type="submit"
                                    className={`bg-green-700 text-white px-4 py-2 rounded-md transition-colors ${
                                        !habitat.commentaire 
                                            ? "opacity-50 cursor-not-allowed" 
                                            : "hover:bg-green-800"
                                    }`}
                                    disabled={!habitat.commentaire}
                                >
                                    Tâche finie
                                </button>
                            </Form>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TachesHabitats;