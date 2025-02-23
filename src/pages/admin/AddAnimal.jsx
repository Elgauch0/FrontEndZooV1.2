import { useLoaderData, Form, redirect } from "react-router";
import { getHabitats, addAnimal } from "@functions";
import { useState } from "react";

export async function loader() {
    return await getHabitats();
}

export async function action({ request }) {
    const formData = await request.formData();
    await addAnimal(formData);
    return redirect("/dashboardAdmin/animals?message=Animal ajouté avec succès");
}

function AddAnimal() {
    const habitats = useLoaderData();
    const [previewImage, setPreviewImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <h1 className="text-2xl font-bold text-green-900 mb-6">Ajouter un animal</h1>
            <Form method="post" encType="multipart/form-data" className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nom">
                        Nom
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="nom"
                        type="text"
                        name="nom"
                        placeholder="Nom de l'animal"
                        required
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
                        placeholder="Description de l'animal"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="habitatId">
                        Habitat
                    </label>
                    <select
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="habitatId"
                        name="habitatId"
                        required
                    >
                        {habitats.map((habitat) => (
                            <option key={habitat.id} value={habitat.id}>
                                {habitat.nom}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="imageFile">
                        Image de l'animal
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="imageFile"
                        type="file"
                        name="imageFile"
                        accept="image/*"
                        onChange={handleImageChange}
                        required
                    />
                    {previewImage && (
                        <img src={previewImage} alt="Prévisualisation" className="mt-4 w-full h-auto max-h-64 object-contain" />
                    )}
                </div>

                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Ajouter l'animal
                    </button>
                </div>
            </Form>
        </div>
    );
}

export default AddAnimal;

