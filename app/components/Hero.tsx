"use client";

import React, { useState } from "react";
import {
  Search,
  MapPin,
  Home,
  Building,
  Factory,
  Mountain,
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

const Hero: React.FC = () => {
  const { language, t } = useLanguage();
 

  return (
    <>
      <section
        id="home"
        className="relative w-full h-[70vh] overflow-hidden
      ">
        {/* // bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-[80vh] flex items-center transition-colors duration-200 */}
        {/* <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg')] bg-cover bg-center opacity-10"></div> */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 inset-0 w-full h-full object-cover 
          opacity-95 
          z-1-
        pointer-events-none">
          <source
            src="https://fsn1.your-objectstorage.com/mls-realestate/videos/home-video.webm"
            type="video/webm"
          />
        </video>
      </section>
      <div className="container">
        <div className=" absolute top-[450px]  px-4 sm:px-6 lg:px-8 w-full">
          <p className="relative font-[Poppins] text-[18px] mb-[0.8rem]">
            <span className="border-b-2 border-[#cc0001]">Simplifying</span>{" "}
            Real Estate
          </p>
          <div
          //  className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              {t("hero.title")}
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl ">
              {t("hero.subtitle")}
            </p>

       
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
