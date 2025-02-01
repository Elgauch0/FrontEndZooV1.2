import Service from '../components/ServiceConponent';

const Services = () => {
  
  const services = [
    {
      id: 1,
      nom: "Restauration",
      description: "Profitez de nos délicieux plats préparés avec des ingrédients frais et locaux. Notre restaurant propose une variété de menus pour tous les goûts.",
    },
    {
      id: 2,
      nom: "Visite des habitats avec guide gratuit",
      description: "Découvrez les habitats de nos animaux avec l'accompagnement d'un guide expert. Apprenez-en plus sur leur mode de vie et leur environnement.",
    },
    {
      id: 3,
      nom: "Visite du zoo en petit train",
      description: "Parcourez le zoo confortablement installé dans notre petit train. Une visite ludique et adaptée à tous les âges.",
    },
    {
      id: 4,
      nom: "Ateliers éducatifs",
      description: "Participez à nos ateliers éducatifs pour en savoir plus sur la conservation des espèces et les efforts de protection de la biodiversité.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Nos Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service) => (
          <Service key={service.id} nom={service.nom} description={service.description} />
        ))}
      </div>
    </div>
  );
};

export default Services;