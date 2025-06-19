import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/order/order", {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto px-6 py-20 min-h-screen bg-white-50">
        <h1 className="text-3xl font-semibold mb-8 text-gray-800">My Orders</h1>

        {loading ? (
          <p className="text-gray-600">Loading orders...</p>
        ) : orders.length === 0 ? (
          <p className="text-gray-600">You haven’t placed any orders yet.</p>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order._id} className="p-6 bg-white rounded-lg shadow">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-semibold">Order #{order._id.slice(-6).toUpperCase()}</h2>
                    <p className="text-sm text-gray-500">Date: {new Date(order.createdAt).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })}</p>
                    <p className="text-sm text-gray-500">Items: {order.items.length}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">₹ {order.total}</p>
                    <p className="text-sm font-semibold text-blue-500">Placed</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default OrdersPage;
