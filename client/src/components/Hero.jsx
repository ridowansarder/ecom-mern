import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="flex flex-col sm:flex-row border my-8 border-gray-400">
      {/* Left side */}
      <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
        <div className="text-center py-10">
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">
              Welcome to SNORVO!
            </h1>
            <p className="text-sm sm:text-md lg:text-lg">
              Discover the latest fashion trends <br /> and shop with confidence.
            </p>
            <Link to="/products">
              <button className="bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition duration-300 ease-in-out mt-3">
                Shop Now
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Right side */}
      <div className="w-full sm:w-1/2 flex items-center justify-center">
        <img
          src="/hero.jpg"
          alt="Hero"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Hero;
