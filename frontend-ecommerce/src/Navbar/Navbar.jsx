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

  // 🔄 Load user info
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
    <nav className="bg-white text-green-600 px-6 py-3 shadow flex items-center justify-between">
      
      {/* LEFT */}
      <div className="flex items-center space-x-6">
        <Link to={getRoleHome()} className="font-bold text-green-800">
          🛒 Online Shopping
        </Link>

        <Link to="/about" className="hover:text-green-800">About Us</Link>
        <Link to="/contact" className="hover:text-green-800">Contact Us</Link>
      </div>

      {/* CENTER */}
      {userName && (
        <div className="font-semibold text-green-800">
          Welcome, {userName} 👋
        </div>
      )}

      {/* RIGHT */}
      <div className="flex space-x-4">
        {!userName ? (
          <>
            <button onClick={() => setIsRegisterOpen(true)}>Register</button>
            <button onClick={() => setIsLoginOpen(true)}>Login</button>
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

      {/* MODALS */}
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      <RegisterModal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />
    </nav>
  );
};

export default Navbar;
