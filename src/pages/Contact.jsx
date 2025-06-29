
import { Form, redirect, useNavigation, useSearchParams } from 'react-router';
import { useRef, useEffect } from 'react';
import { API_URL } from '@functions';

export async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get('email');
  const titre = formData.get('titre');
  const description = formData.get('description');


  if (!email || !titre || !description) {
    return redirect('?message=try again', { replace: true });
  }

  const data = {
    email: email,
    titre: titre,
    description: description
  };

  try {
    const response = await fetch(API_URL + 'contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error(errorData)
      return redirect('?message=error from the server or bad request', { replace: true });
    }

    return redirect('?message=email envoyé avec succes on vous réponde dés que possible', { replace: true });

  } catch (error) {
    console.error("Erreur lors de la requête fetch :", error); // Log l'erreur pour le débogage
    return redirect('?message=error fetch try later please', { replace: true });
  }
}

const Contact = () => {
  const [searchParams] = useSearchParams();
  const message = searchParams.get('message');
  const navigation = useNavigation();
  const formRef = useRef();

  useEffect(() => {
    if (formRef.current && message) {
      formRef.current.reset();
      console.log(message);
    }

  }, [message])



  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-green-900 mb-8">
          Nous Contacter :
        </h1>

        {message && (
          <div className="mb-6 p-4 bg-green-100 border-l-4 border-green-500 text-green-700 text-center">
            <p>{message}</p>
          </div>
        )}

        <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
          <Form method="post" ref={formRef}>
            {/* Champ Email */}
            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Entrez votre email"
                required
              />
            </div>

            {/* Champ Titre */}
            <div className="mb-6">
              <label htmlFor="titre" className="block text-gray-700 mb-2">
                Titre
              </label>
              <input
                type="text"
                id="titre"
                name="titre"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Entrez le titre de votre message"
                required
              />
            </div>

            {/* Champ Description */}
            <div className="mb-6">
              <label htmlFor="description" className="block text-gray-700 mb-2">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                rows="5"
                placeholder="Décrivez votre demande ou votre message"
                required
              />
            </div>



            {/* Bouton de soumission */}
            <button
              type="submit"
              className="w-full bg-green-900 text-white py-2 px-4 rounded-lg hover:bg-green-800 transition-colors duration-300"
            // Désactiver le bouton pendant la soumission
            >
              {navigation.state === 'submitting' ? 'Envoi en cours...' : 'Envoyer'}
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Contact;