import { Outlet, NavLink } from 'react-router';

function AnimalLayout() {
  const getNavLinkStyle = ({ isActive }) =>
    isActive
      ? "text-white bg-green-700 px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200 shadow-md"
      : "text-gray-300 hover:bg-green-800 hover:text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200";

  return (
    <div className="min-h-screen bg-gray-100 ">
     
      <nav className="bg-green-900 p-4  shadow-md mb-6">
        <div className="flex space-x-4">
          <NavLink
            to="."
            end
            className={getNavLinkStyle}
          >
            Liste des animaux
          </NavLink>
          <NavLink
            to="add"
            end
            className={getNavLinkStyle}
          >
            Ajouter un animal
          </NavLink>
        </div>
      </nav>

      {/* Contenu des routes imbriquées */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <Outlet />
      </div>
    </div>
  );
}

export default AnimalLayout;