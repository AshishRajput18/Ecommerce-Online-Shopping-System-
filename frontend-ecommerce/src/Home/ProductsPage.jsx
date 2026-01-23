import React, { useState } from "react";
import CategorySideBar from "../CategorySideBar/CategorySideBar";
import MobileProductsGrid from "../MobileProductsGrid/MobileProductsGrid";

const ProductsPage = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  return (
    <div className="w-full mt-4 px-3 sm:px-4 md:px-6">
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
        
        {/* CATEGORY SIDEBAR */}
        <div className="w-full lg:w-80">
          <CategorySideBar onSelect={setSelectedCategoryId} />
        </div>

        {/* PRODUCTS GRID */}
        <div className="flex-1">
          {selectedCategoryId ? (
            <MobileProductsGrid categoryId={selectedCategoryId} />
          ) : (
            <p className="text-gray-500 text-center mt-6 text-base sm:text-lg">
              Select a category to view products
            </p>
          )}
        </div>

      </div>
    </div>
  );
};

export default ProductsPage;
