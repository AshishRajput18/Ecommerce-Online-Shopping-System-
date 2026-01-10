import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";

/* ================= USER COMPONENTS ================= */
import Navbar from "./Navbar/Navbar";
import HeroSection from "./HeroSection/HeroSection";
import CategorySidebar from "./CategorySideBar/CategorySideBar";
import MobileProductsGrid from "./MobileProductsGrid/MobileProductsGrid";
import Footer from "./Footer/Footer";
import AboutUs from "./AboutUs/AboutUs";
import ContactUs from "./ContactUs/ContactUs";

/* ================= ADMIN COMPONENTS ================= */
import AdminHome from "./Admin/AdminHome";
import AdminDashboard from "./Admin/AdminDashboard";
import AddCategory from "./Admin/AddCategory";
import AddProduct from "./Admin/AddProduct";
import AssignDelivery from "./Admin/AssignDelivery";
import AdminHeader from "./Admin/AdminHeader";

/* ================= DELIVERY COMPONENTS ================= */
import DeliveryHome from "./DeliveryPerson/DeliveryHome";
import DeliveryDashboard from "./DeliveryPerson/DeliveryDashboard";
import DeliveryHeader from "./DeliveryPerson/DeliveryHeader";
import DeliveryUpdateStatus from "./DeliveryPerson/DeliveryUpdateStatus";

/* ================= CUSTOMER COMPONENTS ================= */
import CustomerHome from "./Customer/CustomerHome";
import CustomerDashboard from "./Customer/CustomerDashboard";
import CustomerHeader from "./Customer/CustomerHeader";
import ProductsPage from "./Home/ProductsPage";
import MyProfile from "./Customer/MyProfile";
import CustomerOrders from "./Customer/CustomerOrders";

/* =====================================================
   ROLE BASED HOME
===================================================== */
const RoleBasedHome = () => {
  const role = localStorage.getItem("userRole");

  if (role === "ADMIN") return <AdminHome />;
  if (role === "CUSTOMER") return <CustomerHome />;
  if (role === "DELIVERY_PERSON") return <DeliveryHome />;

  return (
    <>
      <HeroSection />

      <ProductsPage />

      <Footer />
    </>
  );
};

function App() {
  const location = useLocation();
  const role = localStorage.getItem("userRole");

  const hideNavbar =
    location.pathname.startsWith("/admin-dashboard") ||
    location.pathname.startsWith("/customer-dashboard") ||
    location.pathname.startsWith("/delivery-dashboard") ||
    role === "ADMIN" ||
    role === "CUSTOMER" ||
    role === "DELIVERY_PERSON";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        {/* HOME */}
        <Route path="/" element={<RoleBasedHome />} />

        {/* PUBLIC */}
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />

        {/* ADMIN */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-dashboard/add-category" element={<AddCategory />} />
        <Route path="/admin-dashboard/add-product" element={<AddProduct />} />
        <Route path="/admin-dashboard/assign-delivery" element={<AssignDelivery />} />
        <Route
          path="/admin-dashboard/about"
          element={
            <>
              <AdminHeader />
              <AboutUs />
            </>
          }
        />
        <Route
          path="/admin-dashboard/contact"
          element={
            <>
              <AdminHeader />
              <ContactUs />
            </>
          }
        />

        {/* DELIVERY */}
        <Route path="/delivery-dashboard" element={<DeliveryDashboard />} />
        <Route
          path="/delivery-dashboard/update-status"
          element={<DeliveryUpdateStatus />}
        />
        <Route
          path="/delivery-dashboard/about"
          element={
            <>
              <DeliveryHeader />
              <AboutUs />
            </>
          }
        />
        <Route
          path="/delivery-dashboard/contact"
          element={
            <>
              <DeliveryHeader />
              <ContactUs />
            </>
          }
        />

        {/* CUSTOMER */}
        <Route path="/customer-dashboard" element={<CustomerDashboard />} />
        <Route
          path="/customer-dashboard/about"
          element={
            <>
              <CustomerHeader />
              <AboutUs />
            </>
          }
        />
        <Route
          path="/customer-dashboard/contact"
          element={
            <>
              <CustomerHeader />
              <ContactUs />
            </>
          }
        />
        <Route
          path="/customer-dashboard/my-profile"
          element={
            <>
              <CustomerHeader />
              <MyProfile />
            </>
          }
        />
        <Route
          path="/customer-dashboard/my-orders"
          element={
            <>
              <CustomerHeader />
              <CustomerOrders/>
            </>
          }
        />

        {/* 404 */}
        <Route
          path="*"
          element={
            <h1 className="text-center mt-20 text-3xl font-bold">
              Page Not Found
            </h1>
          }
        />
      </Routes>
    </>
  );
}

export default App;
