import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ import this
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "../api/axios";

function AuthPage() {
  const navigate = useNavigate(); // ✅ used for redirecting
  const [error, setError] = useState("");
  const [registerForm, setRegisterForm] = useState({
    fullname: "",
    email: "",
    password: ""
  });
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: ""
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      console.log("📤 Sending registerForm:", registerForm);
      await axios.post("/users/register", registerForm, {
        headers: { "Content-Type": "application/json" },
      });
      alert("Registered successfully! Now login.");
      setRegisterForm({ fullname: "", email: "", password: "" });
      setError("");
    } catch (err) {
      console.error("❌ Registration error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Registration failed.");
    }
  };

  const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const isAdmin = loginForm.email === "admin@example.com"; // You can improve this later
    const endpoint = isAdmin ? "/owners/login" : "/users/login";

    const res = await axios.post(
      endpoint,
      loginForm,
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

    // ✅ Save token and role
    const { token, owner, user } = res.data;

    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("role", isAdmin ? "owner" : "user"); // ✅ Correctly set role
    }

    if (isAdmin) {
      alert("Admin logged in successfully!");
      navigate("/admin");
    } else {
      alert("Logged in successfully!");
      navigate("/shop");
    }
    console.log("Saved token:", localStorage.getItem("token"));
console.log("Role:", localStorage.getItem("role"));


    setLoginForm({ email: "", password: "" });
    setError("");
  } catch (err) {
    console.error("❌ Login error:", err.response?.data || err.message);
    setError(err.response?.data?.message || "Login failed. Check credentials.");
  }
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
        {/* Registration Form */}
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
                value={registerForm.fullname}
                onChange={(e) => setRegisterForm({ ...registerForm, fullname: e.target.value })}
                required
              />
              <input
                className="bg-zinc-100 block w-full px-3 py-2 border border-zinc-200 rounded-md mb-3"
                type="email"
                placeholder="Email"
                name="email"
                value={registerForm.email}
                onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                required
              />
              <input
                className="bg-zinc-100 block w-full px-3 py-2 border border-zinc-200 rounded-md mb-3"
                type="password"
                placeholder="Password"
                name="password"
                value={registerForm.password}
                onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
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

        {/* Login Form */}
        <div className="w-1/2 flex items-center justify-center">
          <div className="w-full px-20">
            <h4 className="text-2xl capitalize mb-5">Login to your account</h4>
            <form autoComplete="off" onSubmit={handleLogin}>
              <input
                className="block bg-zinc-100 w-full px-3 py-2 border border-zinc-200 rounded-md mb-3"
                type="email"
                placeholder="Email"
                name="email"
                value={loginForm.email}
                onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                required
              />
              <input
                className="block bg-zinc-100 w-full px-3 py-2 border border-zinc-200 rounded-md mb-3"
                type="password"
                placeholder="Password"
                name="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                required
              />
              {loginForm.email === "admin@example.com" && (
  <p className="text-sm text-blue-500 mb-2">Logging in as <strong>Admin</strong></p>
)}

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
