import React from 'react';
import { NavLink } from 'react-router';

const Header = () => {
  const activeStyle = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "grey"
  }
  return (
    <header className="bg-green-900 p-4">
      <nav className="container mx-auto flex justify-between items-center">
       <NavLink to ="/"> <div className="text-white text-xl font-bold">Arcadia Zoo</div></NavLink>
        <ul className="flex space-x-4">
          
          <li>
            <NavLink to="/services" 
            className="text-white hover:text-blue-300"
            style={({isActive}) => isActive ? activeStyle : null }
            >Services</NavLink>
            
          </li>
          <li>
            <NavLink to="/habitats" 
            className="text-white hover:text-blue-300"
            style={({isActive}) => isActive ? activeStyle : null }
            >Habitats</NavLink>
           
          </li>
          <li>
            <NavLink to="/contact" 
            className="text-white hover:text-blue-300"
            style={({isActive}) => isActive ? activeStyle : null }
            >contact</NavLink>
           
          </li>

          <li>
            <NavLink to="/administration" 
            className="text-white hover:text-blue-300"
            style={({isActive}) => isActive ? activeStyle : null }
            >Administration</NavLink>
            
          </li>
       
        </ul>
      </nav>
    </header>
  );
};

export default Header;