import React, { useEffect, useState } from "react";
import CustomerHeader from "./CustomerHeader";

const CustomerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const email = localStorage.getItem("email");
  const role = localStorage.getItem("userRole");
  const token = localStorage.getItem("token");

  /* ================= SECURITY CHECK ================= */
  useEffect(() => {
    if (!token) {
      alert("Please login first ❌");
      window.location.href = "/login";
      return;
    }

    if (role !== "CUSTOMER") {
      alert("Unauthorized access ❌");
      window.location.href = "/";
    }
  }, [role, token]);

  /* ================= FETCH CUSTOMER ORDERS ================= */
  useEffect(() => {
    if (!email || !token) {
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/orders/user/${email}`,
          {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (res.status === 403) {
          throw new Error("Access denied (403). Please login again.");
        }

        if (!res.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await res.json();
        setOrders(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setError(err.message);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [email, token]);

  /* ================= FORMAT DATE ================= */
  const formatDate = (dateString) => {
    if (!dateString) return "—";
    return new Date(dateString).toLocaleString();
  };

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="text-center p-10 text-lg font-semibold">
        Loading orders...
      </div>
    );
  }

  /* ================= ERROR ================= */
  if (error) {
    return (
      <div className="text-center p-10 text-red-600 font-semibold">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <CustomerHeader />

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
            className="bg-white p-5 mb-6 rounded-xl shadow-md border"
          >
            {/* HEADER */}
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-lg">
                Order #{order.id}
              </h3>

              <div className="flex gap-2">
                <span className="px-3 py-1 text-sm rounded bg-yellow-100 text-yellow-800">
                  {order.status}
                </span>

                <span className="px-3 py-1 text-sm rounded bg-green-100 text-green-800">
                  {order.deliveryStatus || "NOT SHIPPED"}
                </span>
              </div>
            </div>

            {/* DELIVERY INFO */}
            {order.deliveryPerson && (
              <p className="text-sm text-gray-600">
                <b>Delivery Person:</b>{" "}
                {order.deliveryPerson.firstName}
              </p>
            )}

            {order.deliveryDate && (
              <p className="text-sm text-gray-600">
                <b>
                  {order.deliveryStatus === "PICKED_UP" && "Picked Up at:"}
                  {order.deliveryStatus === "OUT_FOR_DELIVERY" && "Out For Delivery at:"}
                  {order.deliveryStatus === "DELIVERED" && "Delivered on:"}
                </b>{" "}
                {formatDate(order.deliveryDate)}
              </p>
            )}

            {/* ITEMS */}
            <ul className="mt-4 text-sm space-y-1">
              {order.items?.map((item) => (
                <li key={item.id}>
                  {item.product?.title} × {item.quantity} — ₹
                  {item.product?.price * item.quantity}
                </li>
              ))}
            </ul>

            {/* TOTAL */}
            <p className="text-right font-semibold mt-4 text-green-700">
              Total: ₹{order.totalAmount}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerOrders;
