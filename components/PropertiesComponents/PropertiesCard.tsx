"use client";

import { MapPin, Bed, Bath, Square, Eye } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import useSWR from "swr";
import { fetcher } from "@/services/shared/fetcher";
import { baseUrl } from "@/services/shared/apiUrl";
import Image from "next/image";
import { ApiResponse, Property } from "@/lib/types/api";
import { useEffect, useState } from "react";
import PropertiesSkeleton from "./PropertiesSkeleton";

export type Filter = {
  price?: [number, number];
  bedrooms?: number;
  location?: string;
  type?: string;
  minArea?: number;
};
type PropertiesCardProps = {
  itemNum?: number;
  page?: number;
  propertiesDataFilters?: Filter[];
  fallback?: Property[];
  setTotalCount?: (count: number) => void;
  classNameAttr?: string;
  isHomePage?: boolean;
};

const PropertiesCard = ({
  itemNum = 6,
  propertiesDataFilters,
  page = 1,
  setTotalCount,
  classNameAttr,
  isHomePage = true,
}: PropertiesCardProps) => {
  const { language, t } = useLanguage();
  const [pageInThisPage, setPageInThisPage] = useState(page);

  const { data, isLoading, error } = useSWR<ApiResponse<Property>>(
    `${baseUrl}/properties?page=${pageInThisPage}&limit=${itemNum}`,
    fetcher
  );
  const totalPages = data?.pagination?.totalPages || 1;
  const properties: Property[] | undefined = Array.isArray(data?.data)
    ? data?.data
    : [];
  const filteredProperties = properties?.filter((property) => {
    if (!propertiesDataFilters) return true; // no filters, keep all

    let matches = true;

    propertiesDataFilters.forEach((filter) => {
      if (filter.price) {
        const price = parseInt(property.price_amount);
        if (price < filter.price[0] || price > filter.price[1]) matches = false;
      }
      if (filter.bedrooms && property.bedrooms < filter.bedrooms)
        matches = false;
      if (
        filter.location &&
        !property.additional_information[language].address.includes(
          filter.location
        )
      )
        matches = false;
      if (filter.type && property.listing_type !== filter.type) matches = false;
      if (filter.minArea && parseFloat(property.area_sqm) < filter.minArea)
        matches = false;
    });

    return matches;
  });
  useEffect(() => {
    if (setTotalCount) {
      if (data?.pagination?.totalCount !== undefined) {
        console.log("Setting total count:", data.pagination.totalCount);
        setTotalCount(data?.pagination?.totalCount);
      } else {
        setTotalCount(101);
      }
    }
  }, [
    data,
    filteredProperties?.length,
    propertiesDataFilters,
    propertiesDataFilters?.length,
    setTotalCount,
  ]);
  console.log("Filtered properties:", filteredProperties);
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(language === "ar" ? "ar-EG" : "en-EG").format(
      price
    );
  };
  if (error) {
    <div>error {error}</div>;
  }
  if (isLoading) return <PropertiesSkeleton length={itemNum} />;
  return (
    <div>
      {propertiesDataFilters &&
        filteredProperties &&
        filteredProperties?.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              {language === "ar"
                ? "لم يتم العثور على شقق تطابق معايير البحث"
                : "No apartments found matching your search criteria"}
            </p>
          </div>
        )}

      <div className={`${classNameAttr}`}>
        {filteredProperties?.slice(0, itemNum).map((property) => (
          <div
            key={property.id}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="relative h-64 w-full overflow-hidden">
              {property?.coverimageurl ? (
                <Image
                  src={property?.coverimageurl}
                  alt={
                    property?.additional_information[language].title ||
                    "property"
                  }
                  width={400}
                  height={256}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  style={{ width: "100%", height: "100%" }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-300">
                  {property?.additional_information[language].title}
                </div>
              )}
              <div className="absolute top-4 left-4">
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {property?.listing_type}
                </span>
              </div>
              <div className="absolute top-4 right-4">
                <span className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-1 rounded-full text-sm font-bold">
                  {formatPrice(parseInt(property?.price_amount))}{" "}
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
                {property?.bedrooms > 0 && (
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

              <a href={`offers/${property?.id}`}>
                <button className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-green-700 transition-all duration-300 flex items-center justify-center space-x-2 rtl:space-x-reverse">
                  <Eye className="h-5 w-5" />
                  <span>{t("properties.view.details")}</span>
                </button>
              </a>
            </div>
          </div>
        ))}
      </div>
      {/* Pagination */}
      {!isHomePage && (
        <div className="flex items-center gap-2 mt-8 justify-end pr-7 pl-7">
          <button
            onClick={() => setPageInThisPage((prev) => Math.max(prev - 1, 1))}
            disabled={pageInThisPage === 1}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50">
            {language === "ar" ? "السابق" : "Previous"}
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPageInThisPage(i + 1)}
              className={`px-4 py-2 rounded ${
                pageInThisPage === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700"
              }`}>
              {i + 1}
            </button>
          ))}

          <button
            onClick={() =>
              setPageInThisPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={pageInThisPage === totalPages}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50">
            {language === "ar" ? "التالي" : "Next"}
          </button>
        </div>
      )}
    </div>
  );
};

export default PropertiesCard;
