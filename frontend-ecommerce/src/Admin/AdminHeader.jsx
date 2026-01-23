import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminHeader = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    navigate("/", { replace: true });
  };

  return (
    <nav className="bg-white text-green-600 shadow px-3 sm:px-6 py-3">
      <div className="flex items-center justify-between">

        {/* LEFT SECTION */}
        <div className="flex items-center gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2 font-semibold text-sm">
            <span className="text-green-800 text-xl">🛒</span>
            <Link to="/" className="hover:text-green-800">
              Online Shopping
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-4 text-sm">
            <Link to="/admin-dashboard/about" className="hover:text-green-800">
              About Us
            </Link>
            <Link to="/admin-dashboard/contact" className="hover:text-green-800">
              Contact Us
            </Link>
          </div>
        </div>

        {/* RIGHT SECTION - Desktop Actions */}
        <div className="hidden md:flex gap-4 text-sm font-semibold">
          <Link to="/admin-dashboard/add-category" className="hover:text-green-800">
            Add Category
          </Link>
          <Link to="/admin-dashboard/add-product" className="hover:text-green-800">
            Add Product
          </Link>
          <Link to="/admin-dashboard" className="hover:text-green-800">
            All Orders
          </Link>
          <Link
            to="/admin-dashboard/assign-delivery"
            className="hover:text-green-800"
          >
            Assign Delivery
          </Link>
          <button onClick={handleLogout} className="hover:text-red-600">
            Logout
          </button>
        </div>

        {/* MOBILE HAMBURGER */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-2xl focus:outline-none"
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-3 flex flex-col gap-2 bg-white px-4 py-3 shadow-md border-t border-gray-200 text-sm">
          <Link
            to="/admin-dashboard"
            onClick={() => setIsMobileMenuOpen(false)}
            className="hover:text-green-800"
          >
            All Orders
          </Link>
          <Link
            to="/admin-dashboard/add-category"
            onClick={() => setIsMobileMenuOpen(false)}
            className="hover:text-green-800"
          >
            Add Category
          </Link>
          <Link
            to="/admin-dashboard/add-product"
            onClick={() => setIsMobileMenuOpen(false)}
            className="hover:text-green-800"
          >
            Add Product
          </Link>
          <Link
            to="/admin-dashboard/assign-delivery"
            onClick={() => setIsMobileMenuOpen(false)}
            className="hover:text-green-800"
          >
            Assign Delivery
          </Link>
          <Link
            to="/admin-dashboard/about"
            onClick={() => setIsMobileMenuOpen(false)}
            className="hover:text-green-800"
          >
            About Us
          </Link>
          <Link
            to="/admin-dashboard/contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="hover:text-green-800"
          >
            Contact Us
          </Link>
          <button
            onClick={() => {
              handleLogout();
              setIsMobileMenuOpen(false);
            }}
            className="hover:text-red-600 text-left font-semibold"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default AdminHeader;
