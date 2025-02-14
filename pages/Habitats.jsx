import Habitat from "../components/Habitat";

function Habitats() {
  
  

    
    const habitats = [
      { id: 1, nom: 'desert', description: 'desert description' },
      { id: 2, nom: 'foret', description: 'foret description' },
      { id: 3, nom: 'jungle', description: 'jungle description' },
      { id: 4, nom: 'savane', description: 'savane description' },
    ];
  const habitatsElements = habitats.map(habitat => (
    <Habitat key ={habitat.id} nom = {habitat.nom} description={habitat.description} />
  ))



  return (
    <div>
        
   {habitatsElements}
    </div>
  )
}

export default Habitats