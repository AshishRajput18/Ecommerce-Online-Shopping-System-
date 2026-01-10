import React, { useEffect, useState } from "react";
import DeliveryHeader from "./DeliveryHeader";

const DeliveryDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const email = localStorage.getItem("email");
  const role = localStorage.getItem("userRole");

  /* ================= SECURITY CHECK ================= */
  useEffect(() => {
    if (role !== "DELIVERY_PERSON") {
      alert("Unauthorized access");
      window.location.href = "/";
    }
  }, [role]);

  /* ================= FETCH ASSIGNED ORDERS ================= */
  useEffect(() => {
    if (!email) {
      setLoading(false);
      return;
    }

    fetch(`http://localhost:8080/api/orders/delivery/${email}`)
      .then((res) => res.json())
      .then((data) => setOrders(Array.isArray(data) ? data : []))
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, [email]);

  /* ================= UPDATE DELIVERY STATUS ================= */
  const updateStatus = async (orderId, status) => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/orders/${orderId}/delivery-status`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            status: status.toUpperCase().replaceAll(" ", "_"),
          }),
        }
      );

      if (!res.ok) throw new Error("Update failed");

      // ✅ update UI
      setOrders((prev) =>
        prev.map((o) =>
          o.id === orderId
            ? { ...o, deliveryStatus: status }
            : o
        )
      );
    } catch (err) {
      alert("Failed to update status");
    }
  };

  if (loading) {
    return <div className="text-center p-10">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DeliveryHeader />

      <div className="p-6 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">
          My Assigned Deliveries
        </h2>

        {orders.length === 0 && (
          <p className="text-gray-600 text-center">
            No deliveries assigned
          </p>
        )}

        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white p-5 mb-6 rounded shadow"
          >
            <div className="flex justify-between mb-2">
              <h3 className="font-semibold">
                Order #{order.id}
              </h3>
              <span className="text-green-700 font-semibold">
                {order.deliveryStatus || "PENDING"}
              </span>
            </div>

            <p><b>Name:</b> {order.user?.firstName}</p>
            <p><b>City:</b> {order.user?.city}</p>

           {order.deliveryPerson && (
              <p className="text-sm text-gray-600">
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


            <ul className="mt-2 text-sm">
              {order.items?.map((i) => (
                <li key={i.id}>
                  {i.product?.title} × {i.quantity}
                </li>
              ))}
            </ul>


          </div>
        ))}
      </div>
    </div>
  );
};

export default DeliveryDashboard;
