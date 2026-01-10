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
    <nav className="bg-white text-green-600 px-6 py-3 flex justify-between items-center shadow">
      {/* LEFT SECTION - Logo + Menu */}
      <div className="flex items-center space-x-6">
        {/* Logo */}
        <div className="flex items-center space-x-2 font-semibold text-sm">
          <span className="text-green-800">🛒</span>
          {/* ✅ Admin Home */}
          <Link to="/" className="hover:text-green-800">
            Online Shopping
          </Link>
        </div>

        {/* Menu Links */}
        <div className="hidden md:flex space-x-4 text-sm">
          <Link to="/admin-dashboard/about" className="hover:text-green-800">
            About Us
          </Link>
          <Link to="/admin-dashboard/contact" className="hover:text-green-800">
            Contact Us
          </Link>
        </div>
      </div>

      {/* RIGHT SECTION - Admin Actions */}
      <div className="hidden md:flex space-x-4 text-sm font-semibold">
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

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-2 flex flex-col space-y-2 bg-white px-4 py-2 shadow-md border-t border-gray-200">
          <Link
            to="/"
            className="hover:text-green-800"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/admin-dashboard/about"
            className="hover:text-green-800"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            About Us
          </Link>
          <Link
            to="/admin-dashboard/contact"
            className="hover:text-green-800"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Contact Us
          </Link>
          <button
            onClick={() => {
              handleLogout();
              setIsMobileMenuOpen(false);
            }}
            className="hover:text-red-600 text-left"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default AdminHeader;
