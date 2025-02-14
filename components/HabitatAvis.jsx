import { useLoaderData, Form, useActionData } from "react-router";
import { addAvisVet, getHabitats } from "../functions";
import { useEffect, useRef, useState } from "react";


export async function loader() {
    return await getHabitats();
}


export async function action({ request }) {
    const formData = await request.formData();
    const commentaire = formData.get("commentaire");
    const id = formData.get("habitatId");

    const data = {
        action: "editCommentaire",
        commentaire: commentaire,
    };

  return await addAvisVet(id,data)
}

function HabitatAvis() {
    const habitats = useLoaderData();
    const actionData = useActionData();
    const formRef = useRef();
    const [selectedHabitat, setSelectedHabitat] = useState(null);
    const [forceRender, setForceRender] = useState(false);

   
    useEffect(() => {
        if (actionData && !actionData.erreur) {
            console.log('useEffect lancé')
            formRef.current.reset();
            setSelectedHabitat(null);
            setForceRender(prev =>!prev);
        }
    }, [actionData]);


    const handleHabitatChange = (event) => {
        const habitatId = event.target.value;
        const habitat = habitats.find((h) => h.id === parseInt(habitatId));
        setSelectedHabitat(habitat);
    };

    return (
        <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
            
            <Form method="post" ref={formRef}>
                
                <div className="mb-4">
                    <label htmlFor="habitatId" className="block text-gray-700 font-bold mb-2">
                        Sélectionnez l'habitat à commenter :
                    </label>
                    <select
                        name="habitatId"
                        id="habitatId"
                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
                        onChange={handleHabitatChange}
                    >
                        <option value="">Choisissez un habitat</option>
                        {habitats.map((habitat) => (
                            <option key={habitat.id} value={habitat.id}>
                                {habitat.nom}
                            </option>
                        ))}
                    </select>
                </div>

               
                <div className="mb-4">
                    <label htmlFor="commentaire" className="block text-gray-700 font-bold mb-2">
                        Commentaire :
                    </label>
                    <textarea
                        id="commentaire"
                        name="commentaire"
                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
                        rows="4"
                        placeholder="Ajoutez votre commentaire ici..."
                        defaultValue={selectedHabitat?.commentaire || ""}
                    />
                </div>

                {/* Bouton de soumission */}
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
                    >
                        Soumettre
                    </button>
                </div>
            </Form>

            {/* Affichage des messages de retour */}
            {actionData && (
                <div
                    className={`mt-4 p-3 rounded-lg ${
                        actionData.erreur ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
                    }`}
                >
                    {actionData.message}
                </div>
            )}
        </div>
    );
}

export default HabitatAvis;