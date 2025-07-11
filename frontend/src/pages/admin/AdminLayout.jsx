// src/layouts/AdminLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminHeader from "../../components/admin/AdminHeader";

export default function AdminLayout() {
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1">
        <AdminHeader />
        <main className="pt-16 md:pl-64 px-4">
       
          <Outlet />
        </main>
      </div>
    </div>
  );
}
