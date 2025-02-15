import { Outlet , NavLink} from "react-router"


function HabitatAdminLayout() {
    const getNavLinkStyle = ({ isActive }) => 
        isActive
          ? "text-white bg-green-700 px-3 py-2 rounded-md text-sm font-medium" 
          : "text-gray-300 hover:bg-green-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium"; 
  return (
    <> 
    <nav className="space-x-4 bg-green-900 p-4">
        
        <NavLink
          to="."
          end
          className={getNavLinkStyle}
        >
          Habitats
        </NavLink>

     
        <NavLink
          to="add"
          className={getNavLinkStyle}
        >
        Ajouter un Habitat
        </NavLink>
      </nav>
      <Outlet/>
    </>
  )
}

export default HabitatAdminLayout