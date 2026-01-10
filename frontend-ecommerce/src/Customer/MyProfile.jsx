import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

/* 🔹 Helper: Get email from JWT */
const getEmailFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.sub; // email
  } catch (error) {
    return null;
  }
};

const MyProfile = () => {
  const email = getEmailFromToken(); // ✅ SAFE EMAIL

  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobileNo: "",
    street: "",
    city: "",
    pincode: "",
  });

  /* 🔹 Sync correct email into localStorage (🔧 NEW & SAFE) */
  useEffect(() => {
    if (email && email.includes("@")) {
      localStorage.setItem("email", email); // ✅ ALWAYS CORRECT
    }
  }, [email]);

  /* 🔹 Fetch customer profile */
  useEffect(() => {
    // ✅ STRONG AUTH GUARD
    if (!email || !email.includes("@")) {
      Swal.fire("Session Expired", "Please login again", "error");
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(
          `http://localhost:8080/api/customer/profile/${email}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error("Profile not found");
        }

        const data = await res.json();

        setFormData({
          firstName: data.firstName ?? "",
          lastName: data.lastName ?? "",
          mobileNo: data.mobileNo ?? "",
          street: data.street ?? "",
          city: data.city ?? "",
          pincode: data.pincode ?? "",
        });
      } catch (error) {
        Swal.fire("Error", "Customer profile not found", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [email]);

  /* 🔹 Handle input change */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /* 🔹 Update profile */
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        "http://localhost:8080/api/customer/update-profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...formData,
            user: {
              email: email,
            },
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Update failed");
      }

      Swal.fire("Success", "Profile updated successfully ✅", "success");
    } catch (error) {
      Swal.fire("Error", "Profile update failed ❌", "error");
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading profile...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-2xl shadow">
      <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">
        My Profile
      </h2>

      <form onSubmit={handleUpdate} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <input
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className="p-3 border rounded-lg"
          />
          <input
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className="p-3 border rounded-lg"
          />
        </div>

        {/* EMAIL (READ ONLY) */}
        <input
          value={email}
          disabled
          className="w-full p-3 border rounded-lg bg-gray-100"
        />

        <input
          name="mobileNo"
          value={formData.mobileNo}
          onChange={handleChange}
          placeholder="Mobile No"
          className="w-full p-3 border rounded-lg"
        />

        <input
          name="street"
          value={formData.street}
          onChange={handleChange}
          placeholder="Street"
          className="w-full p-3 border rounded-lg"
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="City"
            className="p-3 border rounded-lg"
          />
          <input
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            placeholder="Pincode"
            className="p-3 border rounded-lg"
          />
        </div>

        <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default MyProfile;
