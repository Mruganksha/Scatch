import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { addToCart } from '../store/cartSlice';

const mockProducts = [
  {
    id: 1,
    name: 'Modern Chair',
    price: 1200,
    image: 'https://via.placeholder.com/150',
    description: 'A stylish modern chair perfect for any room.',
    isAvailable: true,
    hasDiscount: false,
  },
  {
    id: 2,
    name: 'Wooden Table',
    price: 2200,
    image: 'https://via.placeholder.com/150',
    description: 'A sturdy wooden table for dining or working.',
    isAvailable: false,
    hasDiscount: true,
  },
  // Add more products here if needed...
];

function ProductDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const product = mockProducts.find((p) => p.id === parseInt(id));

  const handleAddToCart = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    if (!isLoggedIn) {
      alert("Please login to add items to your cart.");
      navigate("/login");
      return;
    }

    dispatch(addToCart(product));
    alert("Item added to cart!");
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-red-500">Product not found.</p>
      </div>
    );
  }

  return (
    <>
      <Header />

      <div className="max-w-6xl mx-auto p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex justify-center items-center bg-gray-100 rounded-lg p-10">
          <img src={product.image} alt={product.name} className="h-64 object-contain" />
        </div>

        <div className="space-y-4">
          <h2 className="text-3xl font-bold">{product.name}</h2>
          <p className="text-lg text-gray-700">{product.description}</p>
          <p className="text-xl font-semibold">₹ {product.price}</p>

          <p className={`text-sm ${product.isAvailable ? 'text-green-600' : 'text-red-500'}`}>
            {product.isAvailable ? 'In Stock' : 'Out of Stock'}
          </p>

          <button
            onClick={handleAddToCart}
            disabled={!product.isAvailable}
            className={`mt-4 px-6 py-2 rounded text-white ${
              product.isAvailable ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            Add to Cart
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default ProductDetailsPage;
