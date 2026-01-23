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
    <nav className="bg-white text-green-600 shadow px-3 sm:px-6 py-3">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

        {/* TOP / LEFT */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
          <Link
            to={getRoleHome()}
            className="font-bold text-green-800 text-lg"
          >
            🛒 Online Shopping
          </Link>

          <div className="flex gap-4 text-sm sm:text-base">
            <Link to="/about" className="hover:text-green-800">
              About Us
            </Link>
            <Link to="/contact" className="hover:text-green-800">
              Contact Us
            </Link>
          </div>
        </div>

        {/* CENTER */}
        {userName && (
          <div className="font-semibold text-green-800 text-sm sm:text-base text-center">
            Welcome, {userName} 👋
          </div>
        )}

        {/* RIGHT */}
        <div className="flex gap-3 justify-center sm:justify-end">
          {!userName ? (
            <>
              <button
                onClick={() => setIsRegisterOpen(true)}
                className="text-sm sm:text-base hover:text-green-800"
              >
                Register
              </button>
              <button
                onClick={() => setIsLoginOpen(true)}
                className="text-sm sm:text-base hover:text-green-800"
              >
                Login
              </button>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="text-sm sm:text-base hover:text-red-600 font-semibold"
            >
              Logout
            </button>
          )}
        </div>

      </div>

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
