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

//services------------------------------------------------------->
export async function getServices(){
  try{
  const response = await fetch('https://localhost:8000/api/services');
  
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

export async function addService({ nom, description }) {
  try {
      const response = await fetch('https://localhost:8000/api/services/add', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
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
  try{
    const response = await fetch(`https://localhost:8000/api/reviews/${pathname}`);
    
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



export async function sendReview({username,avis}) {
  try{
    const response = await fetch('https://localhost:8000/api/reviews/add', {
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
  let animals = sessionStorage.getItem('animals');
  if (animals) {
    return JSON.parse(animals);
  }
  try {
    const response = await fetch('https://localhost:8000/api/animal/');
    if (!response.ok) {
      throw new Error('une erreur dans le fetch ou serveur non accessible');
    }
    animals = await response.json();
    sessionStorage.setItem('animals', JSON.stringify(animals));
    return animals;
  } catch (err) {
    console.error(err);
    throw new Error('error dans le try catch, réessayez plus tard');
  }
}


export async function getRapports(page=1,limit=10){
  const baseUrl = 'https://localhost:8000/api/alimentation';
  const url = (page && limit) ? `${baseUrl}?page=${page}&limit=${limit}` : baseUrl;
  try{
    const response = await fetch(url);
    
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
      
      const response = await fetch('https://localhost:8000/api/habitat/');
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

