import React, { useState } from "react";
import { Link } from "react-router-dom";

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", description: "", image: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpload = (e) => {
    e.preventDefault();
    const newProduct = { ...form, id: Date.now() };
    setProducts([...products, newProduct]);
    setForm({ name: "", price: "", description: "", image: "" });
  };

  const handleDelete = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const handleEdit = (id) => {
    const product = products.find((p) => p.id === id);
    setForm(product);
    setProducts(products.filter((p) => p.id !== id));
  };

  // Mock analytics data
  const totalOrders = 128;
  const totalUsers = 76;
  const totalRevenue = 18240;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg hidden md:flex flex-col p-6">
        <h2 className="text-2xl font-bold text-blue-600 mb-6">Admin Panel</h2>
        <nav className="space-y-4">
          <Link to="/admin" className="block text-gray-700 hover:text-blue-500">Dashboard</Link>
          <Link to="/admin/products" className="block text-gray-700 hover:text-blue-500">Manage Products</Link>
          <Link to="/admin/orders" className="block text-gray-700 hover:text-blue-500">Orders</Link>
          <Link to="/admin/users" className="block text-gray-700 hover:text-blue-500">Users</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Admin Header */}
        <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800">Admin Dashboard</h1>
          <button className="text-sm text-blue-500 hover:underline">Logout</button>
        </header>

        <main className="flex-1 p-6">
          {/* Analytics Overview */}
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white p-6 rounded shadow text-center">
              <h4 className="text-lg font-semibold text-gray-600">Total Orders</h4>
              <p className="text-2xl font-bold text-blue-600">{totalOrders}</p>
            </div>
            <div className="bg-white p-6 rounded shadow text-center">
              <h4 className="text-lg font-semibold text-gray-600">Total Users</h4>
              <p className="text-2xl font-bold text-blue-600">{totalUsers}</p>
            </div>
            <div className="bg-white p-6 rounded shadow text-center">
              <h4 className="text-lg font-semibold text-gray-600">Total Revenue</h4>
              <p className="text-2xl font-bold text-green-600">${totalRevenue}</p>
            </div>
          </div>

          {/* Upload Product Form */}
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Upload / Edit Product</h2>
          <form onSubmit={handleUpload} className="grid md:grid-cols-2 gap-4 bg-white p-6 rounded-lg shadow">
            <input
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="Product Name"
              required
              className="border px-4 py-2 rounded w-full"
            />
            <input
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              placeholder="Price"
              required
              className="border px-4 py-2 rounded w-full"
            />
            <input
              name="image"
              type="text"
              value={form.image}
              onChange={handleChange}
              placeholder="Image URL"
              className="border px-4 py-2 rounded w-full"
            />
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Product Description"
              className="border px-4 py-2 rounded w-full md:col-span-2"
              rows={4}
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 md:col-span-2"
            >
              {form.id ? "Update Product" : "Upload Product"}
            </button>
          </form>

          {/* Uploaded Products */}
          <div className="mt-10">
            <h3 className="text-xl font-semibold mb-4">Manage Products</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product.id} className="bg-white p-4 rounded shadow relative">
                  <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded mb-2" />
                  <h4 className="text-lg font-bold">{product.name}</h4>
                  <p className="text-sm text-gray-600 mb-2">${product.price}</p>
                  <p className="text-sm mb-4">{product.description}</p>
                  <div className="absolute top-2 right-2 space-x-2">
                    <button
                      onClick={() => handleEdit(product.id)}
                      className="text-blue-500 text-sm hover:underline"
                    >Edit</button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-red-500 text-sm hover:underline"
                    >Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;
