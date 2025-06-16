import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

function AuthPage() {
  const [error, setError] = useState(""); // Simulate server-side error message

  // These would be replaced by actual handlers and state later
  const handleRegister = (e) => {
    e.preventDefault();
    // Add registration logic here
    setError("Registration failed. Try again."); // Example
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Add login logic here
    setError("Login failed. Check credentials."); // Example
  };

  return (
    <>
      <Header />
      {error && (
        <div className="absolute top-5 left-1/2 -translate-x-1/2 p-3 rounded-md bg-red-500 z-50">
          <span className="inline-block mt-1 mb-1 text-white">{error}</span>
        </div>
      )}

      <div className="w-full min-h-screen flex px-20">
        {/* Registration */}
        <div className="w-1/2 flex items-center justify-center">
          <div className="w-full px-20">
            <h3 className="text-4xl mb-1">
              Welcome to <span className="text-blue-400 font-semibold">Scatch</span>
            </h3>
            <h4 className="text-2xl mb-5">Create your account</h4>
            <form autoComplete="off" onSubmit={handleRegister}>
              <input
                className="bg-zinc-100 block w-full px-3 py-2 border border-zinc-200 rounded-md mb-3"
                type="text"
                placeholder="Full Name"
                name="fullname"
                required
              />
              <input
                className="bg-zinc-100 block w-full px-3 py-2 border border-zinc-200 rounded-md mb-3"
                type="email"
                placeholder="Email"
                name="email"
                required
              />
              <input
                className="bg-zinc-100 block w-full px-3 py-2 border border-zinc-200 rounded-md mb-3"
                type="password"
                placeholder="Password"
                name="password"
                required
              />
              <button
                type="submit"
                className="px-5 rounded-full py-3 mt-2 bg-blue-500 text-white w-full"
              >
                Create My Account
              </button>
            </form>
          </div>
        </div>

        {/* Login */}
        <div className="w-1/2 flex items-center justify-center">
          <div className="w-full px-20">
            <h4 className="text-2xl capitalize mb-5">Login to your account</h4>
            <form autoComplete="off" onSubmit={handleLogin}>
              <input
                className="block bg-zinc-100 w-full px-3 py-2 border border-zinc-200 rounded-md mb-3"
                type="email"
                placeholder="Email"
                name="email"
                required
              />
              <input
                className="block bg-zinc-100 w-full px-3 py-2 border border-zinc-200 rounded-md mb-3"
                type="password"
                placeholder="Password"
                name="password"
                required
              />
              <button
                type="submit"
                className="px-5 block rounded-full py-3 mt-2 bg-blue-500 text-white w-full"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default AuthPage;
