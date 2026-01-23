import React from "react";
import { Link, useNavigate } from "react-router-dom";

const DeliveryHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    navigate("/", { replace: true });
  };

  return (
    <nav className="bg-white text-green-600 shadow px-3 sm:px-6 py-3">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">

        {/* LEFT - Logo + Links */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
          <div className="flex items-center gap-2 font-semibold text-sm">
            <span className="text-green-800 text-xl">🛒</span>
            <Link
              to="/"
              className="hover:text-green-800 font-semibold"
            >
              Online Shopping
            </Link>
          </div>

          <div className="flex gap-4 text-sm">
            <Link
              to="/delivery-dashboard/about"
              className="hover:text-green-800"
            >
              About Us
            </Link>
            <Link
              to="/delivery-dashboard/contact"
              className="hover:text-green-800"
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* RIGHT - Actions */}
        <div className="flex flex-wrap gap-2 sm:gap-3 text-sm justify-start lg:justify-end">
          <Link
            to="/delivery-dashboard"
            className="hover:text-green-800 font-semibold px-3 py-2 rounded-md hover:bg-green-100 transition-all"
          >
            My Deliveries
          </Link>

          <Link
            to="/delivery-dashboard/update-status"
            className="hover:text-green-800 font-semibold px-3 py-2 rounded-md hover:bg-green-100 transition-all"
          >
            Update Orders
          </Link>

          <button
            onClick={handleLogout}
            className="hover:text-red-600 font-semibold px-3 py-2 rounded-md hover:bg-red-100 transition-all"
          >
            Logout
          </button>
        </div>

      </div>
    </nav>
  );
};

export default DeliveryHeader;
