import  { useState } from "react";
import { useLoaderData } from "react-router";
import { getComptesR } from "../../functions";


export async function loader(){
  return await getComptesR();
}

const ComptesRendus = () => {
  const rapports = useLoaderData();
  const [filtrePeriode, setFiltrePeriode] = useState("tous");
  const [filtreAnimal, setFiltreAnimal] = useState("tous");
  
const UNE_SEMAINE_EN_MS = 7 * 24 * 60 * 60 * 1000;
const UN_MOIS_EN_MS = 30 * 24 * 60 * 60 * 1000;
const TROIS_MOIS_EN_MS = 3 * UN_MOIS_EN_MS;

  
  const filtrerParPeriode = (rapports, periode) => {
    const maintenant = new Date();
    let dateDebut;

    switch (periode) {
      case "cette_semaine":
        dateDebut = new Date(maintenant.getTime() - UNE_SEMAINE_EN_MS);
        break;
      case "ce_mois":
        dateDebut = new Date(maintenant.getTime() - UN_MOIS_EN_MS);
        break;
      case "trois_mois":
        dateDebut = new Date(maintenant.getTime() - TROIS_MOIS_EN_MS);
        break;
      default:
        return rapports;
    }

    return rapports.filter((rapport) => {
      const dateRapport = new Date(rapport.passage_Date);
      return dateRapport >= dateDebut && dateRapport <= maintenant;
    });
  };

  
  const filtrerParAnimal = (rapports, animal) => {
    if (animal === "tous") return rapports;
    return rapports.filter((rapport) => rapport.animal.nom === animal);
  };

 
  const rapportsFiltres = filtrerParAnimal(
    filtrerParPeriode(rapports, filtrePeriode),
    filtreAnimal
  );

  
  const animauxUniques = [...new Set(rapports.map((rapport) => rapport.animal.nom))];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Rapports des Animaux</h1>

      
      <div className="flex gap-4 mb-4">
        <select
          value={filtrePeriode}
          onChange={(e) => setFiltrePeriode(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="tous">Toutes les périodes</option>
          <option value="cette_semaine">Cette semaine</option>
          <option value="ce_mois">Ce mois</option>
          <option value="trois_mois">Ces trois mois</option>
        </select>

        <select
          value={filtreAnimal}
          onChange={(e) => setFiltreAnimal(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="tous">Tous les animaux</option>
          {animauxUniques.map((animal) => (
            <option key={animal} value={animal}>
              {animal}
            </option>
          ))}
        </select>
      </div>

      
      <table className="min-w-full bg-white border">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border">ID</th>
            <th className="py-2 px-4 border">État</th>
            <th className="py-2 px-4 border">Nourriture</th>
            <th className="py-2 px-4 border">Date de passage</th>
            <th className="py-2 px-4 border">Animal</th>
          </tr>
        </thead>
        <tbody>
          {rapportsFiltres.map((rapport) => (
            <tr key={rapport.id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border">{rapport.id}</td>
              <td className="py-2 px-4 border">{rapport.etat}</td>
              <td className="py-2 px-4 border">{rapport.nourriture}</td>
              <td className="py-2 px-4 border">
                {new Date(rapport.passage_Date).toLocaleDateString()}
              </td>
              <td className="py-2 px-4 border">{rapport.animal.nom}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComptesRendus;