import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function AccountPage() {
  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto px-6 py-20 min-h-screen bg-white-50">
        <h1 className="text-3xl font-semibold mb-8 text-gray-800">My Account</h1>

        {/* Profile Section */}
        <div className="flex items-center gap-6 mb-8">
          <div className="w-24 h-24 rounded-full bg-gray-300 overflow-hidden">
            {/* Replace with actual image source later */}
            <img
              src="https://via.placeholder.com/150"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-xl font-semibold">John Doe</h2>
            <p className="text-gray-600">john@example.com</p>
            {/* Optionally, an edit profile button */}
            <button className="mt-2 text-sm text-blue-500 hover:underline">
              Edit Profile
            </button>
          </div>
        </div>

        {/* Info Sections */}
        <div className="space-y-6">
          <div className="p-6 bg-white shadow rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Addresses</h2>
            <p>123 Main Street, City, Country</p>
            {/* Add address edit/manage UI later */}
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
            <Link
              to="/orders"
              className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Go to Orders
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AccountPage;
