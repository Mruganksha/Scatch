import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="w-full px-10 py-5 bg-white shadow-md flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-blue-500">
        Scatch
      </Link>
      <nav className="flex items-center gap-6">
        <Link to="/login" className="text-gray-600 hover:text-blue-500">
          Login
        </Link>
        <Link to="/register" className="text-gray-600 hover:text-blue-500">
          Register
        </Link>
      </nav>
    </header>
  );
}

export default Header;
