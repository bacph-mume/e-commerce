import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <div>
      <header className="py-12 bg-[#5F50DC]">
        <div className="px-10 my-12 container">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold">
              Welcome to Our E-commerce Store
            </h1>
            <p className="leading-10 mb-4 text-xl">
              Discover the latest trends with our modern collection
            </p>
            <button className="bg-white rounded-full px-4 py-2 hover:bg-gray-300 transition duration-300">
              <Link href="#shop" className="text-gray-900 text-xl">
                Shop Now
              </Link>
            </button>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Hero;
