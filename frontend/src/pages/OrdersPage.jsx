import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

function OrdersPage() {
  const mockOrders = [
    {
      id: "ORD12345",
      date: "2024-06-10",
      status: "Delivered",
      total: 2999,
      items: 2,
    },
    {
      id: "ORD12346",
      date: "2024-06-12",
      status: "Shipped",
      total: 1299,
      items: 1,
    },
  ];

  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto px-6 py-20 min-h-screen bg-white-50">
        <h1 className="text-3xl font-semibold mb-8 text-gray-800">My Orders</h1>

        <div className="space-y-6">
          {mockOrders.map((order) => (
            <div key={order.id} className="p-6 bg-white rounded-lg shadow">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold">Order #{order.id}</h2>
                  <p className="text-sm text-gray-500">Date: {order.date}</p>
                  <p className="text-sm text-gray-500">Items: {order.items}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">₹ {order.total}</p>
                  <p className={`text-sm font-semibold ${order.status === "Delivered" ? "text-green-600" : "text-yellow-500"}`}>
                    {order.status}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default OrdersPage;
