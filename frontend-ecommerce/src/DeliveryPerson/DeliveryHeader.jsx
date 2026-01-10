import React from "react";
import { Link, useNavigate } from "react-router-dom";

const DeliveryHeader = () => {
  const navigate = useNavigate();
  

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    navigate("/", { replace: true });
  };

  return (
    <nav className="bg-white text-green-600 px-6 py-3 flex justify-between items-center shadow">
      {/* LEFT - Logo + Links */}
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2 font-semibold text-sm">
          <span className="text-green-800 text-xl">🛒</span>
          {/* 🔹 FIXED: Link to public home page */}
          <Link
            to="/"
            className="hover:text-green-800 font-semibold"
          >
            Online Shopping
          </Link>
        </div>

        <div className="flex space-x-4 text-sm">
          <Link to="/delivery-dashboard/about" className="hover:text-green-800">
            About Us
          </Link>
          <Link to="/delivery-dashboard/contact" className="hover:text-green-800">
            Contact Us
          </Link>
        </div>
      </div>



      {/* RIGHT - Actions */}
      <div className="flex space-x-4 text-sm">
        <Link
          to="/delivery-dashboard"
          className="hover:text-green-800 font-semibold px-4 py-2 rounded-md hover:bg-green-100 transition-all"
        >
          My Deliveries
        </Link>
        <Link
          to="/delivery-dashboard/update-status"
          className="hover:text-green-800 font-semibold px-4 py-2 rounded-md hover:bg-green-100 transition-all"
        >
          Update Orders
        </Link>
        <button
          onClick={handleLogout}
          className="hover:text-red-600 font-semibold px-4 py-2 rounded-md hover:bg-red-100 transition-all"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default DeliveryHeader;
