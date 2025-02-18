import { NavLink, useNavigate } from 'react-router';
import { requireAuth } from '../functions';
import { useState } from 'react';

const Header = () => {
  const navigate = useNavigate();
  const isAuthenticated = requireAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Configuration des liens
  const publicLinks = [
    { to: '/services', label: 'Services' },
    { to: '/habitats', label: 'Habitats' },
    { to: '/contact', label: 'Contact' },
    { to: '/administration', label: 'Administration' },
  ];

  const authLinks = [
    { to: '/services', label: 'Services' },
    { to: '/habitats', label: 'Habitats' },
    { 
      label: 'Déconnexion', 
      action: () => {
        sessionStorage.clear();
        navigate('/');
        setIsMenuOpen(false);
      }
    }
  ];

  // Style des liens actifs
  const activeStyle = "border-b-2 border-white pb-0.5";
  
  // Fonction pour fermer le menu après navigation
  const handleNavigation = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-green-900 shadow-md relative z-50">
      <nav className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <NavLink 
            to="/" 
            className="text-white text-xl font-bold hover:text-green-100 transition-colors"
            onClick={handleNavigation}
          >
            ArcadiaZoo
          </NavLink>
          
          {/* Bouton menu hamburger (mobile) */}
          <button 
            className="lg:hidden text-white focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

          {/* Liens de navigation (desktop) */}
          <div className="hidden lg:flex items-center space-x-6">
            {(isAuthenticated ? authLinks : publicLinks).map((item, index) => (
              item.to ? (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) => 
                    `text-white text-sm hover:text-green-100 transition-colors ${isActive ? activeStyle : ''}`
                  }
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

        {/* Menu mobile (s'affiche en plein écran quand isMenuOpen est true) */}
        {isMenuOpen && (
          <div className="lg:hidden fixed inset-0 bg-green-900 bg-opacity-95 z-50 flex flex-col items-center justify-center">
            <button 
              className="absolute top-4 right-4 text-white"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Fermer le menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="flex flex-col items-center space-y-8">
              {/* Logo dans le menu mobile */}
              <NavLink 
                to="/" 
                className="text-white text-2xl font-bold mb-8"
                onClick={handleNavigation}
              >
                ArcadiaZoo
              </NavLink>
              
              {/* Liens dans le menu mobile */}
              {(isAuthenticated ? authLinks : publicLinks).map((item, index) => (
                item.to ? (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) => 
                      `text-white text-xl hover:text-green-100 transition-colors ${isActive ? 'font-semibold' : ''}`
                    }
                    onClick={handleNavigation}
                  >
                    {item.label}
                  </NavLink>
                ) : (
                  <button
                    key={`logout-mobile-${index}`}
                    onClick={item.action}
                    className="text-white text-xl hover:text-green-100 transition-colors"
                  >
                    {item.label}
                  </button>
                )
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;