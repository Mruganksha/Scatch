import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const cartItems = useSelector((state) => state.cart.items);
  const count = cartItems.reduce((sum, i) => sum + i.quantity, 0);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full px-6 md:px-10 py-5 bg-white shadow-md flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-blue-500">
        Scatch
      </Link>

      {/* Desktop Menu */}
      <nav className="hidden md:flex items-center gap-6 text-sm">
        <Link to="/contact" className="text-gray-600 hover:text-blue-500">Contact</Link>
        <Link to="/faq" className="text-gray-600 hover:text-blue-500">FAQ</Link>
        <Link to="/privacy" className="text-gray-600 hover:text-blue-500">Privacy</Link>
        <Link to="/terms" className="text-gray-600 hover:text-blue-500">Terms</Link>
        <Link to="/account" className="text-sm font-medium text-gray-700 hover:underline">Account</Link>
        <Link to="/orders" className="text-sm font-medium text-gray-700 hover:underline">Orders</Link>
        <Link to="/login" className="text-gray-600 hover:text-blue-500">Login/Register</Link>
        <Link to="/cart" className="relative text-gray-600 hover:text-blue-500">
          <i className="ri-shopping-cart-line text-2xl"></i>
          {count > 0 && (
            <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white w-5 h-5 flex items-center justify-center rounded-full">
              {count}
            </span>
          )}
        </Link>
      </nav>

      {/* Mobile Hamburger */}
      <div className="md:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl">
          <i className="ri-menu-line"></i>
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="absolute top-20 left-0 w-full bg-white shadow-md z-50 flex flex-col px-6 py-4 space-y-4 md:hidden">
          <Link to="/contact" className="text-gray-600 hover:text-blue-500">Contact</Link>
          <Link to="/faq" className="text-gray-600 hover:text-blue-500">FAQ</Link>
          <Link to="/privacy" className="text-gray-600 hover:text-blue-500">Privacy</Link>
          <Link to="/terms" className="text-gray-600 hover:text-blue-500">Terms</Link>
          <Link to="/account" className="text-sm font-medium text-gray-700 hover:underline">Account</Link>
          <Link to="/orders" className="text-sm font-medium text-gray-700 hover:underline">Orders</Link>
          <Link to="/login" className="text-gray-600 hover:text-blue-500">Login/Register</Link>
          <Link to="/cart" className="relative text-gray-600 hover:text-blue-500">
            <i className="ri-shopping-cart-line text-2xl"></i>
            {count > 0 && (
              <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white w-5 h-5 flex items-center justify-center rounded-full">
                {count}
              </span>
            )}
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;
