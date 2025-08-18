"use client";

import React, { useState } from "react";
import { Search, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import PropertiesCard, {
  Filter,
} from "@/components/PropertiesComponents/PropertiesCard";

export default function OffersPage() {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [location, setLocation] = useState("");
  const [totalCount, setTotalCount] = useState(0);

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

  const bedroomOptions = [
    { value: "", label: language === "ar" ? "جميع الغرف" : "All Bedrooms" },
    { value: "1", label: language === "ar" ? "غرفة واحدة" : "1 Bedroom" },
    { value: "2", label: language === "ar" ? "غرفتان" : "2 Bedrooms" },
    { value: "3", label: language === "ar" ? "3 غرف" : "3 Bedrooms" },
    { value: "4", label: language === "ar" ? "4 غرف" : "4 Bedrooms" },
    { value: "5+", label: language === "ar" ? "5 غرف أو أكثر" : "5+ Bedrooms" },
  ];

  const locations = [
    { value: "", label: language === "ar" ? "جميع المواقع" : "All Locations" },
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
    {
      value: "new-cairo",
      label: language === "ar" ? "القاهرة الجديدة" : "New Cairo",
    },
    {
      value: "sheikh-zayed",
      label: language === "ar" ? "الشيخ زايد" : "Sheikh Zayed",
    },
  ];

  const propertiesDataFilters: Filter[] = [
    {
      price: priceRange
        ? priceRange.includes("+")
          ? [parseInt(priceRange.replace("+", "")), Infinity]
          : (() => {
              const parts = priceRange.split("-").map((p) => parseInt(p));
              return parts.length === 2
                ? ([parts[0], parts[1]] as [number, number])
                : undefined;
            })()
        : undefined,
      bedrooms: bedrooms
        ? bedrooms === "5+"
          ? 5
          : parseInt(bedrooms)
        : undefined,
      location: location || undefined,
      // add type and minArea if needed
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Hero Section */}
      {/* Map Section */}
      <section className="bg-white dark:bg-gray-800 py-8 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {language === "ar"
                ? "شقق سكنية للبيع"
                : "Residential Apartments for Sale"}
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              {language === "ar"
                ? "اكتشف أفضل الشقق السكنية المعتمدة حكومياً في جميع أنحاء مصر"
                : "Discover the best government-certified residential apartments across Egypt"}
            </p>
          </div>

          {/* Interactive Map */}
          <div className="bg-gray-200 dark:bg-gray-700 rounded-2xl h-96 flex items-center justify-center relative overflow-hidden mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-green-500 opacity-20"></div>
            <div className="text-center z-10">
              <MapPin className="h-16 w-16 text-gray-500 dark:text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-300 text-lg font-medium">
                {language === "ar"
                  ? "خريطة تفاعلية للعقارات"
                  : "Interactive Properties Map"}
              </p>
              <p className="text-gray-500 dark:text-gray-400">
                {language === "ar"
                  ? `عرض ${totalCount} عقار على الخريطة`
                  : `Showing ${totalCount} properties on map`}
              </p>
            </div>

            {/* Mock map pins */}
            <div className="absolute top-20 left-20">
              <div className="bg-red-500 text-white p-2 rounded-full shadow-lg">
                <MapPin className="h-4 w-4" />
              </div>
            </div>
            <div className="absolute top-32 right-32">
              <div className="bg-red-500 text-white p-2 rounded-full shadow-lg">
                <MapPin className="h-4 w-4" />
              </div>
            </div>
            <div className="absolute bottom-24 left-1/3">
              <div className="bg-red-500 text-white p-2 rounded-full shadow-lg">
                <MapPin className="h-4 w-4" />
              </div>
            </div>
            <div className="absolute top-1/2 right-1/4">
              <div className="bg-red-500 text-white p-2 rounded-full shadow-lg">
                <MapPin className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white dark:bg-gray-800 shadow-sm transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Search Bar */}
            <div className="relative md:col-span-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  language === "ar"
                    ? "البحث في الشقق..."
                    : "Search apartments..."
                }
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-10 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-500" />
            </div>

            {/* Price Range Filter */}
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
              {priceRanges.map((range) => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>

            {/* Bedrooms Filter */}
            <select
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
              className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
              {bedroomOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {/* Location Filter */}
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
              {locations.map((loc) => (
                <option key={loc.value} value={loc.value}>
                  {loc.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Results Count */}
      <section className="py-4 bg-gray-100 dark:bg-gray-800 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gray-600 dark:text-gray-300">
            {language === "ar"
              ? `تم العثور على ${totalCount} شقة`
              : `Found ${totalCount} apartments`}
          </p>
        </div>
      </section>

      {/* Apartments Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <PropertiesCard
            propertiesDataFilters={propertiesDataFilters}
            itemNum={9}
            setTotalCount={setTotalCount}
            classNameAttr="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            isHomePage={false}
        />
        </div>
      </section>
    </div>
  );
}
