"use client";

import React, { Suspense, useEffect, useState } from "react";
import {
  Search,
  MapPin,
  Bed,
  Bath,
  Square,
  Eye,
  Heart,
  Filter,
  Phone,
  Mail,
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { fetchProperties } from "@/services/properties/property.service";
import useSWR from "swr";
import { baseUrl } from "@/services/shared/apiUrl";
import { fetcher } from "@/services/shared/fetcher";
export async function getApartments() {
  // You can add any sync logic here if needed
  const data = await fetchProperties();
  return data;
}

export default function OffersPage() {
  const { language, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [location, setLocation] = useState("");
  // const [filteredApartments, setFilteredApartments] = useState<any[]>([]);
  const { data, error, isLoading } = useSWR(`${baseUrl}/properties`, fetcher);

  const apartments = data?.data || [];
  console.log("filteredApartments (client)", apartments);
  // const filteredApartments = data?.data;
  // console.log("filteredApartments (client)", filteredApartments);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     console.log("filteredApartments (client)", data);
  //   };
  //   fetchData();
  // }, []);
  // const filteredApartments =  fetchProperties();

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
  // const apartments = [];
  const filteredApartments = Array.isArray(apartments)
    ? apartments.filter((apartment) => {
        const matchesSearch =
          apartment.additional_information[language].title
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          apartment.additional_information[language].location
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        // const matchesBedrooms =
        //   bedrooms === "" ||
        //   apartment.bedrooms.toString() === bedrooms ||
        //   (bedrooms === "5+" && apartment.bedrooms >= 5);
        // const matchesLocation =
        //   location === "" || apartment.location.toLowerCase().includes(location);

        let matchesPrice = true;
        if (priceRange) {
          const [min, max] = priceRange
            .split("-")
            .map((p) => p.replace("+", ""));
          if (max) {
            matchesPrice =
              apartment.price_amount >= parseInt(min) &&
              apartment.price_amount <= parseInt(max);
          } else {
            matchesPrice = apartment.price_amount >= parseInt(min);
          }
        }

        return (
          matchesSearch &&
          // && matchesBedrooms && matchesLocation
          matchesPrice
        );
      })
    : [];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(language === "ar" ? "ar-EG" : "en-EG").format(
      price
    );
  };

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
                  ? `عرض ${filteredApartments?.pagination?.totalCount} عقار على الخريطة`
                  : `Showing ${filteredApartments?.pagination?.totalCount} properties on map`}
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
              ? `تم العثور على ${filteredApartments?.length} شقة`
              : `Found ${filteredApartments?.length} apartments`}
          </p>
        </div>
      </section>

      {/* Apartments Grid */}
      <section className="py-16">
        <Suspense fallback={<div className="text-center">Loading...</div>}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredApartments?.map((apartment) => (
                <div
                  key={apartment.id}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={apartment.coverimageurl}
                      alt={apartment.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {language === "ar" ? "للبيع" : "For Sale"}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <button className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-200">
                        <Heart className="h-5 w-5 text-gray-600" />
                      </button>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-1 rounded-full text-sm font-bold">
                        {formatPrice(parseInt(apartment.price_amount) || 0)}{" "}
                        {language === "ar" ? "ج.م" : "EGP"}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                      {apartment.additional_information[language].title}
                    </h3>

                    <div className="flex items-center text-gray-600 dark:text-gray-400 mb-4">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span className="text-sm">
                        {apartment.additional_information[language].address}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center">
                        <Square className="h-5 w-5 mx-auto mb-1 text-gray-500 dark:text-gray-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {parseInt(apartment.area_sqm)}{" "}
                          {language === "ar" ? "م²" : "m²"}
                        </span>
                      </div>
                      <div className="text-center">
                        <Bed className="h-5 w-5 mx-auto mb-1 text-gray-500 dark:text-gray-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {apartment.bedrooms}{" "}
                          {language === "ar" ? "غرف" : "beds"}
                        </span>
                      </div>
                      <div className="text-center">
                        <Bath className="h-5 w-5 mx-auto mb-1 text-gray-500 dark:text-gray-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {apartment.bathrooms}{" "}
                          {language === "ar" ? "حمام" : "baths"}
                        </span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {/* {language === "ar"
                          ? `الطابق ${apartment.floor} من ${apartment.totalFloors}`
                          : `Floor ${apartment.floor} of ${apartment.totalFloors}`} */}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {/* {apartment.features
                          .slice(0, 3)
                          .map((feature, index) => (
                            <span
                              key={index}
                              className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                              {feature}
                            </span>
                          ))} */}
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          delivered on {apartment?.available_from?.slice(0, 7)}
                          {/*
                           <p className="font-medium">{apartment.agent.name}</p> 
                           <div className="flex items-center mt-1">
                             <Phone className="h-3 w-3 mr-1" /> 
                             <span className="text-xs">
                              {apartment.agent.phone}
                            </span> 
                          </div> 
                          */}
                        </div>
                      </div>

                      <div className="flex space-x-2 rtl:space-x-reverse">
                        <a
                          href={`offers/${apartment.id}`}
                          className="flex-1 bg-gradient-to-r from-blue-600 to-green-600 text-white py-2 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-green-700 transition-all duration-300 flex items-center justify-center space-x-2 rtl:space-x-reverse text-sm">
                          <Eye className="h-4 w-4" />
                          <span>
                            {language === "ar" ? "التفاصيل" : "Details"}
                          </span>
                        </a>
                        <button
                          className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-lg transition-colors duration-200"
                          onClick={() => window.open("tel:01005307391")}>
                          <Phone className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredApartments?.length === 0 && (
              <div className="text-center py-16">
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  {language === "ar"
                    ? "لم يتم العثور على شقق تطابق معايير البحث"
                    : "No apartments found matching your search criteria"}
                </p>
              </div>
            )}
          </div>
        </Suspense>
      </section>
    </div>
  );
}
