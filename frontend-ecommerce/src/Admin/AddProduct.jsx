import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminHeader from "./AdminHeader";

const AddProduct = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    categoryId: "", // flat category ID
    quantity: "",
    price: "",
    imageFile: null,
  });
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Fetch categories
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/categories");
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "imageFile") {
      const file = files[0];
      setFormData({ ...formData, imageFile: file });

      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => setPreview(reader.result);
        reader.readAsDataURL(file);
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate image upload
      let imageUrl = preview || "";

      const payload = {
        title: formData.title,
        description: formData.description,
        price: parseFloat(formData.price),
        quantity: parseInt(formData.quantity),
        imageUrl: imageUrl,
        categoryId: parseInt(formData.categoryId), // <--- important
      };

      const res = await fetch("http://localhost:8080/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to add product");

      setSuccess(true);

      setTimeout(() => {
        navigate("/admin-dashboard");
      }, 1200);
    } catch (err) {
      console.error(err);
      alert("❌ Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />

      <div className="w-full bg-green-800 text-white py-4 shadow-md flex justify-center items-center">
        <h2 className="text-2xl md:text-3xl font-bold">Add Product</h2>
      </div>

      <div className="max-w-2xl mx-auto p-6 mt-6 bg-white shadow-lg rounded-xl">
        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block text-green-800 font-semibold mb-1">Product Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter product title"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-300"
              required
            />
          </div>

          <div>
            <label className="block text-green-800 font-semibold mb-1">Product Description</label>
            <textarea
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter description"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-300 resize-none"
              required
            />
          </div>

          <div>
            <label className="block text-green-800 font-semibold mb-1">Category</label>
            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-300"
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-green-800 font-semibold mb-1">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="Enter quantity"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-300"
              min="1"
              required
            />
          </div>

          <div>
            <label className="block text-green-800 font-semibold mb-1">Price (₹)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-300"
              min="0"
              step="0.01"
              required
            />
          </div>

          <div>
            <label className="block text-green-800 font-semibold mb-1">Product Image</label>
            <input
              type="file"
              name="imageFile"
              onChange={handleChange}
              accept="image/*"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-300"
              required
            />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-2 w-32 h-32 object-cover rounded-lg border"
              />
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition disabled:bg-green-400"
          >
            {loading ? "Adding..." : success ? "✅ Product Added!" : "Add Product"}
          </button>
        </form>

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

export default AddProduct;
