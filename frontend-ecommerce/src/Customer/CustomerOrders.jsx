import React, { useEffect, useState } from "react";
import CustomerHeader from "./CustomerHeader";

const CustomerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const email = localStorage.getItem("email");
  const role = localStorage.getItem("userRole");

  /* ================= SECURITY CHECK ================= */
  useEffect(() => {
    if (role !== "CUSTOMER") {
      alert("Unauthorized access ❌");
      window.location.href = "/";
    }
  }, [role]);

  /* ================= FETCH CUSTOMER ORDERS ================= */
  useEffect(() => {
    if (!email) {
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/orders/user/${email}`);
        if (!res.ok) throw new Error("Failed to fetch orders");
        const data = await res.json();
        setOrders(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [email]);

  /* ================= FORMAT DATE ================= */
  const formatDate = (dateString) => {
    if (!dateString) return "—";
    return new Date(dateString).toLocaleString();
  };

  if (loading) {
    return <div className="text-center p-10">Loading orders...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
     

      <div className="p-6 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">My Orders</h2>

        {orders.length === 0 && (
          <p className="text-gray-600 text-center">
            You have not placed any orders yet
          </p>
        )}

        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white p-5 mb-6 rounded-xl shadow-md border border-gray-200"
          >
            {/* HEADER */}
            <div className="flex justify-between mb-3 items-center">
              <h3 className="font-semibold">Order #{order.id}</h3>
              <div className="flex gap-2 items-center">
                <span className="text-sm px-3 py-1 rounded bg-yellow-100 text-yellow-800">
                  {order.status}
                </span>
                <span className="text-sm px-3 py-1 rounded bg-green-100 text-green-800">
                  {order.deliveryStatus || "NOT SHIPPED"}
                </span>
              </div>
            </div>

            {/* DELIVERY INFO */}
            {order.deliveryPerson && (
              <p className="text-sm text-gray-600 mb-1">
                <b>Delivery Person:</b> {order.deliveryPerson.firstName}
              </p>
            )}
            {order.deliveryDate && (
  <p className="text-sm text-gray-600">
    <b>
      {order.deliveryStatus === "PICKED_UP" && "Picked Up at:"}
      {order.deliveryStatus === "OUT_FOR_DELIVERY" && "Out For Delivery at:"}
      {order.deliveryStatus === "DELIVERED" && "Delivered on:"}
    </b>{" "}
    {new Date(order.deliveryDate).toLocaleString()}
  </p>
)}


           

            {/* ITEMS */}
            <ul className="mt-3 text-sm space-y-1">
              {order.items?.map((item) => (
                <li key={item.id}>
                  {item.product?.title} × {item.quantity} — ₹
                  {item.product?.price * item.quantity}
                </li>
              ))}
            </ul>

            {/* TOTAL */}
            <p className="text-right font-semibold mt-3 text-green-700">
              Total: ₹{order.totalAmount}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerOrders;
