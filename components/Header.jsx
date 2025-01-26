import React from 'react';
import { Link } from 'react-router';

const Header = () => {
  return (
    <header className="bg-green-900 p-4">
      <nav className="container mx-auto flex justify-between items-center">
       <Link to ="/"> <div className="text-white text-xl font-bold">Arcadia Zoo</div></Link>
        <ul className="flex space-x-4">
          
          <li>
            <Link to="/services" className="text-white hover:text-blue-300">Services</Link>
          </li>
          <li>
            <Link to="/habitats" className="text-white hover:text-blue-300">Habitats</Link>
          </li>
          <li>
            <Link to="/administration" className="text-white hover:text-blue-300">Administration</Link>
          </li>
          <li>
            <Link to="/contact" className="text-white hover:text-blue-300">contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;