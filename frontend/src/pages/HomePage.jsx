import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <>
      <Header />

      <div className="w-full min-h-screen px-10 py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            Welcome to <span className="text-blue-500">Scatch</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Build, share, and explore content seamlessly. Join the community and make your mark.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            
            <a
              href="/login"
              className="px-6 py-3 border border-blue-500 text-blue-500 rounded-full hover:bg-blue-50 transition"
            >
              Login
            </a>
            <Link
              to="/shop"
              className="px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-green-600 transition"
            >
              Start Shopping
            </Link>
          </div>
        </div>

        {/* Features section */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <div className="p-6 bg-white rounded-xl shadow text-center">
            <h3 className="text-xl font-semibold mb-2">Create Content</h3>
            <p className="text-gray-500">Write, upload, and manage your posts easily.</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow text-center">
            <h3 className="text-xl font-semibold mb-2">Connect</h3>
            <p className="text-gray-500">Interact with others and grow your audience.</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow text-center">
            <h3 className="text-xl font-semibold mb-2">Secure & Fast</h3>
            <p className="text-gray-500">Backed by Appwrite for security and speed.</p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default HomePage;
