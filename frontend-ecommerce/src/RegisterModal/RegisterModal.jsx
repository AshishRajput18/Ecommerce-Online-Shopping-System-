import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const RegisterModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    userRole: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    mobileNo: "",
    street: "",
    city: "",
    pincode: "",
  });

  const roles = ["Admin", "Customer", "Delivery Person"];

  // 🔒 Lock body scroll when modal is open
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
      ...formData,
      userRole:
        formData.userRole === "Delivery Person"
          ? "DELIVERY_PERSON"
          : formData.userRole.toUpperCase(),
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Registration Successful 🎉",
          text: "Your account has been created successfully!",
          confirmButtonColor: "#16a34a",
        });

        onClose();
      } else {
        throw new Error("Registration failed");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed ❌",
        text: "Something went wrong. Please try again.",
        confirmButtonColor: "#dc2626",
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 relative">
        <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">
          Register User
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <select
            name="userRole"
            value={formData.userRole}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          >
            <option value="">Select Role</option>
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>

          <input
            name="firstName"
            placeholder="First Name"
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          />

          <input
            name="lastName"
            placeholder="Last Name"
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          />

          <input
            name="mobileNo"
            placeholder="Mobile No"
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />

          <input
            name="street"
            placeholder="Street"
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />

          <div className="grid grid-cols-2 gap-3">
            <input
              name="city"
              placeholder="City"
              onChange={handleChange}
              className="p-3 border rounded-lg"
            />
            <input
              name="pincode"
              placeholder="Pincode"
              onChange={handleChange}
              className="p-3 border rounded-lg"
            />
          </div>

          <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold">
            Register
          </button>
        </form>

        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-xl font-bold text-gray-600 hover:text-gray-800"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default RegisterModal;

