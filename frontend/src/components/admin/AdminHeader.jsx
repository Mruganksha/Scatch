import React from "react";

export default function AdminHeader() {
  return (
    <header className="w-full h-16 bg-white border-b shadow-sm pl-64 flex items-center px-6 justify-between z-20 fixed top-0">
      <h1 className="text-lg font-semibold text-gray-800">Admin Dashboard</h1>

      <div className="flex items-center gap-4">
        {/* Future: notifications, search, etc. */}
        <div className="text-sm text-gray-600">admin@example.com</div>
        <img
          src="https://placehold.co/32x32?text=Img"
          alt="Admin"
          className="w-8 h-8 rounded-full"
        />
      </div>
    </header>
  );
}
