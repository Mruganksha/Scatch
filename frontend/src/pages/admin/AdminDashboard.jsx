import React, { useEffect, useState } from "react";
import axios from "../../api/axios";

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    image: null,
    id: null,
  });

  const [stats, setStats] = useState({
  totalUsers: 0,
  totalOrders: 0,
  totalRevenue: 0,
});

  // Fetch products
  const fetchProducts = async () => {
    try {
      const res = await axios.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products", err);
    }
  };

  const fetchStats = async () => {
  try {
    const res = await axios.get("/admin/stats", { withCredentials: true });
    setStats(res.data);
  } catch (err) {
    console.error("Failed to fetch stats", err);
  }
};

  useEffect(() => {
    fetchProducts();
    fetchStats();
  }, []);

  // Handle change for text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Handle file input change
  const handleImageChange = (e) => {
    setForm({ ...form, image: e.target.files[0] });
  };

  // Upload or Update product
  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("price", form.price);
    formData.append("description", form.description);
    if (form.image) formData.append("image", form.image);

    try {
      if (form.id) {
        // PUT update (you can add this route in backend if needed)
        await axios.put(`/products/${form.id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        // POST create
        await axios.post("/products", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      setForm({ name: "", price: "", description: "", image: null, id: null });
      fetchProducts();
    } catch (err) {
      console.error("Upload failed", err);
    }
  };

  // Delete product
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  // Edit product
  const handleEdit = (id) => {
    const product = products.find((p) => p._id === id);
    if (product) {
      setForm({
        name: product.name,
        price: product.price,
        description: product.description,
        image: null,
        id: product._id,
      });
    }
  };

  const totalOrders = 128;
  const totalUsers = 76;
  const totalRevenue = 18240;

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-800">Admin Dashboard</h1>
        <button className="text-sm text-blue-500 hover:underline">Logout</button>
      </header>

      <main className="p-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded shadow text-center">
            <h4 className="text-lg font-semibold text-gray-600">Total Orders</h4>
            <p className="text-2xl font-bold text-blue-600">{stats.totalOrders}</p>
          </div>
          <div className="bg-white p-6 rounded shadow text-center">
            <h4 className="text-lg font-semibold text-gray-600">Total Users</h4>
            <p className="text-2xl font-bold text-blue-600">{stats.totalUsers}</p>
          </div>
          <div className="bg-white p-6 rounded shadow text-center">
            <h4 className="text-lg font-semibold text-gray-600">Total Revenue</h4>
            <p className="text-2xl font-bold text-green-600">${stats.totalRevenue}</p>
          </div>
        </div>

        {/* Upload / Edit Product Form */}
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
            type="file"
            accept="image/*"
            onChange={handleImageChange}
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

        {/* Manage Products */}
        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-4">Manage Products</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product._id} className="bg-white p-4 rounded shadow relative">
                <img
                  src={
  product.image
    ? `data:image/jpeg;base64,${product.image}`
    : "https://via.placeholder.com/150"
}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded mb-2"
                />
                <h4 className="text-lg font-bold">{product.name}</h4>
                <p className="text-sm text-gray-600 mb-2">${product.price}</p>
                <p className="text-sm mb-4">{product.description}</p>
                <div className="absolute top-2 right-2 space-x-2">
                  <button
                    onClick={() => handleEdit(product._id)}
                    className="text-blue-500 text-sm hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="text-red-500 text-sm hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
