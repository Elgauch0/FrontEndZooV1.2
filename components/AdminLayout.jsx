import { Outlet, redirect } from "react-router";




export function loader(){
  //desactiver le firewall le temps de faire les pages vet et admin
  // const token = sessionStorage.getItem('token'); 
  
  // if(!token){
  //   return redirect('/administration?message=Vous devez être connecté pour aller à cette page');
  // }
  return null;
}

function AdminLayout() {
  return (
    <>
    <div>AdminLayout</div>
    <Outlet />
    </>
  )
}

export default AdminLayout