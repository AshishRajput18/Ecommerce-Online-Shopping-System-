import React, { useEffect, useState } from "react";
import AdminHeader from "./AdminHeader";

const AdminDashboard = ({
  viewType = "admin",
  showHeader = true,
  userEmail,
  onTotal,
}) => {
  const [orders, setOrders] = useState([]);
  const [deliveryUsers, setDeliveryUsers] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  /* ================= FETCH ORDERS (Admin) ================= */
  useEffect(() => {
    if (viewType !== "admin") return;

    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:8080/api/orders");
        if (!res.ok) throw new Error("Failed to fetch orders");
        const data = await res.json();
        setOrders(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Orders fetch error:", err);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [viewType]);

  /* ================= FETCH DELIVERY USERS ================= */
  useEffect(() => {
    if (viewType !== "admin") return;

    const fetchDeliveryUsers = async () => {
      try {
        const res = await fetch(
          "http://localhost:8080/api/users/role/DELIVERY_PERSON"
        );
        const data = await res.json();
        setDeliveryUsers(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Delivery users fetch error:", err);
        setDeliveryUsers([]);
      }
    };

    fetchDeliveryUsers();
  }, [viewType]);

  /* ================= ASSIGN DELIVERY ================= */
  const assignDelivery = async (orderId, userId) => {
    if (!userId) return;
    try {
      await fetch(`http://localhost:8080/api/orders/${orderId}/assign/${userId}`, {
        method: "PUT",
      });
      alert("Delivery person assigned ✅");
      // Update the UI without reloading
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId
            ? {
                ...order,
                deliveryPerson: deliveryUsers.find((u) => u.id === Number(userId)),
                status: "ASSIGNED",
              }
            : order
        )
      );
    } catch (err) {
      console.error("Assign delivery error:", err);
      alert("Failed to assign delivery person ❌");
    }
  };

  /* ================= CUSTOMER CART ================= */
  useEffect(() => {
    if (viewType !== "customer" || !userEmail) return;

    const fetchCart = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:8080/api/cart/user/${userEmail}`);
        if (!res.ok) throw new Error("Failed to load cart");
        const data = await res.json();
        setCartItems(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Cart fetch error:", err);
        setCartItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [viewType, userEmail]);

  /* ================= CART TOTAL ================= */
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + (item?.product?.price || 0) * (item?.quantity || 0),
    0
  );

  useEffect(() => {
    if (onTotal) onTotal(totalPrice);
  }, [totalPrice, onTotal]);

  /* ================= REMOVE CART ITEM ================= */
  const deleteItem = async (productId) => {
    try {
      await fetch(
        `http://localhost:8080/api/cart/remove?email=${userEmail}&productId=${productId}`,
        { method: "DELETE" }
      );
      setCartItems((prev) =>
        prev.filter((item) => item.product?.id !== productId)
      );
    } catch (err) {
      console.error("Remove cart item error:", err);
    }
  };

  /* ================= LOADING ================= */
  if (loading) {
    return <p className="text-center text-gray-600 py-10">Loading...</p>;
  }

  return (
    <div className="min-h-full bg-gray-50">
      {showHeader && <AdminHeader />}

      {/* ================= CUSTOMER VIEW ================= */}
      {viewType === "customer" && (
        <>
          {cartItems.length === 0 ? (
            <p className="text-center py-10 text-gray-600">
              Your cart is empty
            </p>
          ) : (
            <div className="p-6">
              <div className="overflow-x-auto rounded-xl border bg-white">
                <table className="w-full text-sm">
                  <thead className="bg-green-100 text-green-900">
                    <tr>
                      <th className="px-4 py-3">Image</th>
                      <th className="px-4 py-3">Product</th>
                      <th className="px-4 py-3 text-right">Price</th>
                      <th className="px-4 py-3 text-center">Qty</th>
                      <th className="px-4 py-3 text-right">Subtotal</th>
                      <th className="px-4 py-3 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={item.id} className="border-t">
                        <td className="px-4 py-3">
                          <img
                            src={item.product?.imageUrl}
                            alt={item.product?.title}
                            className="w-14 h-14 object-contain"
                          />
                        </td>
                        <td className="px-4 py-3">{item.product?.title}</td>
                        <td className="px-4 py-3 text-right">
                          ₹{item.product?.price}
                        </td>
                        <td className="px-4 py-3 text-center">{item.quantity}</td>
                        <td className="px-4 py-3 text-right">
                          ₹{item.product?.price * item.quantity}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <button
                            onClick={() => deleteItem(item.product?.id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="flex justify-end mt-6">
                  <div className="bg-green-50 px-6 py-3 rounded border">
                    <span className="font-semibold text-lg">
                      Total: ₹{totalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* ================= ADMIN VIEW ================= */}
      {viewType === "admin" && (
        <div className="p-6">
          {orders.length === 0 ? (
            <p className="text-center text-gray-600">No orders found</p>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-xl border shadow-sm p-5 mb-6"
              >
                {/* ORDER HEADER */}
                <div className="flex justify-between mb-3 items-center">
                  <h3 className="font-semibold text-green-700">
                    Order #{order.id}
                  </h3>
                  <div className="flex gap-2 items-center">
                    <span className="text-sm bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
                      {order.status}
                    </span>
                    {order.deliveryPerson && (
                      <span className="text-green-700 font-semibold">
                        Assigned: {order.deliveryPerson.firstName}
                      </span>
                    )}
                  </div>
                </div>

                {/* CUSTOMER INFO */}
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-4">

  <p><b>Name:</b> {order.user?.firstName}</p>
  <p><b>Mobile:</b> {order.user?.mobileNo}</p>
  <p><b>City:</b> {order.user?.city}</p>

  <p className="md:col-span-3">
    <b>Address:</b> {order.user?.street}
  </p>

  {/* Delivery Status Date */}
  {order.deliveryDate && (
    <p className="md:col-span-3 text-gray-600">
      <b>
        {order.deliveryStatus === "PICKED_UP" && "Picked Up at:"}
        {order.deliveryStatus === "OUT_FOR_DELIVERY" && "Out For Delivery at:"}
        {order.deliveryStatus === "DELIVERED" && "Delivered on:"}
      </b>{" "}
      {new Date(order.deliveryDate).toLocaleString()}
    </p>
  )}

</div>


                {/* ITEMS */}
                <table className="w-full text-sm border mt-3">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-3 py-2">Product</th>
                      <th className="px-3 py-2 text-center">Qty</th>
                      <th className="px-3 py-2 text-right">Price</th>
                      <th className="px-3 py-2 text-right">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(order.items || []).map((item) => {
                      const price = item.product?.price ?? item.price ?? 0;
                      const qty = item.quantity ?? 1;
                      return (
                        <tr key={item.id} className="border-t">
                          <td className="px-3 py-2">{item.product?.title || "N/A"}</td>
                          <td className="px-3 py-2 text-center">{qty}</td>
                          <td className="px-3 py-2 text-right">₹{price}</td>
                          <td className="px-3 py-2 text-right">₹{price * qty}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                {/* TOTAL */}
                <p className="text-right font-semibold mt-4 text-green-800">
                  Total: ₹{order.totalAmount}
                </p>

                {/* ASSIGN DELIVERY */}
                <div className="mt-4 flex gap-3 items-center">
                  <select
                    defaultValue=""
                    onChange={(e) => assignDelivery(order.id, e.target.value)}
                    className="border px-3 py-1 rounded"
                  >
                    <option value="">Select Delivery Person</option>
                    {deliveryUsers.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.firstName}
                      </option>
                    ))}
                  </select>
                  {order.deliveryPerson && (
                    <span className="text-green-700 font-semibold">
                      Currently Assigned: {order.deliveryPerson.firstName}
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
