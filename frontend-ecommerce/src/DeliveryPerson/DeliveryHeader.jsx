import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const DeliveryHeader = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    setIsMobileMenuOpen(false);
    navigate("/", { replace: true });
  };

  return (
    <nav className="bg-white text-green-600 shadow px-3 sm:px-6 py-3">
      {/* TOP BAR */}
      <div className="flex items-center justify-between">
        {/* LEFT */}
        <div className="flex items-center gap-3">
          <span className="text-green-800 text-xl">🛒</span>
          <Link to="/" className="hover:text-green-800 font-semibold">
            Online Shopping
          </Link>

          {/* DESKTOP LINKS */}
          <div className="hidden lg:flex gap-4 text-sm ml-6">
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

        {/* DESKTOP ACTIONS */}
        <div className="hidden lg:flex gap-3 text-sm">
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

        {/* HAMBURGER */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden text-2xl"
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <div className="lg:hidden mt-4 flex flex-col gap-2 border-t pt-3 text-sm">
          <Link
            to="/delivery-dashboard/about"
            onClick={() => setIsMobileMenuOpen(false)}
            className="hover:text-green-800"
          >
            About Us
          </Link>

          <Link
            to="/delivery-dashboard/contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="hover:text-green-800"
          >
            Contact Us
          </Link>

          <Link
            to="/delivery-dashboard"
            onClick={() => setIsMobileMenuOpen(false)}
            className="hover:text-green-800 font-semibold px-3 py-2 rounded-md hover:bg-green-100"
          >
            My Deliveries
          </Link>

          <Link
            to="/delivery-dashboard/update-status"
            onClick={() => setIsMobileMenuOpen(false)}
            className="hover:text-green-800 font-semibold px-3 py-2 rounded-md hover:bg-green-100"
          >
            Update Orders
          </Link>

          <button
            onClick={handleLogout}
            className="text-left hover:text-red-600 font-semibold px-3 py-2 rounded-md hover:bg-red-100"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default DeliveryHeader;
