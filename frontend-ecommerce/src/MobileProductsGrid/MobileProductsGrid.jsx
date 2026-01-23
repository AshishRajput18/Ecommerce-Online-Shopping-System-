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
          `${import.meta.env.VITE_API_URL}/api/products/category/${categoryId}`
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
    const role = localStorage.getItem("userRole");
    const token = localStorage.getItem("token");

    if (!email || !role || !token) {
      Swal.fire("Login Required", "Please login to continue", "warning");
      return;
    }

    if (role !== "CUSTOMER") {
      Swal.fire(
        "Access Denied",
        "Only customers can add products to cart",
        "error"
      );
      return;
    }

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
        `${import.meta.env.VITE_API_URL}/api/cart/add?email=${email}&productId=${product.id}&quantity=${quantity}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Add to cart failed");

      Swal.fire("Success", "Product added to cart", "success");

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
    return <p className="text-center mt-6">Loading products...</p>;
  }

  if (error) {
    return <p className="text-center mt-6 text-red-600">{error}</p>;
  }

  if (!products.length) {
    return <p className="text-center mt-6">No products found.</p>;
  }

  /* ================= UI ================= */
  return (
    <div className="px-3 sm:px-4 md:px-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-2xl shadow-md border border-green-500 p-4 flex flex-col h-full"
          >
            <img
              src={p.imageUrl}
              alt={p.title}
              className="h-36 sm:h-40 md:h-44 w-full object-contain rounded-xl mb-3"
            />

            <h3 className="font-semibold text-sm sm:text-base mb-1 line-clamp-1">
              {p.title}
            </h3>

            <span className="text-xs text-gray-500 mb-1">
              {p.category?.name || ""}
            </span>

            <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 mb-2">
              {p.description}
            </p>

            <p className="font-bold text-green-600 text-base sm:text-lg mb-3">
              ₹{p.price}
            </p>

            <div className="flex items-center justify-between gap-2 mt-auto">
              <button
                disabled={p.quantity === 0}
                onClick={() => handleAddToCart(p)}
                className={`text-xs sm:text-sm py-2 px-3 rounded-lg font-semibold w-full transition ${
                  p.quantity === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700 text-white"
                }`}
              >
                {p.quantity === 0 ? "Out of Stock" : "Add to Cart"}
              </button>
            </div>

            <span className="text-xs text-gray-600 mt-2 text-right">
              Stock: {p.quantity}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileProductsGrid;
