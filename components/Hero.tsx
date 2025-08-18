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
import { useRouter } from "next/navigation";

const Hero: React.FC = () => {
  const { language, t } = useLanguage();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [minArea, setMinArea] = useState("");
  const propertyTypes = [
    { value: "", label: t("search.all.types"), icon: Home },
    { value: "residential", label: t("search.residential"), icon: Home },
    { value: "commercial", label: t("search.commercial"), icon: Building },
    { value: "industrial", label: t("search.industrial"), icon: Factory },
    { value: "land", label: t("search.land"), icon: Mountain },
  ];

  const locations = [
    { value: "", label: t("search.location") },
    { value: "cairo", label: language === "ar" ? "القاهرة" : "Cairo" },
    { value: "giza", label: language === "ar" ? "الجيزة" : "Giza" },
    {
      value: "alexandria",
      label: language === "ar" ? "الإسكندرية" : "Alexandria",
    },
    {
      value: "new-capital",
      label:
        language === "ar"
          ? "العاصمة الإدارية الجديدة"
          : "New Administrative Capital",
    },
  ];
  const priceRanges = [
    { value: "", label: language === "ar" ? "جميع الأسعار" : "All Prices" },
    {
      value: "0-1000000",
      label: language === "ar" ? "أقل من مليون جنيه" : "Under 1M EGP",
    },
    {
      value: "1000000-2000000",
      label: language === "ar" ? "1-2 مليون جنيه" : "1-2M EGP",
    },
    {
      value: "2000000-3000000",
      label: language === "ar" ? "2-3 مليون جنيه" : "2-3M EGP",
    },
    {
      value: "3000000-5000000",
      label: language === "ar" ? "3-5 مليون جنيه" : "3-5M EGP",
    },
    {
      value: "5000000+",
      label: language === "ar" ? "أكثر من 5 مليون جنيه" : "5M+ EGP",
    },
  ];
  const handleSearch = () => {
    const params = new URLSearchParams();

    if (propertyType) params.append("type", propertyType);
    if (location) params.append("location", location);
    if (searchQuery) params.append("q", searchQuery);
    if (minArea) params.append("area", minArea);
    if (searchQuery) params.append("q", searchQuery);

    router.push(`/offers?${params.toString()}`);
  };
  return (
    <>
      <div
        className="relative w-full h-[70vh] 
      ">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 inset-0 w-full h-full object-cover 
          opacity-95 
          z-0
        pointer-events-none">
          <source
            src="https://fsn1.your-objectstorage.com/mls-realestate/videos/home-video.webm"
            type="video/webm"
          />
        </video>
        <div
          className="relative z-10 h-full flex flex-col
items-start justify-end text-white w-[80%] mx-auto">
          <div className="px-4 sm:px-6 lg:px-8 pb-[120px]">
            <p className="font-[Poppins] text-[18px] mb-[0.8rem]">
              <span className="border-b-2 border-[#cc0001] pb-1">
                Simplifying
              </span>{" "}
              Real Estate
            </p>
            <h1 className="text-4xl md:text-6xl font-bold  mb-6">
              {t("hero.title")}
            </h1>
            <p className="text-xl md:text-2xl  mb-12 max-w-3xl">
              {t("hero.subtitle")}
            </p>
          </div>
        </div>
        <div
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8 w-[80%] mx-auto
              mt-[-150px] relative z-10
              
              ">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {/* Property Type */}
            <div className="relative z-20">
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                {propertyTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Location */}
            <div className="relative z-20">
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                {locations.map((loc) => (
                  <option key={loc.value} value={loc.value}>
                    {loc.label}
                  </option>
                ))}
              </select>
              <MapPin className="absolute right-7 top-4 h-5 w-5 text-gray-400" />
            </div>
            {/* Price Range */}
            <div className="relative z-20">
              <select
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                placeholder={t("search.price.range")}
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}>
                {priceRanges.map((range) => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Area */}
            <div className="relative z-20">
              <input
                type="text"
                value={minArea}
                onChange={(e) => setMinArea(e.target.value)}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                placeholder={t("search.MinArea")}
              />
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative z-20 mb-6">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("hero.search.placeholder")}
              className="w-full p-4 text-lg border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-12 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
            <Search className="absolute left-4 top-4 h-6 w-6 text-gray-400 dark:text-gray-500" />
          </div>

          {/* Search Button */}
          <div className="flex flex-col items-center">
            <button
              className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-green-600 text-white px-12 py-4 rounded-lg text-lg font-semibold hover:from-blue-700 hover:to-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              onClick={handleSearch}>
              {t("hero.search.button")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
