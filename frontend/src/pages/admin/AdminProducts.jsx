import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../api/axios"; // Make sure this points to your axios instance

export default function AdminProducts() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Products</h1>
        <Link
          to="/admin"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          + Add Product
        </Link>
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="text-xs uppercase bg-gray-100 text-gray-600">
            <tr>
              <th className="px-6 py-4">Image</th>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Description</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product._id}
                className="border-t hover:bg-gray-50 transition-all"
              >
                <td className="px-6 py-3">
                  <img
                    src={
  product.image
    ? `data:image/jpeg;base64,${product.image}`
    : "https://via.placeholder.com/150"
}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                </td>
                <td className="px-6 py-3 font-medium">{product.name}</td>
                <td className="px-6 py-3">₹{product.price}</td>
                <td className="px-6 py-3">{product.description || "N/A"}</td>
                <td className="px-6 py-3 text-center space-x-2">
                  <Link
                    to={`/admin/products/edit/${product._id}`}
                    className="text-sm text-blue-500 hover:underline"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => console.log("delete logic here")}
                    className="text-sm text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                  No products available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
