import React, { useEffect, useState } from "react";
import AdminHeader from "./AdminHeader";

const AssignDelivery = () => {
  const [searchOrderId, setSearchOrderId] = useState("");
  const [order, setOrder] = useState(null);
  const [deliveryPersons, setDeliveryPersons] = useState([]);
  const [deliveryPersonEmail, setDeliveryPersonEmail] = useState("");
  const [error, setError] = useState("");

  /* ================= LOAD DELIVERY PERSONS ================= */
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/delivery-persons`)
      .then((res) => res.json())
      .then((data) => setDeliveryPersons(data)) // data should be array of objects
      .catch(() => console.error("Failed to load delivery persons"));
  }, []);

  /* ================= SEARCH ORDER ================= */
  const handleSearch = async () => {
    setError("");
    setOrder(null);

    const orderId = Number(searchOrderId);
    if (!orderId || orderId <= 0) {
      setError("Please enter a valid numeric Order ID (e.g. 1)");
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/orders/${orderId}`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      setOrder(data);
    } catch {
      setError("Order not found");
    }
  };

  /* ================= ASSIGN DELIVERY ================= */
  const handleAssign = async () => {
    if (!order?.id || !deliveryPersonEmail) {
      alert("Select a delivery person first");
      return;
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/orders/${order.id}/assign-delivery/${deliveryPersonEmail}`,
        { method: "PUT" }
      );

      if (!res.ok) throw new Error("Failed to assign delivery");

      alert("Delivery person assigned successfully");

      // update UI
      const selectedDP = deliveryPersons.find(dp => dp.email === deliveryPersonEmail);
      setOrder({ ...order, status: "ASSIGNED", deliveryPerson: selectedDP });
      setDeliveryPersonEmail("");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />

      {/* ================= SEARCH ================= */}
      <div className="p-6 bg-white shadow mb-6">
        <div className="flex gap-4 max-w-xl mx-auto">
          <input
            type="number"
            placeholder="Enter Order ID (e.g. 1)"
            value={searchOrderId}
            onChange={(e) => setSearchOrderId(e.target.value)}
            className="flex-1 px-4 py-2 border rounded"
          />
          <button
            onClick={handleSearch}
            className="bg-green-700 text-white px-6 py-2 rounded"
          >
            Search
          </button>
        </div>

        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
      </div>

      {/* ================= ORDER DETAILS ================= */}
      {order && (
        <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow mb-6">
          <h3 className="font-semibold text-lg mb-3">Order #{order.id}</h3>
          <p><b>Customer:</b> {order.user?.firstName} {order.user?.lastName}</p>
          <p><b>City:</b> {order.user?.city}</p>
          <p><b>Status:</b> {order.status}</p>
          <p><b>Total:</b> ₹{order.totalAmount}</p>

          <table className="w-full mt-4 border">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-3 py-2 text-left">Product</th>
                <th className="px-3 py-2 text-center">Qty</th>
                <th className="px-3 py-2 text-right">Price</th>
              </tr>
            </thead>
            <tbody>
              {(order.items || []).map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="px-3 py-2">{item.product?.title}</td>
                  <td className="px-3 py-2 text-center">{item.quantity}</td>
                  <td className="px-3 py-2 text-right">₹{item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <p className="mt-2">
            <b>Delivery Person:</b> {order.deliveryPerson?.firstName || "Not assigned"}
          </p>
        </div>
      )}

      {/* ================= ASSIGN DELIVERY ================= */}
      {order && (
        <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
          <h3 className="font-semibold mb-3">Assign Delivery Person</h3>

          <div className="flex gap-4">
            <select
              value={deliveryPersonEmail}
              onChange={(e) => setDeliveryPersonEmail(e.target.value)}
              className="flex-1 px-4 py-2 border rounded"
            >
              <option value="">Select Delivery Person</option>
              {deliveryPersons.map((dp) => (
                <option key={dp.email} value={dp.email}>
                  {dp.firstName} ({dp.email})
                </option>
              ))}
            </select>

            <button
              onClick={handleAssign}
              className="bg-green-700 text-white px-6 py-2 rounded"
            >
              Assign
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignDelivery;
