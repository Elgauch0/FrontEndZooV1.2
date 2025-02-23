import { createBrowserRouter, createRoutesFromElements,Route, RouterProvider } from "react-router"
import Layout from "@components/Layout"
import Home,{loader as homeLoader} from "@pages/Home"
import Service,{loader as serviceLoader} from "@pages/Service";
import Habitats,{loader as habitatLoader} from "@pages/Habitats";
import Administration,{action as loginAction,loader as loginLoader} from "@pages/Administration";
import Contact ,{action as contactAction}from "@pages/Contact";
import NotFound from "@pages/NotFound";
import AdminLayout,{loader as requreAuth} from "@components/AdminLayout";
import DashbordAdmin ,{loader as dashboardAdminloader,action as dashboardAdminAction} from '@pages/admin/DashbordAdmin';
import VetLayout from "@components/VetLayout";
import DashbordVet ,{loader as dashVetloader}from '@pages/Vet/DashbordVet';
import EmployeLayout from "@components/EmployeLayout";
import EmployeDashbord ,{loader as employeServiceLoader}from "@pages/Employe/EmployeDashbord";
import ErrorElement from "@components/ErrorElement";
import AddServices,{action as addActionService} from "@pages/Employe/AddServices";
import PutService,{action as putServiceAction} from "@pages/Employe/PutService";
import Reviews,{loader as reviewsLoader} from "@pages/Employe/Reviews";
import {action as reviewAction} from '@components/ReviewForm'
import Alimentation ,{loader as alimetationLoader,action as alimentationAction} from "@components/Alimentation";
import RapportVetForm , {action as rapportVetAction,loader as rapportVetLoader}from "@components/RapportVetForm";
import HabitatAvis ,{loader as habitatAvisLoader , action as habitatAvisAction}from "@components/HabitatAvis";
import TachesHabitats ,{loader as tachesHabitatsLoader,action as tachesHabitatsAction}from "@components/TachesHabitats";
import Animals,{loader as animalLoader} from "@pages/admin/Animals";
import Animal,{action as animalAction}from '@pages/admin/Animal'
import AnimalLayout from "@components/AnimalLayout";
import AdminDashboard ,{loader as adminDashboardLoader}from "@pages/admin/AdminDashboard";
import AddAnimal,{loader as addAnimalLoader,action as addAnimalAction} from "@pages/admin/AddAnimal";
import ComptesRendus , {loader as compteRenduLoader}from "@pages/admin/ComptesRendus";
import ShowHabitatAdmin,{loader as habitatAdminLoader} from '@pages/admin/ShowHabitatAdmin'
import HabitatAdminLayout from "@components/HabitatAdminLayout";
import HabitatDetail ,{action as habitatDetailAction}from "@pages/admin/HabitatDetail";
import AddHabitatForm ,{action as addHabitatAction }from "@pages/admin/AddHabitat";
import GetAnimal ,{loader as getAnimalLoader} from "@pages/GetAnimal";
import Horaires,{loader as horaireLoader} from "@pages/Horaires";
import HoraireAdmin,{action as horaireAdminAction} from '@components/HoraireAdmin';




function App() {


  const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<Layout />} errorElement={< ErrorElement/>}>
    <Route index element={<Home/>} loader={homeLoader} action={reviewAction} />
    <Route path="services"element={<Service/>} loader={serviceLoader}  />
    <Route path="habitats"element={<Habitats />}  loader={habitatLoader}/>
    
    <Route path="contact"element={<Contact/>} action={contactAction} />
    <Route path="administration"element={<Administration/>} loader={loginLoader} action={loginAction}/>
    <Route path="horaire" element ={<Horaires />} loader={horaireLoader} />
    
    <Route path="animal/:id" element={<GetAnimal/>} loader={getAnimalLoader} />
    
    

    {/**###################################################### ADMin Dashboard ####################################################### */}

     <Route  path="dashboardAdmin" element={<AdminLayout/>} loader={requreAuth}>
     <Route index element={<AdminDashboard/>} loader={adminDashboardLoader} />
     <Route  path="users" element={<DashbordAdmin/>}  loader={dashboardAdminloader} action={dashboardAdminAction}/>

     <Route path="animals"element={<AnimalLayout/>} >
     <Route index  element={<Animals/> } loader={animalLoader} />
     <Route path=":id" element={< Animal />} action={animalAction} />
     <Route path="add" element={<AddAnimal />} loader={addAnimalLoader} action={addAnimalAction} />
     </Route>

     <Route path="rapports"  element={<ComptesRendus />} loader={compteRenduLoader}/>
     <Route path="horaire" element={< HoraireAdmin/>} loader={horaireLoader}  action ={horaireAdminAction}/>

     <Route path="habitats" element={<HabitatAdminLayout/>} >
     <Route index  element={< ShowHabitatAdmin/>} loader={habitatAdminLoader} />
     <Route path=":id" element={< HabitatDetail/>} action={habitatDetailAction}/>
     <Route path="add" element={<AddHabitatForm />}  action={addHabitatAction}/> 
     </Route>
     
     

     


     </Route>
      {/**###################################################### VET Dashboard ####################################################### */}
     <Route path="dashboardVet" element={< VetLayout/>}  loader={requreAuth}>
     <Route index element={<DashbordVet />} loader={dashVetloader}/>
     <Route path="addRapport" element={<RapportVetForm />} loader={rapportVetLoader} action={rapportVetAction}  />
     <Route path="avis" element={<HabitatAvis />}  loader={habitatAvisLoader} action={habitatAvisAction} />
     
     </Route>



      {/**######################################################Employe Dashboard ####################################################### */}
     <Route path="dashboardEmployee" element={<EmployeLayout/>}  loader={requreAuth}>
     <Route index element={<EmployeDashbord />}  loader={employeServiceLoader}/>
     <Route path="add" element={<AddServices/>} action={addActionService} />
     <Route path=":id"  element={<PutService />}  action={putServiceAction}/>
     <Route path="reviews" element={< Reviews/>} loader={reviewsLoader} />
     <Route path="alimentations" element={<Alimentation />}  loader={alimetationLoader} action={alimentationAction}/>
     <Route path="taches" element={<TachesHabitats />} loader={tachesHabitatsLoader}  action={tachesHabitatsAction}/>

     </Route>

    
    
    <Route path="*" element={<NotFound/>} />


    </Route>

  ))
  

  return (
    
    <RouterProvider router={router}/>
    
    
  )
}

export default App
