import { createBrowserRouter, createRoutesFromElements,Route, RouterProvider } from "react-router"
import Layout from "../components/Layout"
import Home from "../pages/Home"
import Service from "../pages/Service";
import Habitats from "../pages/Habitats";
import Administration,{action as loginAction} from "../pages/Administration";
import Contact from "../pages/Contact";
import NotFound from "../pages/NotFound";
import AdminLayout from "../components/AdminLayout";
import DashbordAdmin from '../pages/admin/DashbordAdmin';
import VetLayout from "../components/VetLayout";
import DashbordVet from '../pages/Vet/DashbordVet';
import EmployeLayout from "../components/EmployeLayout";
import EmployeDashbord from "../pages/Employe/EmployeDashbord";





function App() {


  const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<Layout />}>
    <Route index element={<Home/>}/>
    <Route path="services"element={<Service/>} />
    <Route path="habitats"element={<Habitats />} />
    <Route path="contact"element={<Contact/>} />
    <Route path="administration"element={<Administration/>}  action={loginAction}/>

     <Route  path="dashboardAdmin" element={<AdminLayout/>}>
     <Route index element={<DashbordAdmin/>} />
     </Route>
      
     <Route path="dashboardVet" element={< VetLayout/>}>
     <Route index element={<DashbordVet />}/>
     </Route>

     <Route path="dashboardEmployee" element={<EmployeLayout/>}>
     <Route index element={<EmployeDashbord />} />

     </Route>

    
    
    <Route path="*" element={<NotFound/>} />


    </Route>

  ))
  

  return (
    
    <RouterProvider router={router}/>
    
    
  )
}

export default App
