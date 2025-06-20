// src/pages/AdminEditUser.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function AdminEditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/users/${id}`, {
          method: "GET",
          credentials: "include", // Send cookie for auth
        });

        if (!response.ok) {
          throw new Error("User not found or unauthorized");
        }

        const data = await response.json();

        // Normalize role and status
        setUser({
          ...data,
          role: data.isadmin ? "admin" : "customer",
          status: data.status || "active", // fallback if status not in DB
        });
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!user) {
    console.error("User is null");
    return;
  }

  try {
    const res = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(user),
    });

    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.message || "Update failed");
    }

    navigate("/admin/users");
  } catch (err) {
    console.error("Error updating user:", err);
  }
};


  if (!user) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold mb-4">Edit User - {user.name}</h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded shadow-md"
      >
        <input
          name="name"
          value={user.name || user.fullname}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          placeholder="Name"
        />
        <input
          name="email"
          value={user.email}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          placeholder="Email"
        />
        <select
          name="role"
          value={user.role}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        >
          <option value="admin">Admin</option>
          <option value="customer">Customer</option>
        </select>
        <select
          name="status"
          value={user.status}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        >
          <option value="active">Active</option>
          <option value="banned">Banned</option>
        </select>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
