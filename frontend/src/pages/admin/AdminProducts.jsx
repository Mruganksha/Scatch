import React from "react";
import { Link } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: "$59.99",
    stock: 24,
    category: "Electronics",
    image:
      "https://via.placeholder.com/100",
  },
  {
    id: 2,
    name: "Running Shoes",
    price: "$89.99",
    stock: 12,
    category: "Footwear",
    image:
      "https://via.placeholder.com/100",
  },
  {
    id: 3,
    name: "Smart Watch",
    price: "$129.00",
    stock: 0,
    category: "Accessories",
    image:
      "https://via.placeholder.com/100",
  },
];

export default function AdminProducts() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Products</h1>
        <Link
          to="/admin/products/new"
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
              <th className="px-6 py-4">Stock</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="border-t hover:bg-gray-50 transition-all"
              >
                <td className="px-6 py-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                </td>
                <td className="px-6 py-3 font-medium">{product.name}</td>
                <td className="px-6 py-3">{product.price}</td>
                <td className="px-6 py-3">
                  {product.stock > 0 ? (
                    <span className="text-green-600">{product.stock}</span>
                  ) : (
                    <span className="text-red-500">Out of Stock</span>
                  )}
                </td>
                <td className="px-6 py-3">{product.category}</td>
                <td className="px-6 py-3 text-center space-x-2">
                  <button className="text-sm text-blue-500 hover:underline">
                    Edit
                  </button>
                  <button className="text-sm text-red-500 hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
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
