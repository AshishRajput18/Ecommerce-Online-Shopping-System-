import React,{useState}from "react";
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

      {/* ================= Main Content (Public-style) ================= */}
      <HeroSection />

      <div className="w-full mt-6 px-4">
        <div className="flex gap-6">
           <CategorySideBar onSelect={setSelectedCategoryId} />

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
