import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

function AuthPage() {
  const [error, setError] = useState("");
  const [mode, setMode] = useState("register"); // 'register' or 'login'

  const handleRegister = (e) => {
    e.preventDefault();
    setError("Registration failed. Try again.");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError("Login failed. Check credentials.");
  };

  return (
    <>
      <Header />

      {error && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 p-3 rounded-md bg-red-500 z-50">
          <span className="text-white">{error}</span>
        </div>
      )}

      <div className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-10">
        {/* Toggle Switch */}
        <div className="mb-8 flex space-x-4">
          <button
            onClick={() => setMode("register")}
            className={`px-5 py-2 rounded-full text-sm font-medium ${
              mode === "register" ? "bg-blue-500 text-white" : "bg-zinc-200"
            }`}
          >
            Register
          </button>
          <button
            onClick={() => setMode("login")}
            className={`px-5 py-2 rounded-full text-sm font-medium ${
              mode === "login" ? "bg-blue-500 text-white" : "bg-zinc-200"
            }`}
          >
            Login
          </button>
        </div>

        {/* Form */}
        <div className="w-full max-w-md">
          {mode === "register" ? (
            <>
              <h3 className="text-3xl mb-1 text-center">
                Welcome to <span className="text-blue-400 font-semibold">Scatch</span>
              </h3>
              <h4 className="text-xl mb-5 text-center">Create your account</h4>
              <form autoComplete="off" onSubmit={handleRegister}>
                <input
                  className="bg-zinc-100 w-full px-3 py-2 border border-zinc-200 rounded-md mb-3"
                  type="text"
                  placeholder="Full Name"
                  name="fullname"
                  required
                />
                <input
                  className="bg-zinc-100 w-full px-3 py-2 border border-zinc-200 rounded-md mb-3"
                  type="email"
                  placeholder="Email"
                  name="email"
                  required
                />
                <input
                  className="bg-zinc-100 w-full px-3 py-2 border border-zinc-200 rounded-md mb-3"
                  type="password"
                  placeholder="Password"
                  name="password"
                  required
                />
                <button
                  type="submit"
                  className="w-full px-5 py-3 bg-blue-500 text-white rounded-full mt-2"
                >
                  Create My Account
                </button>
              </form>
            </>
          ) : (
            <>
              <h4 className="text-2xl mb-5 text-center">Login to your account</h4>
              <form autoComplete="off" onSubmit={handleLogin}>
                <input
                  className="bg-zinc-100 w-full px-3 py-2 border border-zinc-200 rounded-md mb-3"
                  type="email"
                  placeholder="Email"
                  name="email"
                  required
                />
                <input
                  className="bg-zinc-100 w-full px-3 py-2 border border-zinc-200 rounded-md mb-3"
                  type="password"
                  placeholder="Password"
                  name="password"
                  required
                />
                <button
                  type="submit"
                  className="w-full px-5 py-3 bg-blue-500 text-white rounded-full mt-2"
                >
                  Login
                </button>
              </form>
            </>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default AuthPage;
