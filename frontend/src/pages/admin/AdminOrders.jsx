import React, { useEffect, useState } from "react";
import axios from "../../api/axios";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/order/admin/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(res.data);
    } catch (err) {
      console.error("Admin order fetch failed:", err.response?.data || err.message);
    }
  };

  fetchOrders();
}, []);


  const toggleExpand = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Orders</h1>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="text-xs uppercase bg-gray-100 text-gray-600">
            <tr>
              <th className="px-6 py-4">Order ID</th>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Total</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <React.Fragment key={order._id}>
                <tr className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{order._id}</td>
                  <td className="px-6 py-4">{order.userId?.fullname || "N/A"}</td>
                  <td className="px-6 py-4">{order.userId?.email || "N/A"}</td>
                  <td className="px-6 py-4">{new Date(order.placedAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4">₹{order.total}</td>
                  <td className="px-6 py-4">
                    <span
  className={`px-2 py-1 rounded text-xs font-semibold ${
    order.status === "Delivered"
      ? "bg-green-100 text-green-700"
      : order.status === "Shipped"
      ? "bg-yellow-100 text-yellow-700"
      : order.status === "Cancelled"
      ? "bg-red-100 text-red-700"
      : "bg-blue-100 text-blue-700"
  }`}
>
  {
    <select
  value={order.status}
  onChange={async (e) => {
    const newStatus = e.target.value;
    try {
      await axios.patch(
  `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/order/admin/orders/${order._id}/status`,
  { status: newStatus },
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  }
);


      // Update the state to reflect the change
      setOrders((prev) =>
        prev.map((o) => (o._id === order._id ? { ...o, status: newStatus } : o))
      );
    } catch (err) {
      console.error("Status update failed", err);
      alert("Failed to update status");
    }
  }}
  className="text-sm bg-transparent border-none focus:ring focus:outline-none"
>
  <option value="Pending">Pending</option>
  <option value="Shipped">Shipped</option>
  <option value="Delivered">Delivered</option>
  <option value="Cancelled">Cancelled</option>
</select>

  }
</span>

                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      className="text-sm text-blue-500 hover:underline mr-4"
                      onClick={() => toggleExpand(order._id)}
                    >
                      {expandedOrder === order._id ? "Hide" : "View"}
                    </button>
                  </td>
                </tr>

                {/* Expanded items */}
                {expandedOrder === order._id && (
                  <tr className="border-t bg-gray-50">
                    <td colSpan="7" className="px-6 py-4">
                      <h3 className="text-sm font-semibold mb-2">Items:</h3>
                      <ul className="space-y-2">
                        {order.items.map((item, index) => (
                          <li key={index} className="flex items-center space-x-4">
                            <img
                              src={item.image}
                              alt="product"
                              className="w-12 h-12 object-cover rounded"
                            />
                            <div>
                              <p>ID: {item.id}</p>
                              <p>Quantity: {item.quantity}</p>
                              <p>Price: ₹{item.price}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}

            {orders.length === 0 && (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
