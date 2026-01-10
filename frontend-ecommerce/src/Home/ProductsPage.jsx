import React, { useState } from "react";
import CategorySideBar from "../CategorySideBar/CategorySideBar";
import MobileProductsGrid from "../MobileProductsGrid/MobileProductsGrid";

const ProductsPage = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  return (
    <div className="w-full mt-6 px-4">
      <div className="flex gap-6">
        {/* CATEGORY SIDEBAR */}
        <div className="w-80">
          <CategorySideBar onSelect={setSelectedCategoryId} />
        </div>

        {/* PRODUCTS GRID */}
        <div className="flex-1">
          {selectedCategoryId ? (
            <MobileProductsGrid categoryId={selectedCategoryId} />
          ) : (
            <p className="text-gray-500 text-center mt-10 text-lg">
              Select a category to view products
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
