import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';

function CheckoutPage() {
  const cartItems = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.auth?.user); // Safe access in case undefined

  const [billingData, setBillingData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
  });

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    const {
      firstName,
      lastName,
      email,
      phone,
      address1,
      address2,
      city,
      state,
      zip,
    } = billingData;

    const billingDetails = {
      firstName,
      lastName,
      email,
      phone,
      address1,
      address2,
      city,
      state,
      zip,
    };

    try {
    const token = localStorage.getItem("token");

    // ✅ Define the orderData here — adapt this to your actual cart/order state
    const orderData = {
      items: cartItems, // <-- this should be from your state or props
      total: totalAmount,
      billingDetails: billingDetails // <-- you might have this logic already
    };
    console.log("Token:", token);

    const response = await axios.post("http://localhost:5000/api/order", orderData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      }
    });

    alert("Order placed successfully!");
  } catch (err) {
    console.error("Error placing order:", err);
    alert("Failed to place order.");
  }
  };

  return (
    <>
      <Header />

      <div className="px-6 md:px-20 py-16 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold mb-10 text-gray-800">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Billing Form */}
          <form
            className="lg:col-span-2 bg-white p-8 rounded-xl shadow-sm space-y-6"
            onSubmit={handlePlaceOrder}
          >
            <h2 className="text-xl font-semibold text-gray-700">Billing Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="First Name" required className="input"
                value={billingData.firstName}
                onChange={(e) => setBillingData({ ...billingData, firstName: e.target.value })}
              />
              <input type="text" placeholder="Last Name" required className="input"
                value={billingData.lastName}
                onChange={(e) => setBillingData({ ...billingData, lastName: e.target.value })}
              />
              <input type="email" placeholder="Email" required className="input"
                value={billingData.email}
                onChange={(e) => setBillingData({ ...billingData, email: e.target.value })}
              />
              <input type="tel" placeholder="Phone" required className="input"
                value={billingData.phone}
                onChange={(e) => setBillingData({ ...billingData, phone: e.target.value })}
              />
            </div>

            <input type="text" placeholder="Address Line 1" required className="input w-full"
              value={billingData.address1}
              onChange={(e) => setBillingData({ ...billingData, address1: e.target.value })}
            />
            <input type="text" placeholder="Address Line 2" className="input w-full"
              value={billingData.address2}
              onChange={(e) => setBillingData({ ...billingData, address2: e.target.value })}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input type="text" placeholder="City" required className="input"
                value={billingData.city}
                onChange={(e) => setBillingData({ ...billingData, city: e.target.value })}
              />
              <input type="text" placeholder="State" required className="input"
                value={billingData.state}
                onChange={(e) => setBillingData({ ...billingData, state: e.target.value })}
              />
              <input type="text" placeholder="ZIP Code" required className="input"
                value={billingData.zip}
                onChange={(e) => setBillingData({ ...billingData, zip: e.target.value })}
              />
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
              >
                Place Order
              </button>
            </div>
          </form>

          {/* Order Summary */}
          <div className="bg-white p-6 rounded-xl shadow-md h-fit">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Order Summary</h2>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between text-sm text-gray-700">
                  <span>{item.name} × {item.quantity}</span>
                  <span>₹ {item.price * item.quantity}</span>
                </div>
              ))}
              <hr />
              <div className="flex justify-between font-semibold text-lg text-gray-900">
                <span>Total</span>
                <span>₹ {totalAmount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}


export default CheckoutPage;
