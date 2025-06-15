


const API_URL = 'http://52.47.198.51/api/';
const API_SOURCE = 'http://52.47.198.51/';
export { API_SOURCE };


export function requireAuth() {
  const token = sessionStorage.getItem('token');
  if (!token) {
    return false;
  }
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (payload.exp < Date.now() / 1000) {
      sessionStorage.removeItem('token');
      return false;
    }
    return true;
  } catch {
    sessionStorage.removeItem('token');
    return false;
  }
}

// --- Fonctions de Requête Authentifiée ---

export async function getStatistic() {
  try {
    // Récupère le token juste avant la requête
    const token = sessionStorage.getItem('token'); 
    if (!token) { throw new Error('Authentification requise: aucun token trouvé.'); }

    const response = await fetch(API_URL + 'administration/visits', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    if (!response.ok) {
      throw new Error(`Échec de la réponse du serveur: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques:', error);
    return null;
  }
}

export async function login({ username, password }) {
  try {
    const response = await fetch(API_URL + 'login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const { token } = await response.json();
      sessionStorage.setItem('token', token); // Stocke le token après succès
      return token;
    } else {
      const errorData = await response.json();
      console.error(`Échec de la connexion: ${response.status} - ${response.statusText} - ${JSON.stringify(errorData)}`);
      return null;
    }

  } catch (err) {
    console.log('Une erreur s\'est produite lors de la connexion:', err);
    return null;
  }
}

export async function getServices() {
  try {
    // Récupère le token juste avant la requête
    const token = sessionStorage.getItem('token');
    if (!token) { throw new Error('Authentification requise: aucun token trouvé.'); }

    const response = await fetch(API_URL + 'services', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Une erreur dans le fetch ou serveur non accessible');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Problème de récupération des services:', error);
    return 'serveur error';
  }
}

export async function deleteService(id) {
  try {
    // Récupère le token juste avant la requête
    const token = sessionStorage.getItem('token');
    if (!token) { throw new Error('Authentification requise: aucun token trouvé.'); }

    const response = await fetch(API_URL + `administration/services/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la suppression du service');
    }
    return true;
  } catch (error) {
    console.error('Erreur lors de la suppression du service:', error);
    return false;
  }
}

export async function addService({ nom, description }) {
  try {
    // Récupère le token juste avant la requête
    const token = sessionStorage.getItem('token');
    if (!token) { throw new Error('Authentification requise: aucun token trouvé.'); }

    const response = await fetch(API_URL + 'administration/services/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ nom, description })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erreur lors de l\'ajout du service.');
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error('Erreur réseau lors de l\'ajout du service:', error);
    return { success: false, error: 'Une erreur s\'est produite lors de la tentative d\'ajout du service.' };
  }
}

export async function putService(id, { nom, description }) {
  try {
    // Récupère le token juste avant la requête
    const token = sessionStorage.getItem('token');
    if (!token) { throw new Error('Authentification requise: aucun token trouvé.'); }

    const response = await fetch(API_URL + `administration/services/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ nom, description }),
    });

    if (!response.ok) {
      return false;
    }
    return true;
  } catch (err) {
    console.error('Erreur lors de la mise à jour du service:', err);
    return false;
  }
}

export async function getreviews(pathname) {
  const admin = pathname === "nvalid" ? 'administration/' : ''; 
  const isAuthRequired = pathname === "nvalid" || pathname.startsWith('administration/'); 

  try {
    const headers = {
      'Content-Type': 'application/json',
    };

    if (isAuthRequired) {
      const token = sessionStorage.getItem('token');
      if (!token) {
        throw new Error('Authentification requise: aucun token trouvé.');
      }
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(API_URL + `${admin}reviews/${pathname}`, {
      method: 'GET',
      headers: headers,
    });

    if (!response.ok) {
      throw new Error('Une erreur dans le fetch ou serveur non accessible');
    }

    const data = await response.json();
    return data;

  } catch (err) {
    console.error('Problème de récupération des avis:', err);
    return null;
  }
}

export async function addAlimentation(animal_id, nourriture_donnée, quantité) {
  // Récupère le token juste avant la requête
  const token = sessionStorage.getItem('token');
  if (!token) { throw new Error('Authentification requise: aucun token trouvé.'); }

  const response = await fetch(API_URL + 'administration/alimentation/add', {
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
    throw new Error('Erreur de réponse lors de l\'ajout d\'alimentation');
  }
  return response.json();
}

export async function validReview(id, action) {
  // Récupère le token juste avant la requête
  const token = sessionStorage.getItem('token');
  if (!token) { throw new Error('Authentification requise: aucun token trouvé.'); }

  const response = await fetch(API_URL + `administration/reviews/${id}?action=${action}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Réponse fetch erreur lors de la validation de l'avis: ${JSON.stringify(errorData)}`);
  }
}


export async function sendReview({ username, avis }) {
  try {
    const response = await fetch(API_URL + 'reviews/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, avis }),
    });
    if (!response.ok) {
      console.error('Erreur de réponse lors de l\'envoi d\'avis');
      return 'erreur de réponse, veuillez réessayer plus tard';
    }
    return 'Merci pour votre commentaire, il sera visible sur notre site dès qu\'il sera validé';
  } catch (err) {
    console.error(err, 'Erreur try catch lors de l\'envoi d\'avis');
    return 'Erreur try catch, veuillez réessayer plus tard';
  }
}


export async function getAnimals() {
  try {
    const response = await fetch(API_URL + 'animal', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) {
      throw new Error('Une erreur dans le fetch ou serveur non accessible');
    }
    const animals = await response.json();
    return animals;
  } catch (err) {
    console.error('Erreur lors de la récupération des animaux:', err);
    return null;
  }
}


export async function getHoraire() {
  try {
    const response = await fetch(API_URL + 'horaire', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) {
      throw new Error('Une erreur dans le fetch ou serveur non accessible');
    }
    const horaire = await response.json();
    return horaire;
  } catch (err) {
    console.error('Erreur lors de la récupération des horaires:', err);
    return null;
  }
}

export async function putHoraire(id, horaireData) {
  try {
    
    const token = sessionStorage.getItem('token');
    if (!token) { throw new Error('Authentification requise: aucun token trouvé.'); }

    const response = await fetch(API_URL + `administration/horaire/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(horaireData),
    });

    if (!response.ok) {
      const error = await response.json();
      return { error: true, text: 'erreur response' };
    }
    return { error: false, text: 'Horaire mis à jour avec succès' };

  } catch (err) {
    console.error('Erreur lors de la mise à jour de l\'horaire:', err);
    return { error: true, text: 'erreur catch' };
  }
}

export async function getRapports(page = 1, limit = 10) {
  const baseUrl = API_URL + 'administration/alimentation';
  const url = (page && limit) ? `${baseUrl}?page=${page}&limit=${limit}` : baseUrl;
  try {
    
    const token = sessionStorage.getItem('token');
    if (!token) { throw new Error('Authentification requise: aucun token trouvé.'); }

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });

    if (!response.ok) {
      throw new Error('erreur de réponse, requête invalide');
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error('Problème de récupération des rapports:', err);
    return null;
  }
}


export async function getHabitats() {
  try {
    const response = await fetch(API_URL + 'habitat/');
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des habitats');
    }
    const habitats = await response.json();
    return habitats;
  } catch (err) {
    console.error('Erreur lors de la récupération des habitats:', err);
    throw new Error('Erreur lors de la récupération des habitats');
  }
}

export async function deleteHabitat(id) {
  try {
    // Récupère le token juste avant la requête
    const token = sessionStorage.getItem('token');
    if (!token) { throw new Error('Authentification requise: aucun token trouvé.'); }

    const response = await fetch(API_URL + `administration/habitat/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) {
      throw new Error('Erreur lors de la suppression de l\'habitat');
    }
    return true;
  } catch (err) {
    console.error('Erreur lors de la suppression de l\'habitat:', err);
    return false;
  }
}

export async function updateHabitat({ nom, description, imageFile }, habitatId) {
  const formData = new FormData();
  formData.append('nom', nom);
  formData.append('description', description);
  if (imageFile) {
    formData.append('imageFile', imageFile);
  }
  try {
    // Récupère le token juste avant la requête
    const token = sessionStorage.getItem('token');
    if (!token) { throw new Error('Authentification requise: aucun token trouvé.'); }

    const response = await fetch(API_URL + `administration/habitat/${habitatId}`, {
      method: 'POST', 
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { error: true, text: errorData?.message || 'Échec de la mise à jour de l\'habitat' };
    }
    return { error: false, text: 'Habitat édité avec succès' };
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'habitat:', error);
    return { error: true, text: error.message };
  }
}

export async function createHabitat({ nom, description, imageFile }) {
  const formData = new FormData();
  formData.append('nom', nom);
  formData.append('description', description);
  formData.append('imageFile', imageFile);
  try {
    // Récupère le token juste avant la requête
    const token = sessionStorage.getItem('token');
    if (!token) { throw new Error('Authentification requise: aucun token trouvé.'); }

    const response = await fetch(API_URL + 'administration/habitat/add', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Échec de la création de l\'habitat');
    }
    return true;
  } catch (error) {
    console.error('Erreur lors de la création de l\'habitat:', error);
    return false;
  }
}

export async function getUsers() {
  try {
    // Récupère le token juste avant la requête
    const token = sessionStorage.getItem('token');
    if (!token) { throw new Error('Authentification requise: aucun token trouvé.'); }

    const response = await fetch(API_URL + 'administration/admin/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    if (!response.ok) {
      throw new Error(`Erreur HTTP! statut: ${response.status}`);
    }
    const users = await response.json();
    return users;
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs:', error);
    return null;
  }
}

export async function deleteUser(id) {
  // Récupère le token juste avant la requête
  const token = sessionStorage.getItem('token');
  if (!token) { throw new Error('Authentification requise: aucun token trouvé.'); }
  
  const response = await fetch(API_URL + `administration/admin/users/${id}`, {
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
  // Récupère le token juste avant la requête
  const token = sessionStorage.getItem('token');
  if (!token) { throw new Error('Authentification requise: aucun token trouvé.'); }

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
    // Récupère le token juste avant la requête
    const token = sessionStorage.getItem('token');
    if (!token) { throw new Error('Authentification requise: aucun token trouvé.'); }

    const response = await fetch(API_URL + "administration/vet/rapport/", {
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

export async function updateAnimal(id, { nom, description, habitatId, imageFile }) {
  const formData = new FormData();
  formData.append('nom', nom);
  formData.append('description', description);
  formData.append('habitatId', habitatId);
  if (imageFile) {
    formData.append('imageFile', imageFile);
  }
  // Récupère le token juste avant la requête
  const token = sessionStorage.getItem('token');
  if (!token) { throw new Error('Authentification requise: aucun token trouvé.'); }

  const response = await fetch(API_URL + `administration/animal/${id}`, {
    method: 'POST', 
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Échec de la mise à jour de l\'animal');
  }
}

export async function addAnimal(formData) {
  // Récupère le token juste avant la requête
  const token = sessionStorage.getItem('token');
  if (!token) { throw new Error('Authentification requise: aucun token trouvé.'); }

  const response = await fetch(API_URL + "administration/animal/add", {
    method: "POST",
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Erreur lors de l'ajout de l'animal");
  }
}


export async function getAnimal(id) {
  try {
    const response = await fetch(API_URL + `animal/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) {
      throw new Error('Une erreur dans le fetch ou serveur non accessible');
    }
    const animals = await response.json();
    return animals;
  } catch (err) {
    console.error('Erreur lors de la récupération des animaux:', err);
    return null;
  }
}

export async function deleteAnimal(id) {
  // Récupère le token juste avant la requête
  const token = sessionStorage.getItem('token');
  if (!token) { throw new Error('Authentification requise: aucun token trouvé.'); }
  
  const response = await fetch(API_URL + `administration/animal/${id}`, {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  if (!response.ok) {
    console.log('response not ok');
    throw new Error("Erreur lors de la suppression de l'animal");
  }
}

export async function addRapport({ etat, nourriture, autreDetail, animalId }) {
  // Récupère le token juste avant la requête
  const token = sessionStorage.getItem('token');
  if (!token) { throw new Error('Authentification requise: aucun token trouvé.'); }

  const response = await fetch(API_URL + 'administration/vet/rapport/add', {
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
    throw new Error('Erreur de réponse lors de l\'ajout du rapport');
  }
}

export async function addTache(id, data) {
  try {
    // Récupère le token juste avant la requête
    const token = sessionStorage.getItem('token');
    if (!token) { throw new Error('Authentification requise: aucun token trouvé.'); }

    const response = await fetch(API_URL + `administration/habitat/avis/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data),
    });
    console.log(response);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erreur lors de la mise à jour de l'habitat");
    }

    return { erreur: false, message: "Mise à jour de l'habitat avec succès !" };
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'habitat:", error.message);
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