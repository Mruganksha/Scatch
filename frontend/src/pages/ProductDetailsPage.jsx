import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { addToCart } from '../store/cartSlice';
import axios from '../api/axios';  // make sure this points to your axios instance

export default function ProductDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Error loading product:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, []);

  const handleAddToCart = () => {
    if (!product?.price) return;
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
      alert("Please login to add items to your cart.");
      navigate("/login");
      return;
    }
    dispatch(addToCart(product));
    alert("Item added to cart!");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 text-xl">Product not found.</p>
      </div>
    );
  }

  function arrayBufferToBase64(buffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}


  return <>
    <Header />
    <div className="max-w-6xl mx-auto p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
      <div className="flex justify-center items-center rounded-lg overflow-hidden">
        {product.image?.data ? (
          <img
             src={`data:${product.image.contentType};base64,${arrayBufferToBase64(product.image.data)}`}

            alt={product.name}
            className="w-full object-cover h-full"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            No image
          </div>
        )}
      </div>
      <div className="space-y-4">
        <h2 className="text-3xl font-bold">{product.name}</h2>
        <p className="text-lg text-gray-700">{product.description}</p>
        <p className="text-xl font-semibold">₹ {product.price}</p>
        <p className={`text-sm ${product.price ? 'text-green-600' : 'text-red-500'}`}>
          {product.price ? 'In Stock' : 'Out of Stock'}
        </p>
        <button
          onClick={handleAddToCart}
          disabled={!product.price}
          className={`mt-4 px-6 py-2 rounded text-white ${
            product.price ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          Add to Cart
        </button>
      </div>
    </div>
    <Footer />
  </>;
}
