
import RapportVeterinaire from '../../components/RapportVeterinaire';

const Veterinaire = () => {
  
  const rapports = [
    {
      id: 1,
      etat: "en Bonne Santé",
      nourriture: "Nourriture1",
      passage_date: "2024-12-29 17:35:05",
      autre_detail: null,
      animal_id: 2,
    },
    {
      id: 2,
      etat: "en Bonne Santé",
      nourriture: "Nourriture2",
      passage_date: "2024-12-29 17:35:05",
      autre_detail: null,
      animal_id: 3,
    },
    {
      id: 3,
      etat: "en Bonne Santé",
      nourriture: "Nourriture3",
      passage_date: "2024-12-29 17:35:05",
      autre_detail: null,
      animal_id: 4,
    },
    {
      id: 5,
      etat: "en Bonne Santé",
      nourriture: "Nourriture5",
      passage_date: "2024-12-29 17:35:05",
      autre_detail: null,
      animal_id: 6,
    },
    {
      id: 6,
      etat: "en Bonne Santé",
      nourriture: "Nourriture6",
      passage_date: "2024-12-29 17:35:05",
      autre_detail: null,
      animal_id: 7,
    },
    {
      id: 7,
      etat: "en Bonne Santé",
      nourriture: "Nourriture3",
      passage_date: "2025-01-01 19:31:20",
      autre_detail: "bolbassor kiyakol lkhodra",
      animal_id: 17,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Rapports Vétérinaires</h1>
      <div className="space-y-4">
        {rapports.map((rapport) => (
          <RapportVeterinaire key={rapport.id} rapport={rapport} />
        ))}
      </div>
    </div>
  );
};

export default Veterinaire;