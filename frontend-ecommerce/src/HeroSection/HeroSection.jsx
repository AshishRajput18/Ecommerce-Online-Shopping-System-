import React from "react";
import BannerImage from "../assets/online_shopping_banner.png";

const HeroSection = () => {
  return (
    <section
      className="
        w-full
        h-[180px]
        sm:h-[220px]
        md:h-[300px]
        lg:h-[400px]
        xl:h-[450px]
        overflow-hidden
      "
    >
      <img
        src={BannerImage}
        alt="Online Shopping Banner"
        className="w-full h-full object-cover"
      />
    </section>
  );
};

export default HeroSection;
