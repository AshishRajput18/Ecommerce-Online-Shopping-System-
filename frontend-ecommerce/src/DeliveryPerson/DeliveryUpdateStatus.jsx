import React, { useEffect, useState } from "react";
import DeliveryHeader from "./DeliveryHeader";

const DeliveryUpdateStatus = () => {
  const [orderId, setOrderId] = useState("");
  const [status, setStatus] = useState("");
  const [assignedEmail, setAssignedEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const deliveryEmail = localStorage.getItem("email");
  const role = localStorage.getItem("userRole");

  /* ================= SECURITY CHECK ================= */
  useEffect(() => {
    if (role !== "DELIVERY_PERSON") {
      alert("Unauthorized access ❌");
      window.location.href = "/";
    }
  }, [role]);

  /* ================= FETCH ORDER ================= */
  const fetchOrder = async () => {
    if (!orderId) {
      alert("Please enter Order ID");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`http://localhost:8080/api/orders/${orderId}`);

      if (!res.ok) throw new Error("Order not found");

      const data = await res.json();

      if (!data.deliveryPerson) {
        alert("Delivery person not assigned yet ❌");
        setAssignedEmail("");
        return;
      }

      setAssignedEmail(data.deliveryPerson.email);
    } catch (err) {
      alert(err.message);
      setAssignedEmail("");
    } finally {
      setLoading(false);
    }
  };

  /* ================= UPDATE STATUS ================= */
  const updateStatus = async () => {
    if (!orderId || !status) {
      alert("Please enter Order ID and select status");
      return;
    }

    if (deliveryEmail !== assignedEmail) {
      alert("You are not assigned to this order ❌");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `http://localhost:8080/api/orders/${orderId}/delivery-status?email=${deliveryEmail}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            status: status.toUpperCase().replaceAll(" ", "_"),
          }),
        }
      );

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Status update failed");
      }

      alert("Delivery status updated successfully ✅");

      // Reset form
      setOrderId("");
      setStatus("");
      setAssignedEmail("");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DeliveryHeader />

      <div className="p-6 max-w-xl mx-auto bg-white shadow rounded">
        <h2 className="text-xl font-semibold mb-4">
          Update Delivery Status
        </h2>

        {/* Order ID Input */}
        <input
          type="number"
          placeholder="Order ID"
          className="border w-full mb-3 px-3 py-2 rounded"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          disabled={loading}
        />

        {/* Fetch Assigned Order Button */}
        <button
          onClick={fetchOrder}
          disabled={loading || !orderId}
          className="bg-blue-700 text-white px-4 py-2 rounded mb-3 disabled:opacity-50"
        >
          {loading ? "Fetching..." : "Fetch Assigned Order"}
        </button>

        {/* Assigned Delivery Person */}
        {assignedEmail && (
          <p className="mb-3 text-sm">
            Assigned to: <b>{assignedEmail}</b>
          </p>
        )}

        {/* Status Select */}
        <select
          className="border w-full mb-4 px-3 py-2 rounded"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          disabled={!assignedEmail || loading}
        >
          <option value="">Select Status</option>
          <option value="Picked Up">Picked Up</option>
          <option value="Out For Delivery">Out For Delivery</option>
          <option value="Delivered">Delivered</option>
        </select>

        {/* Update Status Button */}
        <button
          onClick={updateStatus}
          disabled={!assignedEmail || !status || loading}
          className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update Status"}
        </button>
      </div>
    </div>
  );
};

export default DeliveryUpdateStatus;
