import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, incrementQuantity, decrementQuantity , } from '../store/cartSlice';
import { useNavigate } from 'react-router-dom'; // ✅ import
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Buffer } from 'buffer';

function CartPage() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // ✅ initialize

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleCheckout = () => {
    navigate('/checkout'); // ✅ redirect to checkout page
  };

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const convertImageBufferToBase64 = (buffer) => {
  if (!buffer || buffer.length > 500000) {
    console.warn("Skipping image conversion: buffer too large or undefined");
    return null;
  }

  try {
    const binary = Array.from(new Uint8Array(buffer), byte => String.fromCharCode(byte)).join('');
    return `data:image/jpeg;base64,${btoa(binary)}`;
  } catch (err) {
    console.error("Image conversion error", err);
    return null;
  }
};







  return (
    <>
      <Header />

      <div className="px-6 md:px-20 py-16 min-h-screen bg-gray-50">
        <h1 className="text-4xl font-bold mb-12 text-gray-800">Your Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <p className="text-gray-500 text-lg">Your cart is empty.</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item, index) => (
                <div
                  key={item.id || index}
                  className="bg-white rounded-xl shadow-sm p-5 flex items-center justify-between hover:shadow-md transition"
                >
                  <div className="flex items-center gap-4">
                   <img
  src={
    item.image?.data
      ? convertImageBufferToBase64(item.image.data)
      : item.image
  }
  alt={item.name}
  className="w-24 h-24 object-contain rounded-lg bg-gray-100"
/>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                      <div className="flex items-center gap-3 mt-2">
  <button
    onClick={() => dispatch(decrementQuantity(item.id))}
    className="px-2 py-1 text-lg bg-gray-200 rounded hover:bg-gray-300"
  >
    -
  </button>
  <span className="text-md font-medium">{item.quantity}</span>
  <button
    onClick={() => dispatch(incrementQuantity(item.id))}
    className="px-2 py-1 text-lg bg-gray-200 rounded hover:bg-gray-300"
  >
    +
  </button>
</div>

                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <p className="text-md font-semibold text-gray-800">
                      ₹ {item.price * item.quantity}
                    </p>
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="text-sm text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary Panel */}
            <div className="bg-white p-6 rounded-xl shadow-md sticky top-20 h-fit">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Summary</h2>
              <div className="flex justify-between mb-4 text-gray-700">
                <span>Subtotal</span>
                <span>₹ {totalAmount}</span>
              </div>
              <hr className="mb-4" />
              <div className="flex justify-between text-lg font-semibold text-gray-900 mb-6">
                <span>Total</span>
                <span>₹ {totalAmount}</span>
              </div>
              <button
                className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
                onClick={handleCheckout} // ✅ button triggers navigation
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default CartPage;
