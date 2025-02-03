import { Outlet, NavLink } from "react-router";

function EmployeLayout() {
  // Fonction pour gérer le style actif
  const getNavLinkStyle = ({ isActive }) => 
    isActive 
      ? "text-white bg-green-700 px-3 py-2 rounded-md text-sm font-medium" 
      : "text-gray-300 hover:bg-green-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium";

  return (
    <>
      <nav className="p-4 bg-green-800">
        <NavLink 
          to="."
          end
          
          className={getNavLinkStyle}
        >
          EmployéDashboard
        </NavLink>
        <NavLink 
          to="add"
          className={getNavLinkStyle}
        >
          add
        </NavLink>
        <NavLink 
          to="put"
          className={getNavLinkStyle}
        >
          edit un service
        </NavLink>
        <NavLink 
          to="delete"
          className={getNavLinkStyle}
        >
          supprimer un service
        </NavLink>
      </nav>
      <Outlet />
    </>
  );
}

export default EmployeLayout;