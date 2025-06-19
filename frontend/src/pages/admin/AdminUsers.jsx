import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../api/axios"; // Your custom axios instance

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch users on mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
const res = await axios.get("http://localhost:5000/api/users", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

        console.log("Users fetched:", res.data);
        setUsers(res.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // ✅ Move this outside useEffect
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/users/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) {
        let errorMessage = "Failed to delete user";
      try {
        const error = await res.json();
        errorMessage = error.message || errorMessage;
      } catch (e) {
        console.warn("Could not parse error JSON:", e);
      }
      throw new Error(errorMessage);
      }

      // ✅ Update UI after successful delete
      setUsers((prev) => prev.filter((user) => user._id !== id));
    } catch (err) {
      console.error("Failed to delete user:", err.message);
      alert("Error deleting user");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Users</h1>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="text-xs uppercase bg-gray-100 text-gray-600">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                  Loading users...
                </td>
              </tr>
            ) : users.length > 0 ? (
              users.map((user) => (
                <tr
                  key={user._id}
                  className="border-t hover:bg-gray-50 transition-all"
                >
                  <td className="px-6 py-3 font-medium">{user.fullname}</td>
                  <td className="px-6 py-3">{user.email}</td>
                  <td className="px-6 py-3 capitalize">{user.role}</td>
                  <td className="px-6 py-3">
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded ${
                        user.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-center space-x-2">
                    <Link
                      to={`/admin/users/edit/${user._id}`}
                      className="text-sm text-blue-500 hover:underline"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="text-sm text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
