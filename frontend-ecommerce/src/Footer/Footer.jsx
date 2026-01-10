import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white border-t mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">

        {/* BRAND */}
        <div>
          <h2 className="text-green-600 font-bold text-lg mb-3 flex items-center gap-2">
            🛒 Online Shopping
          </h2>
          <p className="text-gray-600">
            Your one-stop destination for latest products at the best prices.
          </p>
        </div>

        {/* ABOUT */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-3">About</h3>
          <ul className="space-y-2 text-gray-600">
            <li className="hover:text-green-600 cursor-pointer">About Us</li>
            <li className="hover:text-green-600 cursor-pointer">Careers</li>
            <li className="hover:text-green-600 cursor-pointer">Blog</li>
          </ul>
        </div>

        {/* HELP */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-3">Help</h3>
          <ul className="space-y-2 text-gray-600">
            <li className="hover:text-green-600 cursor-pointer">Contact Us</li>
            <li className="hover:text-green-600 cursor-pointer">FAQs</li>
            <li className="hover:text-green-600 cursor-pointer">Return Policy</li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-3">Contact</h3>
          <ul className="space-y-2 text-gray-600">
            <li>📧 support@onlineshopping.com</li>
            <li>📞 +91 98765 43210</li>
            <li>📍 India</li>
          </ul>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="border-t py-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Online Shopping. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
