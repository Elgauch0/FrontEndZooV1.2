import { Outlet,NavLink } from "react-router";




function VetLayout() {
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
          Dashboard
        </NavLink>
        <NavLink 
          to="addRapport"
          className={getNavLinkStyle}
        >
          Rapports
        </NavLink>
        <NavLink 
          to="avis"
          className={getNavLinkStyle}
        >
          commentaires habitats
        </NavLink>
        </nav>
        
    
    <Outlet/>
    </>
  )
}

export default VetLayout