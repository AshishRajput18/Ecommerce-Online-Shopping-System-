// src/Admin/AddCategory.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminHeader from "./AdminHeader";

const AddCategory = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // 🔧 DEV ONLY: set default role if not present
  useEffect(() => {
    if (!localStorage.getItem("userRole")) {
      localStorage.setItem("userRole", "ADMIN");
    }
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return; // prevent double submission
    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Failed to add category");
      }

      setSuccess(true);

      // Redirect to admin dashboard after a short delay
      setTimeout(() => {
        navigate("/admin-dashboard");
      }, 1200);
    } catch (error) {
      console.error(error);
      alert("❌ Error adding category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />

      {/* Page Header */}
      <div className="w-full bg-green-800 text-white py-4 shadow-md flex justify-center items-center">
        <h2 className="text-2xl md:text-3xl font-bold">Add Category</h2>
      </div>

      {/* Form Container */}
      <div className="max-w-2xl mx-auto p-6 mt-6 bg-white shadow-lg rounded-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Category Name */}
          <div>
            <label className="block text-green-800 font-semibold mb-2">
              Category Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter category name"
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-300 focus:outline-none"
              required
            />
          </div>

          {/* Category Description */}
          <div>
            <label className="block text-green-800 font-semibold mb-2">
              Category Description
            </label>
            <textarea
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter description"
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-300 focus:outline-none resize-none"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-bold text-white transition ${
              loading
                ? "bg-green-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading
              ? "Adding..."
              : success
              ? "✅ Added Successfully!"
              : "Add Category"}
          </button>
        </form>

        {/* Back Button */}
        <div className="mt-4 text-center">
          <button
            onClick={() => navigate("/admin-dashboard")}
            className="text-green-700 hover:text-green-800 font-semibold text-sm underline"
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
