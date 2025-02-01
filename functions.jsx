





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

        } else {
          console.log(`Error: ${response.status} - ${response.statusText}`);
        }
      } catch (err) {
        console.log('Une erreur s\'est produite:', err);
        return 'une erreur s\'est produite';
      }
}

