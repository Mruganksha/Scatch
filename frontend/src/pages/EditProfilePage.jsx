// src/pages/EditProfilePage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function EditProfilePage() {
  const navigate = useNavigate();

  // Placeholder data (replace with actual user data from context or API)
  const [form, setForm] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Send update to backend
    console.log("Updated Profile:", form);
    navigate("/account");
  };

  return (
    <>
      <Header />
      <div className="max-w-2xl mx-auto px-6 py-20 min-h-screen">
        <h1 className="text-3xl font-semibold mb-8 text-gray-800">Edit Profile</h1>
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded shadow">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Phone</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
              placeholder="Optional"
            />
          </div>

          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => navigate("/account")}
              className="text-gray-600 hover:underline"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}
