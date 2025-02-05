import { Form ,redirect,useSearchParams} from "react-router";
import { sendReview } from "../functions";
import {useEffect,useRef} from 'react';



export async function action({request}){
    const formData = await request.formData();
    const username =formData.get('username');
    const avis = formData.get("avis");
    
    try {
         await sendReview({ username, avis }); 
         return redirect('/?message=Merci pour votre commentaire ! Vous pouvez le voir dès que c\'est validé.'); 

    } catch (error) {
        console.error("Erreur dans l'action:", error);
        return redirect('/?error=Une erreur s\'est produite lors de l\'envoi de votre commentaire.');
    } 
}

function ReviewForm() {
const formRef = useRef(null);
const [searchParams] = useSearchParams();

useEffect(() => {
  if (formRef.current && (searchParams.get('message') || searchParams.get('error'))) {
    formRef.current.reset(); 
  }
}, [searchParams]);


  return (
    <div className="container mx-auto max-w-md">
      <h1 className="text-2xl font-bold mb-4">Laissez-nous un commentaire</h1> 
      <div className="bg-green-900 text-white rounded-lg shadow-md my-4 p-4 transition duration-300 hover:scale-105">
        <Form method="post" ref={formRef}>
          <label htmlFor="username" className="block text-lg font-bold mb-2">
            Votre nom d'utilisateur
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="w-full  px-3 py-2 border bg-emerald-50 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            placeholder="Entrez votre nom d'utilisateur"
            required
          />

          <label htmlFor="review" className="block text-lg font-bold mb-2">
            Votre commentaire
          </label>
          <textarea
            id="review"
            name="avis"
            className="w-full h-24 bg-emerald-50 px-3 py-2 border rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
         
            placeholder="Écrivez votre commentaire ici..."
            required
          ></textarea>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            //disabled={}
          >
          envoyer
          </button>
          
        </Form>
      </div>
    </div>
  );
}

export default ReviewForm;