// "use client";

import React from "react";
import { MapPin, Bed, Bath, Square, Eye } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import useSWR from "swr";
import { fetcher } from "@/services/shared/fetcher";
import { baseUrl } from "@/services/shared/apiUrl";
import Image from "next/image";
// import { ButtonLoading } from "./ButtonLoading";
// import { Property } from "./PropertiesSidebar";

export const Properties: React.FC = () => {
  const { language, t } = useLanguage();

  const { data, error, isLoading } = useSWR(`${baseUrl}/properties`, fetcher, {
    suspense: true,
  });
  const properties = data?.data?.data || [];
  console.log("Properties data:", properties || []);
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(language === "ar" ? "ar-EG" : "en-EG").format(
      price
    );
  };
  return (
    <section
      id="properties"
      className="pt-20  mt-10 pb-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Search Form */}
      <div className=" pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* <PropertyList properties={properties} /> */}
            {properties.map((property) => (
              <div
                key={property.id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative h-64 w-full overflow-hidden">
                  {/* <Image
                  src={property?.coverimageurl}
                  alt={property?.additional_information[language].title || "property"}
                  width={400}
                  height={256}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  style={{ width: "100%", height: "100%" }}
                /> */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {property?.listing_type}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-1 rounded-full text-sm font-bold">
                      {formatPrice(property?.priceAmount)}{" "}
                      {t("properties.price")}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                    {property?.additional_information[language].title}
                  </h3>

                  <div className="flex items-center text-gray-600 dark:text-gray-400 mb-4">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span className="text-sm">
                      {property?.additional_information[language].address}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <Square className="h-5 w-5 mx-auto mb-1 text-gray-500 dark:text-gray-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {property?.area_sqm} {t("properties.area")}
                      </span>
                    </div>
                    {property.bedrooms > 0 && (
                      <div className="text-center">
                        <Bed className="h-5 w-5 mx-auto mb-1 text-gray-500 dark:text-gray-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {property.bedrooms} {t("properties.bedrooms")}
                        </span>
                      </div>
                    )}
                    {property?.bathrooms > 0 && (
                      <div className="text-center">
                        <Bath className="h-5 w-5 mx-auto mb-1 text-gray-500 dark:text-gray-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {property?.bathrooms} {t("properties.bathrooms")}
                        </span>
                      </div>
                    )}
                  </div>

                  <a href={`offers/apartment-${property?.id}`}>
                    <button className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-green-700 transition-all duration-300 flex items-center justify-center space-x-2 rtl:space-x-reverse">
                      <Eye className="h-5 w-5" />
                      <span>{t("properties.view.details")}</span>
                    </button>
                  </a>
                </div>
              </div>
            ))}
          </div>
      </div>
    </section>
  );
};
