import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";

const Navbar = () => {
  const navigate = useNavigate();

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [userName, setUserName] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setUserName(localStorage.getItem("userName"));
    setUserRole(localStorage.getItem("userRole"));
  }, [isLoginOpen]);

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#dc2626",
      confirmButtonText: "Yes, Logout",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        setUserName(null);
        setUserRole(null);
        setIsMobileMenuOpen(false);

        Swal.fire({
          icon: "success",
          title: "Logged Out",
          timer: 1200,
          showConfirmButton: false,
        });

        navigate("/");
      }
    });
  };

  const getRoleHome = () => {
    if (userRole === "ADMIN") return "/admin-dashboard";
    if (userRole === "CUSTOMER") return "/customer-dashboard";
    if (userRole === "DELIVERY_PERSON") return "/delivery-dashboard";
    return "/";
  };

  return (
    <nav className="bg-white text-green-600 shadow px-3 sm:px-6 py-3">
      {/* TOP BAR */}
      <div className="flex items-center justify-between">
        {/* LEFT */}
        <div className="flex items-center gap-4">
          <Link
            to={getRoleHome()}
            className="font-bold text-green-800 text-lg"
          >
            🛒 Online Shopping
          </Link>

          {/* DESKTOP LINKS */}
          <div className="hidden sm:flex gap-4 text-sm sm:text-base">
            <Link to="/about" className="hover:text-green-800">
              About Us
            </Link>
            <Link to="/contact" className="hover:text-green-800">
              Contact Us
            </Link>
          </div>
        </div>

        {/* DESKTOP RIGHT */}
        <div className="hidden sm:flex gap-3 items-center">
          {userName && (
            <span className="font-semibold text-green-800">
              Welcome, {userName} 👋
            </span>
          )}

          {!userName ? (
            <>
              <button
                onClick={() => setIsRegisterOpen(true)}
                className="hover:text-green-800"
              >
                Register
              </button>
              <button
                onClick={() => setIsLoginOpen(true)}
                className="hover:text-green-800"
              >
                Login
              </button>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="hover:text-red-600 font-semibold"
            >
              Logout
            </button>
          )}
        </div>

        {/* HAMBURGER */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="sm:hidden text-2xl"
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <div className="sm:hidden mt-4 flex flex-col gap-3 border-t pt-3 text-sm">
          <Link
            to="/about"
            onClick={() => setIsMobileMenuOpen(false)}
            className="hover:text-green-800"
          >
            About Us
          </Link>

          <Link
            to="/contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="hover:text-green-800"
          >
            Contact Us
          </Link>

          {userName && (
            <span className="font-semibold text-green-800">
              Welcome, {userName} 👋
            </span>
          )}

          {!userName ? (
            <>
              <button
                onClick={() => {
                  setIsRegisterOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="text-left hover:text-green-800"
              >
                Register
              </button>
              <button
                onClick={() => {
                  setIsLoginOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="text-left hover:text-green-800"
              >
                Login
              </button>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="text-left hover:text-red-600 font-semibold"
            >
              Logout
            </button>
          )}
        </div>
      )}

      {/* MODALS */}
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
      />
    </nav>
  );
};

export default Navbar;
