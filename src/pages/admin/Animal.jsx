import { useLocation, Form, redirect } from 'react-router';
import { updateAnimal } from '@functions';

export async function action({ request, params }) {
    const formData = await request.formData();
    const nom = formData.get('nom');
    const description = formData.get('description');
    const habitatId = formData.get('habitatId');
    const imageFile = formData.get('imageFile');
    
    await updateAnimal(params.id, {nom,description,habitatId,imageFile});
    
    return redirect('/dashboardAdmin/animals?message=Animal modifié avec succès');
}

function Animal() {
    const { state: animal } = useLocation();

    return (
        <div className="max-w-md mx-auto mt-10">
            <Form 
                method="post" 
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                encType="multipart/form-data" 
            >
                {/* Champ pour le nom */}
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

                {/* Champ pour la description */}
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

                {/* Champ pour l'image */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                        Image
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="image"
                        type="file"
                        name="imageFile"
                        accept="image/*"
                    />
                    {animal.imageName && (
                        <div className="mt-2 text-sm text-gray-500">
                            Image actuelle : {animal.imageName}
                        </div>
                    )}
                </div>

                {/* Champ caché pour l'habitatId */}
                <div className="mb-6">
                    <input
                        type="hidden"
                        name="habitatId"
                        defaultValue={animal.habitatId}
                    />
                </div>

                {/* Bouton de soumission */}
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

