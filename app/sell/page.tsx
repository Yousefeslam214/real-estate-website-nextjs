"use client";

import React, { useState, useCallback, useEffect } from "react";
import {
  CheckCircle,
  X,
  Building,
  Home,
  Factory,
  Mountain,
  Store,
  AlertCircle,
  Camera,
  Plus,
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createProperty } from "@/services/properties/property.service";
import useSWR from "swr";
import { baseUrl } from "@/services/shared/apiUrl";
import { fetcher } from "@/services/shared/fetcher";
import { ApiResponse } from "@/types/api";
import toast from "react-hot-toast";

interface PropertyFormData {
  titleAr: string;
  titleEn: string;
  propertyTypeId: number;
  projectId: number;
  priceAmount: number;
  areaSqm: number;
  addressEn: string;
  addressAr: string;
  descriptionEn: string;
  descriptionAr: string;
  bedrooms: number;
  bathrooms: number;
  name: string;
  phone: string;
  email: string;
  listingType: string;
  status: "inactive";
  available_from: string;
  features: number[];
}

const SellProperty: React.FC = () => {
  const { language } = useLanguage();
  // Mock authentication state - replace with your actual auth logic
  // const [user, setUser] = useState<User | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();

  const { data } = useSWR<ApiResponse>(
    `${baseUrl}/properties/getAvailableProjects`,
    fetcher
  );
  const projects = data?.data;
  console.log("projects", projects);

  // name:  "Capital Gardens"
  // project_id: 14

  const [formData, setFormData] = useState<PropertyFormData>({
    titleAr: "",
    titleEn: "",
    propertyTypeId: 1,
    projectId: 8,
    priceAmount: 0,
    areaSqm: 0,
    addressEn: "",
    addressAr: "",
    descriptionEn: "",
    descriptionAr: "",
    bedrooms: 0,
    bathrooms: 0,
    name: "",
    phone: "",
    email: "",
    listingType: "sale",
    status: "inactive",
    available_from: "2025-08-12",
    features: [],
  });

  const propertyTypes = [
    {
      value: "",
      label: language === "ar" ? "اختر نوع العقار" : "Select Property Type",
      icon: Building,
    },
    {
      value: "apartment",
      label: language === "ar" ? "شقة" : "Apartment",
      icon: Building,
    },
    {
      value: "villa",
      label: language === "ar" ? "فيلا" : "Villa",
      icon: Home,
    },
    {
      value: "office",
      label: language === "ar" ? "مكتب" : "Office",
      icon: Building,
    },
    {
      value: "shop",
      label: language === "ar" ? "محل تجاري" : "Shop",
      icon: Store,
    },
    {
      value: "warehouse",
      label: language === "ar" ? "مستودع" : "Warehouse",
      icon: Factory,
    },
    {
      value: "land",
      label: language === "ar" ? "أرض" : "Land",
      icon: Mountain,
    },
  ];

  // Mock login function - replace with your actual authentication

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.titleAr.trim()) {
      newErrors.titleAr =
        language === "ar" ? "عنوان العقار مطلوب" : "Property title is required";
    }

    if (!formData.titleEn.trim()) {
      newErrors.titleEn =
        language === "ar" ? "Property title in English is required" : "Property title in English is required";
    }

    if (!formData.propertyTypeId) {
      newErrors.propertyTypeId =
        language === "ar" ? "نوع العقار مطلوب" : "Property type is required";
    }

    if (!formData.priceAmount || isNaN(Number(formData.priceAmount))) {
      newErrors.priceAmount =
        language === "ar"
          ? "السعر مطلوب ويجب أن يكون رقماً"
          : "Price is required and must be a number";
    }

    if (!formData.areaSqm || isNaN(Number(formData.areaSqm))) {
      newErrors.areaSqm =
        language === "ar" ? "المساحة مطلوبة ويجب أن تكون رقماً" : "Area is required and must be a number";
    }

    if (!formData.addressAr.trim()) {
      newErrors.addressAr =
        language === "ar" ? "العنوان بالعربية مطلوب" : "Address in Arabic is required";
    }

    if (!formData.addressEn.trim()) {
      newErrors.addressEn =
        language === "ar" ? "العنوان بالإنجليزية مطلوب" : "Address in English is required";
    }

    if (!formData.descriptionAr.trim()) {
      newErrors.descriptionAr =
        language === "ar" ? "الوصف بالعربية مطلوب" : "Description in Arabic is required";
    }

    if (!formData.descriptionEn.trim()) {
      newErrors.descriptionEn =
        language === "ar" ? "الوصف بالإنجليزية مطلوب" : "Description in English is required";
    }

    if (!formData.name.trim()) {
      newErrors.name =
        language === "ar"
          ? "اسم جهة الاتصال مطلوب"
          : "Contact name is required";
    }

    if (!formData.phone.trim()) {
      newErrors.phone =
      language === "ar" ? "رقم الهاتف مطلوب" : "Phone number is required";
    } else if (!/^\d{11}$/.test(formData.phone.trim())) {
      newErrors.phone =
      language === "ar"
        ? "رقم الهاتف يجب أن يكون 11 رقمًا"
        : "Phone number must be 11 digits";
    }

    if (!formData.email.trim()) {
      newErrors.email =
        language === "ar" ? "البريد الإلكتروني مطلوب" : "Email is required";
    }

    // if (formData.images.length === 0) {
    //   newErrors.images =
    //     language === "ar"
    //       ? "يجب رفع صورة واحدة على الأقل"
    //       : "At least one image is required";
    // }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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

  // const handleImageUpload = useCallback(
  //   (e: React.ChangeEvent<HTMLInputElement>) => {
  //     const files = Array.from(e.target.files || []);
  //     setFormData((prev) => ({
  //       ...prev,
  //       images: [...prev.images, ...files].slice(0, 6), // Max 6 images
  //     }));

  //     if (errors.images) {
  //       setErrors((prev) => ({
  //         ...prev,
  //         images: "",
  //       }));
  //     }
  //   },
  //   [errors.images]
  // );

  // const removeImage = (index: number) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     images: prev.images.filter((_, i) => i !== index),
  //   }));
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    try {
      console.log(formData);
      const res = await createProperty(formData);
      if (res?.status === 401) {
        router.push("/signin");
        return;
      }
      console.log("Property submitted:", formData);
      setIsSubmitted(true);

      // Reset form after success
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          titleAr: "",
          titleEn: "",
          propertyTypeId: 1,
          projectId: 8,
          priceAmount: 0,
          areaSqm: 0,
          addressEn: "",
          addressAr: "",
          descriptionEn: "",
          descriptionAr: "",
          bedrooms: 0,
          bathrooms: 0,
          name: "",
          phone: "",
          email: "",
          listingType: "",
          status: "inactive",
          available_from: "",
          features: [],
          // images: [],
        });
      }, 3000);
    } catch (error) {
      console.error("Error submitting property:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show login form if not authenticated
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/signin");
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 to-green-600 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Building className="h-16 w-16 text-white mx-auto mb-6" />
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            {language === "ar" ? "اعرض عقارك للبيع" : "Sell Your Property"}
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-blue-100 dark:text-blue-200">
            {language === "ar"
              ? "أضف عقارك على منصتنا واصل إلى آلاف المشترين المحتملين"
              : "List your property on our platform and reach thousands of potential buyers"}
          </p>
        </div>
      </section>

      {/* Main Form Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {isSubmitted ? (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
              <CheckCircle className="h-24 w-24 text-green-500 mx-auto mb-6 animate-bounce" />
              <h2 className="text-3xl font-bold text-green-600 mb-4">
                {language === "ar"
                  ? "🎉 تم إرسال عقارك بنجاح!"
                  : "🎉 Property Submitted Successfully!"}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                {language === "ar"
                  ? "تم إرسال عقارك وهو قيد المراجعة. سنتواصل معك قريباً."
                  : "Your property has been submitted and is pending approval. We will contact you soon."}
              </p>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
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

              <form onSubmit={handleSubmit} className="space-y-4">
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
                        projects.map((p) => (
                          <option key={p.project_id} value={p.project_id}>
                            {p.name}
                          </option>
                        ))}
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
                      name="available_from"
                      value={formData.available_from}
                      onChange={handleInputChange}
                      className="w-full p-3 border rounded-lg"
                    />
                    {errors.available_from && (
                      <p className="text-red-500 text-sm mt-1 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.available_from}
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
                    {/* {featuresList.map((f) => (
                      <label key={f.id} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={formData.features.includes(f.id)}
                          onChange={() => toggleFeature(f.id)}
                        />
                        <span>{language === "ar" ? f.labelAr : f.labelEn}</span>
                      </label>
                    ))} */}
                  </div>
                </div>

                {/* Submit */}
                <div className="text-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-4 px-8 rounded-lg font-semibold text-lg">
                    {isSubmitting
                      ? language === "ar"
                        ? "جاري الإرسال..."
                        : "Submitting..."
                      : language === "ar"
                      ? "إرسال العقار"
                      : "Submit Property"}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default SellProperty;
