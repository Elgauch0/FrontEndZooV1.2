import { BrowserRouter, Routes,Route } from "react-router"
import Layout from "../components/Layout"
import Home from "../pages/Home"
import Service from "../pages/Service";
import Habitats from "../pages/Habitats";
import Administration from "../pages/Administration";
import Contact from "../pages/Contact";
import NotFound from "../pages/NotFound";





function App() {
  

  return (
    
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout />}>
      <Route index element={<Home/>}/>
      <Route path="services"element={<Service/>} />
      <Route path="habitats"element={<Habitats />} />
      <Route path="administration"element={<Administration/>} />
      <Route path="contact"element={<Contact/>} />
      <Route path="*" element={<NotFound/>} />


      </Route>
    </Routes>
      
    </BrowserRouter>
    
  )
}

export default App
