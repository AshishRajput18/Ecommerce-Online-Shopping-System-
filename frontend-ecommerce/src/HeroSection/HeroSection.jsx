import React from "react";
import BannerImage from "../assets/online_shopping_banner.png";

const HeroSection = () => {
  return (
    <section
      className="
        w-full
        h-[140px]
        sm:h-[180px]
        md:h-[260px]
        lg:h-[360px]
        xl:h-[420px]
        overflow-hidden
      "
    >
      <img
        src={BannerImage}
        alt="Online Shopping Banner"
        className="w-full h-full object-cover object-center"
      />
    </section>
  );
};

export default HeroSection;
