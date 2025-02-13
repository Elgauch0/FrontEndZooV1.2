import { Outlet,NavLink, redirect } from "react-router";




export function loader(){
  //desactiver le firewall le temps de faire les pages vet et admin
  // const token = sessionStorage.getItem('token'); 
  
  // if(!token){
  //   return redirect('/administration?message=Vous devez être connecté pour aller à cette page');
  // }
  return null;
}



function AdminLayout() {
 
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
          Dashboard
        </NavLink>

     
        <NavLink
          to="users"
          className={getNavLinkStyle}
        >
          Employés
        </NavLink>
        <NavLink
          to="animals"
          className={getNavLinkStyle}
        >
          animals
        </NavLink>
        <NavLink
          to="rapports"
          className={getNavLinkStyle}
        >
          Comptes-rendus
        </NavLink>
      </nav>

      
      <Outlet />
    </>
  );
}

export default AdminLayout;