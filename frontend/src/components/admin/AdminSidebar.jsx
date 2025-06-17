import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  ShoppingCart,
  Package,
  Users,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const navLinks = [
  { name: "Dashboard", icon: <Home size={18} />, path: "/admin" },
  { name: "Orders", icon: <ShoppingCart size={18} />, path: "/admin/orders" },
  { name: "Products", icon: <Package size={18} />, path: "/admin/products" },
  { name: "Users", icon: <Users size={18} />, path: "/admin/users" },
];

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(true); // Open by default for desktop
  const location = useLocation();

  return (
    <>
      {/* Toggle Button - visible on all screens now */}
      <button
        className="fixed top-4 left-4 z-40 p-2 bg-white rounded shadow-md"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`h-screen bg-white border-r shadow-sm fixed top-0 left-0 z-30 transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        w-64`}
      >
        <div className="text-2xl font-bold p-6 border-b text-blue-600 ml-7">
          Admin Panel
        </div>
        <nav className="p-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-100 transition ${
                location.pathname === link.path
                  ? "bg-blue-100 text-blue-700 font-medium"
                  : "text-gray-700"
              }`}
              onClick={() => setIsOpen(false)} // Optional: auto-close
            >
              {link.icon}
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 w-full p-4">
          <button className="w-full flex items-center justify-center gap-2 text-red-600 hover:text-red-700 text-sm font-medium">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>
    </>
  );
}
