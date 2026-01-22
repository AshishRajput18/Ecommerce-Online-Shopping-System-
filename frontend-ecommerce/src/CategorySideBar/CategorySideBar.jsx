import React, { useEffect, useState } from "react";

const CategorySideBar = ({ onSelect }) => {
  const [categories, setCategories] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/categories`)
      .then(res => res.json())
      .then(data => {
        setCategories(data);
        if (data.length > 0) {
          setActiveIndex(0);
          onSelect(data[0].id);
        }
      })
      .catch(err =>
        console.error("Failed to fetch categories:", err)
      );
  }, []);

  return (
    <div className="w-80 bg-white p-5 rounded-md shadow border sticky top-20 h-fit">
      <h3 className="font-semibold mb-4 text-gray-800 text-lg">
        Categories
      </h3>

      {categories.map((cat, index) => (
        <div
          key={cat.id}
          onClick={() => {
            setActiveIndex(index);
            onSelect(cat.id);
          }}
          className={`py-3 px-4 mb-2 rounded-md cursor-pointer transition-all text-sm
            ${
              index === activeIndex
                ? "bg-green-600 text-white font-semibold"
                : "text-gray-700 hover:bg-gray-100"
            }`}
        >
          {cat.name}
        </div>
      ))}
    </div>
  );
};

export default CategorySideBar;
