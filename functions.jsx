const  token =sessionStorage.getItem('token'); 
const API_URL = 'https://localhost:8000/api/'; 



export function requireAuth() {
  const token = sessionStorage.getItem('token');
  return !!token;  
}
export async function login({username,password}){
    try {
        const response = await fetch('https://localhost:8000/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });
    
        if (response.ok) {
          const {token} = await response.json();
          return token;

        }else {
          const errorData = await response.json(); 
          console.error(`Login failed: ${response.status} - ${response.statusText} - ${JSON.stringify(errorData)}`);
          return null; 
         }
        
    } catch (err) {
        console.log('Une erreur s\'est produite:', err);
        return null;
      }
}


export async function getServices(){
  try{
  const response = await fetch( API_URL+'services',{
    method:'GET',
    headers:{'Content-Type':'application/json',
              'Authorization': `Bearer ${token}`
    }
   });
  
  if(!response.ok){
    throw new Error('une erreur dans le fetch ou serveur non accecible');
  }
  const data = await  response.json();
  
  return data;
 }catch(error){
  console.error('try catch problem',error);
  return 'serveur error';
}            
}

export async function deleteService(id) {
  try {
    const response = await fetch(API_URL+`administration/services/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`

         },
    });

    if (!response.ok) {
        throw new Error('Erreur lors de la suppression du service');
    }

    return true;
} catch (error) {
    console.error('Erreur:', error);
}
  
}

export async function addService({ nom, description }) {
  try {
      const response = await fetch(API_URL +'administration/services/add', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json',
                      'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ nom, description })
      });

      if (!response.ok) {
          throw new Error('Erreur lors de l\'ajout du service.');
      }
      
      const data = await response.json();
      return { success: true, data };
  } catch (error) {
      console.error('Erreur réseau:', error);
      return { success: false, error: 'Une erreur s\'est produite lors de la tentative d\'ajout du service.' };
  }
}


export async function getreviews(pathname){
  const admin = pathname ==="nvalid" ? 'administration/': '';
  try{
    const response = await fetch(API_URL +`${admin}reviews/${pathname}`,{
      method: 'GET',
      headers: { 'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
      },
    });
    if(!response.ok){
     throw new Error('une erreur dans le fetch ou serveur non accecible');
    }
    const data = await response.json();
   
    return data

  }catch(err){
    console.error('try catch problem',err);
    return null

  }


}
export async function addAlimentation(animal_id, nourriture_donnée, quantité) {
  const response = await fetch(API_URL+'administration/alimentation/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ animal_id, nourriture_donnée, quantité }),
  });

  if (!response.ok) {
    if (response.status === 400) {
      const errorData = await response.json();
      console.error(errorData);
      throw new Error("Requête incorrecte. Veuillez vérifier les données saisies.");
    }
    throw new Error('Erreur de réponse');
  }

  return response.json();
}
export async function updateHabitatCommentaire(id, data) {
  const response = await fetch(API_URL+`administration/habitat/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`

    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Problème serveur : le commentaire n'a pas pu être mis à jour.");
  }

  return response.json();
}

export async function validReview(id,action) {
  const response = await fetch(API_URL + `administration/reviews/${id}?action=${action}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`

    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error('Réponse fetch erreur');
  }
  
}

export async function sendReview({username,avis}) {
  try{
    const response = await fetch(API_URL + 'reviews/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, avis }),
    });
    if(!response.ok){
      console.error('response error')
      return 'error response try again later'
    }
   return 'Merci pour votre commmentaires , il va etre vu sur notre site dès que quil sera validé'

  }catch(err){
    console.error(err,'try catch error');
    return 'try catch erreur try later'

  }
  

  
}


export async function getAnimals() {

  try {
    const response = await fetch(API_URL +'animal',{
      method: 'GET',
      headers: { 'Content-Type': 'application/json',
      },

    });
    if (!response.ok) {
      throw new Error('Une erreur dans le fetch ou serveur non accessible');
    }
    const animals = await response.json();
    return animals;
  } catch (err) {
    console.error('Erreur lors de la récupération des animaux:', err);
  }
}


export async function getRapports(page=1,limit=10){
  const baseUrl = API_URL+'administration/alimentation';
  const url = (page && limit) ? `${baseUrl}?page=${page}&limit=${limit}` : baseUrl;
  try{
    const response = await fetch(url,{
      method: 'GET',
      headers: { 'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
      },


    });
    
    if(!response.ok){
     throw new Error('response erreur request invalid');
    }
    const data = await response.json();
   
    return data

  }catch(err){
    console.error('try catch problem',err);
    return null

  }


}


export async function getHabitats() {
  try{
      
      const response = await fetch(API_URL+'habitat/');
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des habitats');
      }

      const habitats = await response.json();
     

      return habitats;
    }catch (err) {
    console.error(err);
    throw new Error('Erreur lors de la récupération des habitats');
  }
}


export async function getUsers() {
  try {
      
      const response = await fetch(API_URL+'administration/admin/users',{
        method: 'GET',
        headers: { 'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
        },
      });
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      const users = await response.json();    
      return users;
  } catch (error) {
     console.error('Erreur lors de la récupération des utilisateurs:', error);
  }
}




export async function deleteUser(id) {
  const response = await fetch(API_URL+`administration/admin/users/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error('Erreur lors de la suppression de l\'utilisateur');
  }

  return null;
}

export async function createUser(userData) {
  const response = await fetch(API_URL + 'administration/admin/users/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(userData)
  });

  if (!response.ok) {
    throw new Error('Erreur lors de la création de l\'utilisateur');
  }

  return null;
}


export async function getComptesR() {
  try {
    
    const response = await fetch(API_URL+"administration/vet/rapport/",{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });

    
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    const data = await response.json();

   
    return data;
  } catch (error) {
    
    console.error("Erreur lors de la récupération des rapports:", error);
    throw error;
  }
}

export async function updateAnimal(id,updatedAnimal) {
  const response = await fetch(API_URL+`administration/animal/${id}`, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
        
    },
    body: JSON.stringify(updatedAnimal),
});

if (!response.ok) {
    throw new Error('Failed to update animal');
}
  
}
export async function addAnimal(newAnimal) 
{
  const response = await fetch(API_URL+"administration/animal/add", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
     },
    body: JSON.stringify(newAnimal),
});

if (!response.ok) {
    throw new Error("Erreur lors de l'ajout de l'animal");
}  
}

export async function deleteAnimal(id) {
  const response = await fetch(API_URL+`administration/animal/${id}`, {
    method: "DELETE",
    headers:{ 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`}
  });
  if (!response.ok) {
      console.log('response not ok')
    throw new Error("Erreur lors de la suppression de l'animal");
  }
  
}

export async function addRapport({ etat, nourriture, autreDetail, animalId }) {
  const response = await fetch(API_URL+'administration/vet/rapport/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`

    },
    body: JSON.stringify({ etat, nourriture, autreDetail, animalId }),
  });

  if (!response.ok) {
    if (response.status === 400) {
      const errorData = await response.json();
      console.error(errorData);
      return { type: 'error', text: "Requête incorrecte. Veuillez vérifier les données saisies." };
    }
    throw new Error('Erreur de réponse');
  }
  
}

export async function addAvisVet(id,data) {
  try {
    const response = await fetch(API_URL+`administration/habitat/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erreur lors de la mise à jour de l'habitat");
    }

    
    return { erreur: false, message: "Commentaire envoyé avec succès !" };
} catch (error) {
    console.error("Erreur lors de la mise à jour de l'habitat :", error.message);
    // Retourner un message d'erreur
    return { erreur: true, message: "Problème serveur : le commentaire n'a pas pu être envoyé." };
}
  
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export function setRole(rolesArray) {
  if (rolesArray.includes('ROLE_ADMIN')) {
      return 'Admin';
  }
  if (rolesArray.includes('ROLE_VETERINAIRE')) {
      return 'Vétérinaire';
  }
  return 'Employé';
}