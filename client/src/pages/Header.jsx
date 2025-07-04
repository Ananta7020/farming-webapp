import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  

  return (
    <nav className="bg-green-700 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-2xl font-bold">🌿 FarmAssist</div>

        <div className="flex space-x-4 text-sm sm:text-base">
          <Link to="/profile" className="hover:text-green-200 transition">
            Profile
          </Link>

          <Link to="/about" className="hover:text-green-200 transition">
            About
          </Link>

          <Link to="/dashboard" className="hover:text-green-200 transition">
            Dashboard
            </Link>
         
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
