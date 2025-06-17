// src/components/auth/ProtectedRoute.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ allowedRole }) {
  const user = useSelector((state) => state.auth.user); // e.g. { email, role }

  if (!user) return <Navigate to="/login" />;
  if (user.role !== allowedRole) return <Navigate to="/" />;

  return <Outlet />;
}
