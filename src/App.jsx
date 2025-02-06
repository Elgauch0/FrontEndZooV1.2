import { createBrowserRouter, createRoutesFromElements,Route, RouterProvider } from "react-router"
import Layout from "../components/Layout"
import Home,{loader as homeLoader} from "../pages/Home"
import Service,{loader as serviceLoader} from "../pages/Service";
import Habitats from "../pages/Habitats";
import Administration,{action as loginAction,loader as loginLoader} from "../pages/Administration";
import Contact ,{action as contactAction}from "../pages/Contact";
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
import Reviews,{loader as reviewsLoader} from "../pages/Employe/Reviews";
import {action as reviewAction} from '../components/ReviewForm'
import Confirmation from "../components/Confirmation";





function App() {


  const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<Layout />} errorElement={< ErrorElement/>}>
    <Route index element={<Home/>} loader={homeLoader} action={reviewAction} />
    <Route path="services"element={<Service/>} loader={serviceLoader}  />
    <Route path="habitats"element={<Habitats />} />
    <Route path="contact"element={<Contact/>} action={contactAction} />
    <Route path="administration"element={<Administration/>} loader={loginLoader} action={loginAction}/>
    <Route path="confirmation" element={<Confirmation />} />
    

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
     <Route path="reviews" element={< Reviews/>} loader={reviewsLoader} />

     </Route>

    
    
    <Route path="*" element={<NotFound/>} />


    </Route>

  ))
  

  return (
    
    <RouterProvider router={router}/>
    
    
  )
}

export default App
