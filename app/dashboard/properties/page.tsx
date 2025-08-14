"use client";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { fetcher } from "@/services/shared/fetcher";
import { Edit, Eye, Filter, Plus, Search, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import clsx from "clsx";
import SearchWithAddButton from "@/app/components/SearchWithAddButton";
import Pagination from "../Pagination";
import { Toast } from "@/components/ui/toast";
import toast from "react-hot-toast";
import { Router } from "next/router";
import Image from "next/image";
import { Property } from "@/types/api";

const PropertiesDashboardTab = () => {
  const activeTab = "properties";

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  const [searchQuery, setSearchQuery] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(5);

  const { data, error, isLoading } = useSWR(
    apiUrl
      ? `${apiUrl}/properties?search=${searchQuery}&page=${currentPage}&limit=${itemsPerPage}`
      : null,
    fetcher
  );

  const { mutate } = useSWR(
    apiUrl
      ? `${apiUrl}/properties?search=${searchQuery}&page=${currentPage}&limit=${itemsPerPage}`
      : null,
    fetcher
  );

  const deleteProperty = async (id: number) => {
    try {
      const res = await fetch(`${apiUrl}/properties/${id}/reject`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      if (res.ok) {
        toast.success("Property deleted successfully");
        mutate(); // Refresh the properties list
      } else {
        toast.error("Failed to delete property");
        throw new Error("Failed to delete");
      }
    } catch (error) {
      toast.error("Failed to delete property");
    }
  };

  console.log("Properties data:", data);
  const { language, t } = useLanguage();

  const properties = Array.isArray(data?.data) ? data?.data : [];

  const formatPrice = (price: number) =>
    new Intl.NumberFormat(language === "ar" ? "ar-EG" : "en-EG").format(price);

  if (isLoading) return <div>Loading properties...</div>;
  if (error)
    return <div className="text-red-500">Failed to load properties.</div>;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg">
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            {language === "ar" ? "قائمة العقارات" : "Properties List"}
          </h3>

          <SearchWithAddButton
            searchQuery={searchQuery}
            setSearchQuery={(val) => {
              setSearchQuery(val);
              setCurrentPage(1); // reset page when searching
            }}
            language={language}
            activeTab={activeTab}
            //   onAddClick={handleAdd}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium">
                {language === "ar" ? "العقار" : "Property"}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium">
                {language === "ar" ? "العنوان" : "Title"}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium">
                {language === "ar" ? "السعر" : "Price"}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium">
                {language === "ar" ? "الحالة" : "Status"}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium">
                {language === "ar" ? "الإجراءات" : "Actions"}
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {properties?.map((property: Property) => (
              <tr key={property.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 flex items-center">
                  <Image
                    src={property?.coverimageurl || "/placeholder.jpg"}
                    alt={
                      language === "ar"
                        ? property?.additional_information?.ar?.title ||
                          "Property"
                        : property?.additional_information?.en?.title ||
                          "Property"
                    }
                    className="h-12 w-12 rounded-lg object-cover"
                  />
                  <div className="ml-4">
                    <div className="text-sm font-medium">
                      {language === "ar"
                        ? property?.additional_information?.ar?.title
                        : property?.additional_information?.en?.title}
                    </div>
                    <div className="text-sm text-gray-500">
                      {/* {property?.location} */}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium">
                    {language === "ar"
                      ? property?.additional_information.ar.title
                      : property?.additional_information.en.title}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium">
                    {formatPrice(parseInt(property?.price_amount))}{" "}
                    {language === "ar" ? "ج.م" : "EGP"}
                  </div>
                </td>
                <td className="px-6 py-4 flex ">
                  <span
                    className={clsx(
                      "px-2 py-1 text-xs flex w-4 h-4 rounded-full justify-center items-center",
                      property.status === "Available"
                        ? "bg-green-100 text-green-800"
                        : property.status === "inactive"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    )}></span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <a
                      href={`/offers/${property.id}`}
                      className="text-blue-600"
                      target="_blank"
                      rel="noopener noreferrer">
                      <Eye className="h-4 w-4" />
                    </a>
                    <button
                      className="text-green-600"
                      onClick={() =>
                        (window.location.href = `/dashboard/properties/${property.id}/edit`)
                      }>
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      className="text-red-600"
                      onClick={() => deleteProperty(property.id)}>
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {properties?.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center p-4">
                  {language === "ar" ? "لا توجد عقارات" : "No properties found"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ✅ Use Pagination Component */}
      <Pagination
        currentPage={currentPage}
        totalPages={data?.pagination?.totalPages ?? 1}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default PropertiesDashboardTab;
