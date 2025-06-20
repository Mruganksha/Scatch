import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

function AccountPage() {
  const [user, setUser] = useState(null);
  const [address, setAddress] = useState("");
  const fileInputRef = useRef();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/users/profile`, {
  headers: {
    Authorization: `Bearer ${token}`
  },
  withCredentials: true
});

        setUser(res.data.user);
        setAddress(res.data.user.address || "");
      } catch (err) {
        console.error("Error fetching user profile:", err);
      }
    };

    fetchUser();
  }, []);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
  const formData = new FormData();
  formData.append("profileImage", file);

    try {
      const res = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/users/upload-profile`, formData, {
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${token}`
  },
  withCredentials: true
});

      console.log("Image uploaded:", res.data);
      setUser((prev) => ({ ...prev, profileImage: res.data.profileImage }));
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  const handleAddressSave = async () => {
    try {
      const res = await axios.put(
  `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/users/update-address`,
  { address },
  {
    headers: {
      Authorization: `Bearer ${token}`
    },
    withCredentials: true
  }
);

      alert("Address updated successfully!");
    } catch (err) {
      console.error("Address update failed:", err);
    }
  };

  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto px-6 py-20 min-h-screen bg-white-50">
        <h1 className="text-3xl font-semibold mb-8 text-gray-800">My Account</h1>

        {/* Profile Section */}
        <div className="flex items-center gap-6 mb-8">
          <div
            className="w-24 h-24 rounded-full bg-gray-300 overflow-hidden cursor-pointer"
            onClick={handleImageClick}
          >
            <img
  src={user?.profileImage ? `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/${user.profileImage}` : "default.jpg"}
  alt="Profile"
  className="w-full h-full object-cover"
/>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              hidden
              accept="image/*"
            />
          </div>
          <div>
            <h2 className="text-xl font-semibold">{user?.name}</h2>
            <p className="text-gray-600">{user?.email}</p>
          </div>
        </div>

        {/* Info Sections */}
        <div className="space-y-6">
          <div className="p-6 bg-white shadow rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Address</h2>
            <textarea
              rows={3}
              className="w-full p-2 border rounded mb-2"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={handleAddressSave}
            >
              Save Address
            </button>
          </div>

          <div className="p-6 bg-white shadow rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Security</h2>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Change Password
            </button>
          </div>

          <div className="p-6 bg-white shadow rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Order History</h2>
            <p className="mb-2 text-gray-600">View your previous orders and track current ones.</p>
            <a
              href="/orders"
              className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Go to Orders
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AccountPage;
