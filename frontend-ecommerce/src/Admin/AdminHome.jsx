import AdminHeader from "./AdminHeader";
import HeroSection from "../HeroSection/HeroSection";
import CategorySideBar from "../CategorySideBar/CategorySideBar";
import MobileProductsGrid from "../MobileProductsGrid/MobileProductsGrid";
import Footer from "../Footer/Footer";
import  { useState} from "react";

const AdminHome = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  return (
    <>
      {/* ADMIN HEADER */}
      <AdminHeader />
      

      {/* SAME HOME UI AS PUBLIC */}
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

export default AdminHome;
