import { useLocation, Form, redirect } from 'react-router';

export async function action({ request, params }) {
    const formData = await request.formData();
    const updatedAnimal = {
        nom: formData.get('nom'),
        description: formData.get('description'),
        habitatId: formData.get('habitatId'),
    };

    const response = await fetch(`https://localhost:8000/api/animal/${params.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedAnimal),
    });

    if (!response.ok) {
        throw new Error('Failed to update animal');
    }
    
    return redirect('/dashboardAdmin/animals?message=Animal modifié avec succès');
}

function Animal() {
    const { state: animal } = useLocation();

    return (
        <div className="max-w-md mx-auto mt-10">
            <Form method="put" className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nom">
                        Nom
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="nom"
                        type="text"
                        name="nom"
                        defaultValue={animal.nom}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                        Description
                    </label>
                    <textarea
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="description"
                        name="description"
                        defaultValue={animal.description}
                    />
                </div>
                <div className="mb-6">
                    <input
                        type="hidden"
                        name="habitatId"
                        defaultValue={animal.habitatId}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Modifier l'animal
                    </button>
                </div>
            </Form>
        </div>
    );
}

export default Animal;

