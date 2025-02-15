import { NavLink, useNavigate } from 'react-router';
import { requireAuth } from '../functions';

const Header = () => {
  const navigate = useNavigate();
  const isAuthenticated = requireAuth();

  // Configuration des liens
  const publicLinks = [
    { to: '/services', label: 'Services' },
    { to: '/habitats', label: 'Habitats' },
    { to: '/contact', label: 'Contact' },
    { to: '/administration', label: 'Administration' }
  ];

  const authLinks = [
    { to: '/services', label: 'Services' },
    { to: '/habitats', label: 'Habitats' },
    { 
      label: 'Déconnexion', 
      action: () => {
        sessionStorage.clear();
        navigate('/');
      }
    }
  ];

  // Style des liens actifs
  const activeStyle = {
    borderBottom: '2px solid #ffffff',
    paddingBottom: '2px'
  };

  return (
    <header className="bg-green-900 shadow-md">
      <nav className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <NavLink 
            to="/" 
            className="text-white text-xl font-bold hover:text-green-100 transition-colors"
          >
            ArcadiaZoo
          </NavLink>

          {/* Liens de navigation */}
          <div className="flex items-center space-x-6">
            {(isAuthenticated ? authLinks : publicLinks).map((item, index) => (
              item.to ? (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className="text-white text-sm hover:text-green-100 transition-colors"
                  style={({ isActive }) => isActive ? activeStyle : undefined}
                >
                  {item.label}
                </NavLink>
              ) : (
                <button
                  key={`logout-${index}`}
                  onClick={item.action}
                  className="text-white text-sm hover:text-green-100 transition-colors"
                >
                  {item.label}
                </button>
              )
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;