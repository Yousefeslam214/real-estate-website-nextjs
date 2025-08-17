"use client";

import React from "react";
import { useLanguage } from "../contexts/LanguageContext";
import useSWR from "swr";
import { PropertyFormData } from "@/types/PropertyForms";
import { ApiResponse } from "@/types/api";
import { fetcher } from "@/services/shared/fetcher";
import { baseUrl } from "@/services/shared/apiUrl";
import { AlertCircle } from "lucide-react";
import { featuresList } from "@/lib/data/data";
interface Props {
  formData: PropertyFormData;
  setFormData: React.Dispatch<React.SetStateAction<PropertyFormData>>;
  errors: { [key: string]: string };
  setErrors: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
}

const PropertyForm = ({ formData, setFormData, errors, setErrors }: Props) => {
  const { language } = useLanguage();
  //   const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const { data } = useSWR<ApiResponse>(
    `${baseUrl}/properties/getAvailableProjects`,
    fetcher
  );
  const projects = data?.data;

  // const propertyTypes = [
  //   {
  //     value: "",
  //     label: language === "ar" ? "اختر نوع العقار" : "Select Property Type",
  //     icon: Building,
  //   },
  //   {
  //     value: "apartment",
  //     label: language === "ar" ? "شقة" : "Apartment",
  //     icon: Building,
  //   },
  //   {
  //     value: "villa",
  //     label: language === "ar" ? "فيلا" : "Villa",
  //     icon: Home,
  //   },
  //   {
  //     value: "office",
  //     label: language === "ar" ? "مكتب" : "Office",
  //     icon: Building,
  //   },
  //   {
  //     value: "shop",
  //     label: language === "ar" ? "محل تجاري" : "Shop",
  //     icon: Store,
  //   },
  //   {
  //     value: "warehouse",
  //     label: language === "ar" ? "مستودع" : "Warehouse",
  //     icon: Factory,
  //   },
  //   {
  //     value: "land",
  //     label: language === "ar" ? "أرض" : "Land",
  //     icon: Mountain,
  //   },
  // ];

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    // List all fields that should be numbers
    const numberFields = [
      "propertyTypeId",
      "projectId",
      "priceAmount",
      "areaSqm",
      "bedrooms",
      "bathrooms",
    ];
    setFormData((prev) => ({
      ...prev,
      [name]: numberFields.includes(name)
        ? value === ""
          ? 0
          : Number(value)
        : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };
  const toggleFeature = (id: number) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.includes(id)
        ? prev.features.filter((f) => f !== id) // remove
        : [...prev.features, id], // add
    }));
  };
  return (
    <section>
      <div>
        <div>
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {language === "ar" ? "تفاصيل العقار" : "Property Details"}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {language === "ar"
                ? "املأ جميع البيانات المطلوبة لعرض عقارك"
                : "Fill in all required information to list your property"}
            </p>
          </div>
          <div>
            <form className="space-y-4">
              {/* Titles */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {language === "ar" ? "عنوان العقار *" : "Property Title *"}
                  <input
                    type="text"
                    name="titleAr"
                    value={formData.titleAr}
                    onChange={handleInputChange}
                    placeholder="عنوان العقار بالعربية"
                    className="w-full p-3 border rounded-lg mt-1"
                  />
                  {errors.titleAr && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.titleAr}
                    </p>
                  )}
                </label>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {language === "ar" ? "عنوان العقار *" : "Property Title *"}
                  <input
                    type="text"
                    name="titleEn"
                    value={formData.titleEn}
                    onChange={handleInputChange}
                    placeholder="Property Title in English"
                    className="w-full p-3 border rounded-lg mt-1"
                  />
                  {errors.titleEn && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.titleEn}
                    </p>
                  )}
                </label>
              </div>

              {/* Project */}
              <div className="grid gap-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {language === "ar" ? "المشروع *" : "Project *"}
                  <select
                    name="projectId"
                    value={formData.projectId}
                    onChange={handleInputChange}
                    className="w-full p-3 border rounded-lg">
                    <option value="">
                      {language === "ar" ? "اختر مشروع" : "Select Project"}
                    </option>
                    {Array.isArray(projects) &&
                      projects.map((p) => {
                        const project = p as {
                          project_id: number | string;
                          name: string;
                        };
                        return (
                          <option
                            key={project.project_id}
                            value={project.project_id}>
                            {project.name}
                          </option>
                        );
                      })}
                  </select>
                  {errors.projectId && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.projectId}
                    </p>
                  )}
                </label>
              </div>

              {/* Price + Area */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {language === "ar" ? "السعر بالجنيه" : "Price (EGP)"}
                  <input
                    type="number"
                    name="priceAmount"
                    value={formData.priceAmount}
                    onChange={handleInputChange}
                    placeholder={
                      language === "ar" ? "السعر بالجنيه" : "Price (EGP)"
                    }
                    className="w-full p-3 border rounded-lg"
                  />
                  {errors.priceAmount && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.priceAmount}
                    </p>
                  )}
                </label>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {language === "ar" ? "المساحة (م²)" : "Area (m²)"}
                  <input
                    type="number"
                    name="areaSqm"
                    value={formData.areaSqm}
                    onChange={handleInputChange}
                    placeholder={
                      language === "ar" ? "المساحة (م²)" : "Area (m²)"
                    }
                    className="w-full p-3 border rounded-lg"
                  />
                  {errors.areaSqm && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.areaSqm}
                    </p>
                  )}
                </label>
              </div>

              {/* Address */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {language === "ar"
                    ? "العنوان (بالعربية)"
                    : "Address (in Arabic)"}

                  <input
                    type="text"
                    name="addressAr"
                    value={formData.addressAr}
                    onChange={handleInputChange}
                    placeholder="العنوان بالعربية"
                    className="w-full p-3 border rounded-lg"
                  />
                  {errors.addressAr && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.addressAr}
                    </p>
                  )}
                </label>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {language === "ar"
                    ? "العنوان (بالإنجليزية)"
                    : "Address (in English)"}

                  <input
                    type="text"
                    name="addressEn"
                    value={formData.addressEn}
                    onChange={handleInputChange}
                    placeholder="Address in English"
                    className="w-full p-3 border rounded-lg"
                  />
                  {errors.addressEn && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.addressEn}
                    </p>
                  )}
                </label>
              </div>

              {/* Description */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {language === "ar"
                    ? "الوصف (بالعربية)"
                    : "Description (in Arabic)"}

                  <textarea
                    name="descriptionAr"
                    value={formData.descriptionAr}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="الوصف بالعربية"
                    className="w-full p-3 border rounded-lg"
                  />
                  {errors.descriptionAr && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.descriptionAr}
                    </p>
                  )}
                </label>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {language === "ar"
                    ? "الوصف (بالإنجليزية)"
                    : "Description (in English)"}

                  <textarea
                    name="descriptionEn"
                    value={formData.descriptionEn}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Description in English"
                    className="w-full p-3 border rounded-lg"
                  />
                  {errors.descriptionEn && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.descriptionEn}
                    </p>
                  )}
                </label>
              </div>

              {/* Rooms */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {language === "ar" ? "عدد الغرف" : "Bedrooms"}

                  <input
                    type="number"
                    name="bedrooms"
                    value={formData.bedrooms}
                    onChange={handleInputChange}
                    placeholder={language === "ar" ? "عدد الغرف" : "Bedrooms"}
                    className="w-full p-3 border rounded-lg"
                  />
                  {errors.bedrooms && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.bedrooms}
                    </p>
                  )}
                </label>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {language === "ar" ? "عدد الحمامات" : "Bathrooms"}

                  <input
                    type="number"
                    name="bathrooms"
                    value={formData.bathrooms}
                    onChange={handleInputChange}
                    placeholder={
                      language === "ar" ? "عدد الحمامات" : "Bathrooms"
                    }
                    className="w-full p-3 border rounded-lg"
                  />
                  {errors.bathrooms && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.bathrooms}
                    </p>
                  )}
                </label>
              </div>

              {/* Contact */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {language === "ar" ? "الاسم" : "Name"}

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder={language === "ar" ? "الاسم" : "Name"}
                    className="w-full p-3 border rounded-lg"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.name}
                    </p>
                  )}
                </label>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {language === "ar" ? "رقم الهاتف" : "Phone Number"}

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+20 1234567890"
                    className="w-full p-3 border rounded-lg"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.phone}
                    </p>
                  )}
                </label>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {language === "ar" ? "البريد الإلكتروني" : "Email"}

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    className="w-full p-3 border rounded-lg"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.email}
                    </p>
                  )}
                </label>
              </div>

              {/* Listing type, status, available_from */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {language === "ar" ? "بيع" : "For Sale"}

                  <select
                    name="listingType"
                    value={formData.listingType}
                    onChange={handleInputChange}
                    className="w-full p-3 border rounded-lg">
                    <option value="sale">
                      {language === "ar" ? "بيع" : "For Sale"}
                    </option>
                    <option value="rent">
                      {language === "ar" ? "إيجار" : "For Rent"}
                    </option>
                  </select>
                  {errors.listingType && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.listingType}
                    </p>
                  )}
                </label>

                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {language === "ar" ? "تاريخ التوفر" : "Available From"}

                  <input
                    type="date"
                    name="availableFrom"
                    value={formData.availableFrom}
                    onChange={handleInputChange}
                    className="w-full p-3 border rounded-lg"
                  />
                  {errors.availableFrom && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.availableFrom}
                    </p>
                  )}
                </label>
              </div>

              {/* Features */}
              <div>
                <h3 className="font-bold mb-2">
                  {language === "ar" ? "المميزات" : "Features"}
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {featuresList.map((f) => (
                    <label key={f.id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.features.includes(f.id)}
                        onChange={() => toggleFeature(f.id)}
                      />

                      <span className="text-xl">{f.icon}</span>

                      <span>{language === "ar" ? f.nameAr : f.nameEn}</span>
                    </label>
                  ))}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyForm;
