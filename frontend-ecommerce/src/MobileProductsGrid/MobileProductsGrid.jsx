import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const MobileProductsGrid = ({ categoryId }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ================= FETCH PRODUCTS ================= */
  useEffect(() => {
    if (!categoryId) return;

    const fetchProducts = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await fetch(
          `http://localhost:8080/api/products/category/${categoryId}`
        );

        if (!res.ok) throw new Error("Failed to fetch products");

        const data = await res.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Fetch products error:", err);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId]);

  /* ================= ADD TO CART ================= */
  const handleAddToCart = async (product) => {
    const email = localStorage.getItem("email");
    const role = localStorage.getItem("userRole"); // ✅ CORRECT KEY
    const token = localStorage.getItem("token");

    // 🔐 NOT LOGGED IN
    if (!email || !role || !token) {
      Swal.fire("Login Required", "Please login to continue", "warning");
      return;
    }

    // 🔐 LOGGED IN BUT NOT CUSTOMER
    if (role !== "CUSTOMER") {
      Swal.fire(
        "Access Denied",
        "Only customers can add products to cart",
        "error"
      );
      return;
    }

    // ✅ CUSTOMER FLOW
    const { value: qty } = await Swal.fire({
      title: `Quantity for ${product.title}`,
      input: "number",
      inputValue: 1,
      inputAttributes: {
        min: 1,
        max: product.quantity,
      },
      showCancelButton: true,
    });

    if (!qty) return;

    const quantity = parseInt(qty, 10);
    if (quantity <= 0 || quantity > product.quantity) {
      Swal.fire("Error", "Invalid quantity", "error");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:8080/api/cart/add?email=${email}&productId=${product.id}&quantity=${quantity}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`, // ✅ JWT ADDED
          },
        }
      );

      if (!res.ok) throw new Error("Add to cart failed");

      Swal.fire("Success", "Product added to cart", "success");

      // ✅ Update stock locally
      setProducts((prev) =>
        prev.map((p) =>
          p.id === product.id
            ? { ...p, quantity: p.quantity - quantity }
            : p
        )
      );
    } catch (err) {
      console.error("Add to cart error:", err);
      Swal.fire("Error", "Unable to add to cart", "error");
    }
  };

  /* ================= UI STATES ================= */
  if (loading) {
    return <p className="text-center mt-10">Loading products...</p>;
  }

  if (error) {
    return <p className="text-center mt-10 text-red-600">{error}</p>;
  }

  if (!products.length) {
    return <p className="text-center mt-10">No products found.</p>;
  }

  /* ================= UI ================= */
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((p) => (
        <div
          key={p.id}
          className="bg-white rounded-3xl shadow-lg border-2 border-green-500 p-5 flex flex-col"
        >
          <img
            src={p.imageUrl}
            alt={p.title}
            className="h-48 w-full object-contain rounded-2xl mb-4"
          />

          <h3 className="font-semibold text-lg mb-1">{p.title}</h3>

          <span className="text-sm text-gray-500 mb-2">
            {p.category?.name || ""}
          </span>

          <p className="text-sm text-gray-600 line-clamp-2 mb-3">
            {p.description}
          </p>

          <p className="font-bold text-green-600 text-lg mb-4">
            ₹{p.price}
          </p>

          <div className="flex justify-between items-center mt-auto">
            {/* 🔥 ALWAYS SHOW BUTTON */}
            <button
              disabled={p.quantity === 0}
              onClick={() => handleAddToCart(p)}
              className={`py-2 px-4 rounded-xl font-semibold transition ${
                p.quantity === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 text-white"
              }`}
            >
              {p.quantity === 0 ? "Out of Stock" : "Add to Cart"}
            </button>

            <span className="text-sm text-gray-700">
              Stock: {p.quantity}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MobileProductsGrid;
