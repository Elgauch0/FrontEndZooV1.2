import { createBrowserRouter, createRoutesFromElements,Route, RouterProvider } from "react-router"
import Layout from "../components/Layout"
import Home from "../pages/Home"
import Service,{loader as serviceLoader} from "../pages/Service";
import Habitats from "../pages/Habitats";
import Administration,{action as loginAction,loader as loginLoader} from "../pages/Administration";
import Contact from "../pages/Contact";
import NotFound from "../pages/NotFound";
import AdminLayout,{loader as requreAuth} from "../components/AdminLayout";
import DashbordAdmin from '../pages/admin/DashbordAdmin';
import VetLayout from "../components/VetLayout";
import DashbordVet from '../pages/Vet/DashbordVet';
import EmployeLayout from "../components/EmployeLayout";
import EmployeDashbord ,{loader as employeServiceLoader}from "../pages/Employe/EmployeDashbord";
import ErrorElement from "../components/ErrorElement";
import AddServices,{action as addActionService} from "../pages/Employe/AddServices";
import PutService,{action as putServiceAction} from "../pages/Employe/PutService";






function App() {


  const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<Layout />} errorElement={< ErrorElement/>}>
    <Route index element={<Home/>}  />
    <Route path="services"element={<Service/>} loader={serviceLoader}  />
    <Route path="habitats"element={<Habitats />} />
    <Route path="contact"element={<Contact/>} />
    <Route path="administration"element={<Administration/>} loader={loginLoader} action={loginAction}/>

    {/**private section of the router */}

     <Route  path="dashboardAdmin" element={<AdminLayout/>} loader={requreAuth}>
     <Route index element={<DashbordAdmin/>} />
     </Route>
      
     <Route path="dashboardVet" element={< VetLayout/>}  loader={requreAuth}>
     <Route index element={<DashbordVet />}/>
     
     </Route>

     <Route path="dashboardEmployee" element={<EmployeLayout/>}  loader={requreAuth}>
     <Route index element={<EmployeDashbord />}  loader={employeServiceLoader}/>
     <Route path="add" element={<AddServices/>} action={addActionService} />
     <Route path=" :id"  element={<PutService />}  action={putServiceAction}/>

     </Route>

    
    
    <Route path="*" element={<NotFound/>} />


    </Route>

  ))
  

  return (
    
    <RouterProvider router={router}/>
    
    
  )
}

export default App
