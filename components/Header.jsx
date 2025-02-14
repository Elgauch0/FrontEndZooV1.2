import { NavLink, useNavigate } from 'react-router';
import { requireAuth } from '../functions';





const Header = () => {
  const navigate = useNavigate();

  
  const activeStyle = {
    fontWeight: 'bold',
    textDecoration: 'underline',
    color: 'grey',
  };

 
  const handleLogout = () => {
    sessionStorage.clear(); 
    navigate('/'); 
  };

  return (
    <header className="bg-green-900 p-4">
      <nav className="container mx-auto flex justify-between items-center">
        {/* Logo avec lien vers la page d'accueil */}
        <NavLink to="/">
          <div className="text-white text-xl font-bold">Arcadia Zoo</div>
        </NavLink>

        {/* Liens de navigation */}
        <ul className="flex space-x-4">
          <li>
            <NavLink
              to="/services"
              className="text-white hover:text-blue-300"
              style={({ isActive }) => (isActive ? activeStyle : null)}
            >
              Services
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/habitats"
              className="text-white hover:text-blue-300"
              style={({ isActive }) => (isActive ? activeStyle : null)}
            >
              Habitats
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className="text-white hover:text-blue-300"
              style={({ isActive }) => (isActive ? activeStyle : null)}
            >
              Contact
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/administration"
              className="text-white hover:text-blue-300"
              style={({ isActive }) => (isActive ? activeStyle : null)}
            >
              Administration
            </NavLink>
          </li>

          {/* Bouton de déconnexion (affiché uniquement si l'utilisateur est authentifié) */}
          {requireAuth() && (
            <li>
              <button
                onClick={handleLogout}
                className="text-white hover:text-blue-300"
              >
                Déconnexion
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;