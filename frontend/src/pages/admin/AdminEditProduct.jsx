import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../api/axios"; // Use your axios instance

export default function AdminEditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch product data from backend
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/products/${id}`);
        setProduct(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching product:", err);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // Handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  // Submit updated product to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/products/${id}`, product);
      navigate("/admin/products");
    } catch (err) {
      console.error("Failed to update product:", err);
    }
  };

  if (loading || !product) {
    return <div className="p-6">Loading product...</div>;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        Edit Product - {product.name}
      </h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded shadow-md"
      >
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          placeholder="Product Name"
        />
        <input
          type="text"
          name="price"
          value={product.price}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          placeholder="Price"
        />
        <input
          type="number"
          name="stock"
          value={product.stock}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          placeholder="Stock Quantity"
        />
        <input
          type="text"
          name="category"
          value={product.category}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          placeholder="Category"
        />
        <input
          type="text"
          name="image"
          value={product.image}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          placeholder="Image URL"
        />
        <textarea
          name="description"
          value={product.description || ""}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          placeholder="Description"
        ></textarea>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
