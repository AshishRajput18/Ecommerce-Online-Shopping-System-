import React from "react";
import { Link, useNavigate } from "react-router-dom";

const CustomerHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("email");
    navigate("/", { replace: true });
  };

  return (
    <nav className="bg-white text-green-600 px-6 py-3 flex justify-between items-center shadow">
      {/* LEFT - Logo + Links */}
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2 font-semibold text-sm">
          <span className="text-green-800 text-xl">🛒</span>
          <Link to="/" className="hover:text-green-800 font-semibold">
            Online Shopping
          </Link>
        </div>

        <div className="flex space-x-4 text-sm">
          <Link to="/customer-dashboard/about" className="hover:text-green-800">
            About Us
          </Link>
          <Link to="/customer-dashboard/contact" className="hover:text-green-800">
            Contact Us
          </Link>
        </div>
      </div>

      {/* RIGHT - Actions */}
      <div className="flex space-x-4 text-sm">
        <Link
          to="/customer-dashboard"
          className="hover:text-green-800 font-semibold px-4 py-2 rounded-md hover:bg-green-100"
        >
          My Cart
        </Link>
        <Link
          to="/customer-dashboard/my-orders"
          className="hover:text-green-800 font-semibold px-4 py-2 rounded-md hover:bg-green-100"
        >
          My Orders
        </Link>

         <Link
          to="/customer-dashboard/my-profile"
          className="hover:text-green-800 font-semibold px-4 py-2 rounded-md hover:bg-green-100"
        >
          My Profile
        </Link>

        <button
          onClick={handleLogout}
          className="hover:text-red-600 font-semibold px-4 py-2 rounded-md hover:bg-red-100"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default CustomerHeader;
