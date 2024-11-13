import React from "react";
import "./product.css";
import BannerImg from "../assets/women/women2.jpg";
import { GrSecure } from "react-icons/gr";
import { IoFastFood } from "react-icons/io5";
import { GiFoodTruck } from "react-icons/gi";

const Banner = () => {
  return (
    <div className="banner-container">
      <div className="container banner-inner">
        {/* image section */}
        <div data-aos="zoom-in">
          <img src={BannerImg} alt="" className="banner-image" />
        </div>

        {/* text details section */}
        <div className="banner-text">
          <h1 data-aos="fade-up" className="banner-heading">
            Winter Sale upto 50% Off
          </h1>
          <p data-aos="fade-up" className="banner-description">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque
            reiciendis inventore iste ratione ex alias quis magni at optio
          </p>
          <div className="flex flex-col gap-4">
            <div data-aos="fade-up" className="banner-feature">
              <GrSecure className="banner-icon bg-violet" />
              <p>Quality Products</p>
            </div>
            <div data-aos="fade-up" className="banner-feature">
              <IoFastFood className="banner-icon bg-orange" />
              <p>Fast Delivery</p>
            </div>
            <div data-aos="fade-up" className="banner-feature">
              <GiFoodTruck className="banner-icon bg-green" />
              <p>Easy Payment method</p>
            </div>
            <div data-aos="fade-up" className="banner-feature">
              <GiFoodTruck className="banner-icon bg-yellow" />
              <p>Get Offers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
