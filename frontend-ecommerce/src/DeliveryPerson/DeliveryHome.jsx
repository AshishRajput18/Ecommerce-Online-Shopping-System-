import React, { useState } from "react";
import DeliveryHeader from "./DeliveryHeader";
import HeroSection from "../HeroSection/HeroSection";
import CategorySideBar from "../CategorySideBar/CategorySideBar";
import MobileProductsGrid from "../MobileProductsGrid/MobileProductsGrid";
import Footer from "../Footer/Footer";

const DeliveryHome = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  return (
    <>
      {/* ================= Delivery Header ================= */}
      <DeliveryHeader />

      {/* ================= Main Content ================= */}
      <HeroSection />

      <div className="w-full mt-4 px-3 sm:px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">

          {/* CATEGORY SIDEBAR */}
          <div className="w-full lg:w-80">
            <CategorySideBar onSelect={setSelectedCategoryId} />
          </div>

          {/* PRODUCTS GRID */}
          <div className="flex-1">
            <MobileProductsGrid categoryId={selectedCategoryId} />
          </div>

        </div>
      </div>

      <Footer />
    </>
  );
};

export default DeliveryHome;
