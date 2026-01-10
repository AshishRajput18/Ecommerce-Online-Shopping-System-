import React, { useState } from "react";

const PaymentPage = ({ total, onClose, onPaymentSuccess, userEmail }) => {
  const [formData, setFormData] = useState({
    name: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      // Call backend to place order
      const res = await fetch(
        `http://localhost:8080/api/orders/place?email=${userEmail}`,
        { method: "POST" }
      );

      if (!res.ok) throw new Error("Failed to place order");

      const order = await res.json();
      alert(`Payment processed & Order #${order.id} placed successfully!`);

      // Callback to parent
      onPaymentSuccess?.(order);
      onClose?.();
    } catch (err) {
      console.error(err);
      alert("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Details</h2>
          <p className="text-gray-600">Complete your payment securely.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
            <input
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              maxLength={19}
              placeholder="1234 5678 9012 3456"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Valid Through</label>
              <input
                type="text"
                name="expiry"
                value={formData.expiry}
                onChange={handleChange}
                placeholder="MM/YY"
                maxLength={5}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
              <input
                type="text"
                name="cvv"
                value={formData.cvv}
                onChange={handleChange}
                maxLength={4}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-lg text-lg transition duration-200 flex items-center justify-center"
          >
            {loading ? "Processing..." : `Pay ₹${total?.toLocaleString()}`}
          </button>
        </form>

        <div className="p-6 pt-0 border-t border-gray-200 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 text-gray-600 hover:text-gray-900 font-medium"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
