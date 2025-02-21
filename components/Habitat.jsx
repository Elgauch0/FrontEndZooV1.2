
import habitatParDefault from '~public/habitatParDefault.jpg';
import { API_SOURCE } from '../functions';

const Habitat = ({ nom, description, imageName }) => {
  const imageUrl = imageName 
    ? `${API_SOURCE}/uploads/images/habitats/${imageName}`
    : habitatParDefault;

  return (
    <div className="mb-6 flex gap-6 items-start">
      <img 
        src={imageUrl}
        alt={`Habitat ${nom}`}
        className="w-48 h-48 rounded-lg object-cover shadow-md"
      />
      <div>
        <h2 className="text-3xl font-bold text-green-900 mb-2">
          {nom}
        </h2>
        <p className="text-lg text-gray-700">
          {description}
        </p>
      </div>
    </div>
  );
};

export default Habitat;