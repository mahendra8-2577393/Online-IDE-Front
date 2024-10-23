import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar , logout }) => {
  return (
    <div
      className={`sidebar fixed top-0 left-0 w-60 h-full bg-[#8bd185] transition-transform transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
    
      <ul className="mt-5 ml-4 font-bold text-xl">
        <li>
          <Link to="/" className="text-white font-serif p-4 block">
            Home
          </Link>
        </li>
        <li>
          <Link to="/about" className="text-white p-4 block">
            About
          </Link>
        </li>
        <li>
          <Link to="/contact" className="text-white p-4 block">
            Contact
          </Link>
        </li>
        <li>
          <Link to="/services" className="text-white p-4 block">
            Services
          </Link>
        </li>
      
      </ul>
      <button
            onClick={logout}
            className="btnBlue bg-blue-500 ml-6 hover:!bg-red-600"
          >
            Logout
          </button>
  
      
    </div>
  );
};

export default Sidebar;
