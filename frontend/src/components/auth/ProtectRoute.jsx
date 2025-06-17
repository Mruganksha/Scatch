import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios"; // Make sure Axios is installed

export default function ProtectedRoute({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Show loading while checking

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/auth/me", { withCredentials: true }); // Adjust URL and credentials if needed
        setUser(res.data); // Assumes response includes { id, name, role, ... }
      } catch (err) {
        console.error("Auth check failed", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return <div className="p-6">Checking authentication...</div>;
  }

  if (!user || user.role !== "admin") {
    return <Navigate to="/login" />;
  }

  return children;
}
