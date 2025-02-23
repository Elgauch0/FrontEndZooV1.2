

const RapportVeterinaire = ({ rapport }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-4">
      <h2 className="text-xl font-bold mb-2">Rapport Vétérinaire #{rapport.id}</h2>
      <div className="space-y-2">
        <p><span className="font-semibold">État:</span> {rapport.etat}</p>
        <p><span className="font-semibold">Nourriture:</span> {rapport.nourriture}</p>
        <p><span className="font-semibold">Date de passage:</span> {rapport.passage_date}</p>
        <p><span className="font-semibold">Autre détail:</span> {rapport.autre_detail || 'Aucun détail supplémentaire'}</p>
        <p><span className="font-semibold">Animal ID:</span> {rapport.animal_id}</p>
      </div>
    </div>
  );
};

export default RapportVeterinaire;