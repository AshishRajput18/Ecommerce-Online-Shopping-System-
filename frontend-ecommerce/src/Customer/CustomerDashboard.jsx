import React, { useEffect, useState } from "react";
import CustomerHeader from "./CustomerHeader";
import AdminDashboard from "../Admin/AdminDashboard";
import PaymentPage from "./PaymentPage";

const CustomerDashboard = () => {
  const [showPayment, setShowPayment] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [refreshCart, setRefreshCart] = useState(false);

  const userEmail = localStorage.getItem("email");
  const userRole = localStorage.getItem("userRole");

  useEffect(() => {
    if (!userEmail || userRole !== "CUSTOMER") {
      console.warn("Customer not logged in");
    }
  }, [userEmail, userRole]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-lime-50">
      <CustomerHeader />

      {/* My Cart Bar */}
      <div className="w-full bg-green-800 text-white py-4 flex justify-center">
        <h2 className="text-2xl font-bold">My Cart</h2>
      </div>

      {/* CART TABLE */}
      <AdminDashboard
        viewType="customer"
        showHeader={false}
        userEmail={userEmail}
        onTotal={setTotalAmount}
        key={refreshCart} // refresh after order
      />

      {/* CHECKOUT */}
      {totalAmount > 0 && (
        <div className="flex justify-end px-6 py-4">
          <button
            onClick={() => setShowPayment(true)}
            className="bg-green-700 text-white px-6 py-2 rounded font-semibold"
          >
            Checkout ₹{totalAmount.toLocaleString()}
          </button>
        </div>
      )}

      {showPayment && (
        <PaymentPage
          total={totalAmount}
          userEmail={userEmail}
          onClose={() => setShowPayment(false)}
          onPaymentSuccess={() => {
            setShowPayment(false);
            setRefreshCart((prev) => !prev); // refresh cart
          }}
        />
      )}
    </div>
  );
};

export default CustomerDashboard;
