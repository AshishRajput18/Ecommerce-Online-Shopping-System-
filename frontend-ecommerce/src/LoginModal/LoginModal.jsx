import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const LoginModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userRole: "",
    email: "",
    password: "",
  });

  const roles = ["Admin", "Customer", "Delivery Person"];

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [isOpen]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      email: formData.email,
      password: formData.password,
      userRole:
        formData.userRole === "Delivery Person"
          ? "DELIVERY_PERSON"
          : formData.userRole.toUpperCase(),
    };

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Invalid credentials");

      const data = await response.json();

      // ✅ STORE LOGIN DATA
      localStorage.setItem("token", data.token);
      localStorage.setItem("userRole", payload.userRole);
      localStorage.setItem("email", formData.email); // ✅ CORRECT EMAIL

      Swal.fire({
        icon: "success",
        title: "Login Successful 🎉",
        confirmButtonColor: "#16a34a",
      });

      onClose();

      setTimeout(() => {
        navigate("/"); // redirect to home
      }, 500);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed ❌",
        text: "Invalid email or password",
        confirmButtonColor: "#dc2626",
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl p-6">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-xl font-bold text-gray-600"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <select
            name="userRole"
            value={formData.userRole}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          >
            <option value="">Select User Role</option>
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          />

          <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
