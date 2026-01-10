import React from "react";

const ContactUs = () => {
  return (
    <div className="max-w-7xl mx-auto p-6 mt-6 bg-white rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-4 text-green-700">Contact Us</h1>
      <p className="text-gray-700 mb-4">
        Have questions or need support? Reach out to us via:
      </p>
      <ul className="text-gray-600 list-disc list-inside">
        <li>Email: support@onlineshopping.com</li>
        <li>Phone: +91 9876543210</li>
        <li>Address: 123, Shopping Street, Your City, India</li>
      </ul>
    </div>
  );
};

export default ContactUs;
