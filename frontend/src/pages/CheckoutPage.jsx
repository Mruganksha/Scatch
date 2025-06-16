import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LocationPicker from '../components/LocationPicker';

function CheckoutPage() {
  const cartItems = useSelector((state) => state.cart.items);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
  };

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = (e) => {
    e.preventDefault(); // prevent default form submission
    if (!selectedLocation) {
      alert('Please select a delivery location on the map.');
      return;
    }

    console.log('Order placed at location:', selectedLocation);
    alert('Order placed successfully!');
    // Add API submission or navigation here
  };

  return (
    <>
      <Header />

      <div className="px-6 md:px-20 py-16 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold mb-10 text-gray-800">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Form Section */}
          <form
            className="lg:col-span-2 bg-white p-8 rounded-xl shadow-sm space-y-6"
            onSubmit={handlePlaceOrder}
          >
            <h2 className="text-xl font-semibold text-gray-700">Billing Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="First Name" required className="input" />
              <input type="text" placeholder="Last Name" required className="input" />
              <input type="email" placeholder="Email" required className="input" />
              <input type="tel" placeholder="Phone" required className="input" />
            </div>

            <input type="text" placeholder="Address Line 1" required className="input w-full" />
            <input type="text" placeholder="Address Line 2" className="input w-full" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input type="text" placeholder="City" required className="input" />
              <input type="text" placeholder="State" required className="input" />
              <input type="text" placeholder="ZIP Code" required className="input" />
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">Delivery Location</h3>
              <LocationPicker onLocationSelect={handleLocationSelect} />
              {selectedLocation && (
                <div className="text-sm text-green-600 mt-2">
                  📍 Selected: {selectedLocation.lat.toFixed(4)}, {selectedLocation.lng.toFixed(4)}
                </div>
              )}
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

          {/* Cart Summary */}
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
