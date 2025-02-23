import { useLoaderData, useActionData, Form } from "react-router";
import { useState, useEffect } from "react";
import { getHoraire, putHoraire } from "@functions";

export async function loader() {
    return await getHoraire();
}

export async function action({ request }) {
    const formData = await request.formData();
    const id = formData.get('id');
    const horaireData = {
        jour: formData.get("jour"),
        horaireDouverture: formData.get("horaireDouverture")
    };

    try {
        const result = await putHoraire(id, horaireData);
        if (result?.error) {
            return { error: result.text, success: false };
        }
        return { success: true, message: "Horaire mis à jour avec succès" };
    } catch (error) {
        return { error: error.message || "Erreur lors de la mise à jour", success: false };
    }
}

function Horaires() {
    const horaire = useLoaderData();
    const actionData = useActionData();
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        if (actionData?.success) {
            setEditingId(null);
        }
    }, [actionData]);

    return (
        <div className="container mx-auto p-6 max-w-4xl">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Horaires d'ouverture</h1>

            {/* Messages de statut */}
            {actionData?.error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {actionData.error}
                </div>
            )}
            
            {actionData?.success && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                    {actionData.message}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {horaire.map((item) => (
                    <div key={item.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                        {editingId === item.id ? (
                            <Form method="post">
                                <input type="hidden" name="id" value={item.id} />
                                <input type="hidden" name="jour" value={item.jour} />

                                <div className="space-y-3">
                                    <h3 className="text-lg font-medium">{item.jour}</h3>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Horaire d'ouverture
                                        </label>
                                        <input
                                            name="horaireDouverture"
                                            defaultValue={item.horaireDouverture}
                                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        />
                                    </div>

                                    <div className="flex justify-end gap-2 mt-4">
                                        <button
                                            type="button"
                                            onClick={() => setEditingId(null)}
                                            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                                        >
                                            Annuler
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                                        >
                                            Enregistrer
                                        </button>
                                    </div>
                                </div>
                            </Form>
                        ) : (
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="font-medium">{item.jour}</span>
                                    <span className="bg-gray-100 px-2 py-1 rounded-md text-sm">
                                        {item.horaireDouverture}
                                    </span>
                                </div>
                                <button
                                    onClick={() => setEditingId(item.id)}
                                    className="text-indigo-600 hover:text-indigo-800 text-sm"
                                >
                                    Modifier
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Horaires;