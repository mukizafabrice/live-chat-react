// components/Navbar.js

import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 z-50 w-full p-4 bg-blue-600 shadow-md">
      <div className="flex items-center justify-between mx-auto max-w-7xl">
        {/* Logo or App Name */}
        <div className="text-2xl font-bold text-white">
          <Link to="/">Connectify</Link>
        </div>

        {/* Navigation Links */}
        <div className="hidden space-x-6 md:flex">
          <Link to="/home" className="text-white hover:text-gray-200">
            Home
          </Link>
          <Link to="/chat" className="text-white hover:text-gray-200">
            Chat
          </Link>
          <Link to="/logout" className="text-white hover:text-gray-200">
            Logout
          </Link>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button className="text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div className="p-4 mt-2 space-y-4 bg-blue-700 rounded-lg md:hidden">
        <Link to="/home" className="block text-white hover:text-gray-200">
          Home
        </Link>
        <Link to="/chat" className="block text-white hover:text-gray-200">
          Chat
        </Link>
        <Link to="/logout" className="block text-white hover:text-gray-200">
          Logout
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
