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

interface PropertyFormData {
  title: string;
  propertyType: string;
  price: string;
  area: string;
  location: string;
  description: string;
  bedrooms: string;
  bathrooms: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  images: File[];
}

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
}

const SellProperty: React.FC = () => {
  const { language } = useLanguage();
  // Mock authentication state - replace with your actual auth logic
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [formData, setFormData] = useState<PropertyFormData>({
    title: "",
    propertyType: "",
    price: "",
    area: "",
    location: "",
    description: "",
    bedrooms: "",
    bathrooms: "",
    contactName: user?.name || "",
    contactPhone: user?.phone || "",
    contactEmail: user?.email || "",
    images: [],
  });
  useEffect(() => {
    // Get token from localStorage if exists
    const token = localStorage.getItem("token");

    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

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
  const handleLogin = (email: string, password: string) => {
    // Simulate login
    setIsAuthenticated(true);
    setUser({
      id: "1",
      name: "Ahmed Mohamed",
      email: email,
      phone: "+20 1234567890",
    });
    setFormData((prev) => ({
      ...prev,
      contactName: "Ahmed Mohamed",
      contactPhone: "+20 1234567890",
      contactEmail: email,
    }));
    setShowLoginForm(false);
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.title.trim()) {
      newErrors.title =
        language === "ar" ? "عنوان العقار مطلوب" : "Property title is required";
    }

    if (!formData.propertyType) {
      newErrors.propertyType =
        language === "ar" ? "نوع العقار مطلوب" : "Property type is required";
    }

    if (!formData.price.trim()) {
      newErrors.price = language === "ar" ? "السعر مطلوب" : "Price is required";
    } else if (isNaN(Number(formData.price))) {
      newErrors.price =
        language === "ar"
          ? "السعر يجب أن يكون رقماً"
          : "Price must be a number";
    }

    if (!formData.area.trim()) {
      newErrors.area =
        language === "ar" ? "المساحة مطلوبة" : "Area is required";
    }

    if (!formData.location.trim()) {
      newErrors.location =
        language === "ar" ? "الموقع مطلوب" : "Location is required";
    }

    if (!formData.description.trim()) {
      newErrors.description =
        language === "ar" ? "الوصف مطلوب" : "Description is required";
    }

    if (!formData.contactName.trim()) {
      newErrors.contactName =
        language === "ar"
          ? "اسم جهة الاتصال مطلوب"
          : "Contact name is required";
    }

    if (!formData.contactPhone.trim()) {
      newErrors.contactPhone =
        language === "ar" ? "رقم الهاتف مطلوب" : "Phone number is required";
    }

    if (!formData.contactEmail.trim()) {
      newErrors.contactEmail =
        language === "ar" ? "البريد الإلكتروني مطلوب" : "Email is required";
    }

    if (formData.images.length === 0) {
      newErrors.images =
        language === "ar"
          ? "يجب رفع صورة واحدة على الأقل"
          : "At least one image is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleImageUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...files].slice(0, 6), // Max 6 images
      }));

      if (errors.images) {
        setErrors((prev) => ({
          ...prev,
          images: "",
        }));
      }
    },
    [errors.images]
  );

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Property submitted:", formData);
      setIsSubmitted(true);

      // Reset form after success
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          title: "",
          propertyType: "",
          price: "",
          area: "",
          location: "",
          description: "",
          bedrooms: "",
          bathrooms: "",
          contactName: user?.name || "",
          contactPhone: user?.phone || "",
          contactEmail: user?.email || "",
          images: [],
        });
      }, 3000);
    } catch (error) {
      console.error("Error submitting property:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show login form if not authenticated
  if (!isAuthenticated && !showLoginForm) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
          <div className="mb-6">
            <Building className="h-16 w-16 text-blue-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {language === "ar" ? "تسجيل الدخول مطلوب" : "Login Required"}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {language === "ar"
                ? "يجب تسجيل الدخول أولاً لإضافة عقارك للبيع"
                : "You need to login first to list your property for sale"}
            </p>
          </div>

          <button
            onClick={() => setShowLoginForm(true)}
            className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-green-700 transition-all duration-300 mb-4">
            {language === "ar" ? "تسجيل الدخول" : "Login / Sign Up"}
          </button>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            {language === "ar"
              ? "بعد تسجيل الدخول، ستتم إعادة توجيهك لنموذج إضافة العقار"
              : "After login, you will be redirected to the property listing form"}
          </p>
        </div>
      </div>
    );
  }

  // Simple login form (replace with your actual login component)
  if (showLoginForm) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            {language === "ar" ? "تسجيل الدخول" : "Login"}
          </h2>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target as HTMLFormElement);
              handleLogin(
                formData.get("email") as string,
                formData.get("password") as string
              );
            }}>
            <div className="space-y-4">
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder={
                    language === "ar" ? "البريد الإلكتروني" : "Email"
                  }
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
              </div>
              <div>
                <input
                  type="password"
                  name="password"
                  placeholder={language === "ar" ? "كلمة المرور" : "Password"}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-green-700 transition-all duration-300">
                {language === "ar" ? "تسجيل الدخول" : "Login"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

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
              <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-4 text-center">
                <p className="text-blue-700 dark:text-blue-300 font-medium">
                  {language === "ar"
                    ? 'ستتم إعادة توجيهك إلى صفحة "عقاراتي" قريباً'
                    : 'You will be redirected to "My Listings" page soon'}
                </p>
              </div>
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

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Basic Information */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    {language === "ar"
                      ? "المعلومات الأساسية"
                      : "Basic Information"}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {language === "ar"
                          ? "عنوان العقار *"
                          : "Property Title *"}
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-600 text-gray-900 dark:text-white ${
                          errors.title
                            ? "border-red-500"
                            : "border-gray-300 dark:border-gray-500"
                        }`}
                        placeholder={
                          language === "ar"
                            ? "مثال: شقة فاخرة في العاصمة الإدارية"
                            : "e.g., Luxury Apartment in New Capital"
                        }
                      />
                      {errors.title && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.title}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {language === "ar" ? "نوع العقار *" : "Property Type *"}
                      </label>
                      <select
                        name="propertyType"
                        value={formData.propertyType}
                        onChange={handleInputChange}
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-600 text-gray-900 dark:text-white ${
                          errors.propertyType
                            ? "border-red-500"
                            : "border-gray-300 dark:border-gray-500"
                        }`}>
                        {propertyTypes.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                      {errors.propertyType && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.propertyType}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {language === "ar"
                          ? "السعر (جنيه مصري) *"
                          : "Price (EGP) *"}
                      </label>
                      <input
                        type="text"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-600 text-gray-900 dark:text-white ${
                          errors.price
                            ? "border-red-500"
                            : "border-gray-300 dark:border-gray-500"
                        }`}
                        placeholder={language === "ar" ? "2500000" : "2500000"}
                      />
                      {errors.price && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.price}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {language === "ar"
                          ? "المساحة (متر مربع) *"
                          : "Area (m²) *"}
                      </label>
                      <input
                        type="number"
                        name="area"
                        value={formData.area}
                        onChange={handleInputChange}
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-600 text-gray-900 dark:text-white ${
                          errors.area
                            ? "border-red-500"
                            : "border-gray-300 dark:border-gray-500"
                        }`}
                        placeholder="150"
                      />
                      {errors.area && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.area}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {language === "ar" ? "الموقع *" : "Location *"}
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-600 text-gray-900 dark:text-white ${
                          errors.location
                            ? "border-red-500"
                            : "border-gray-300 dark:border-gray-500"
                        }`}
                        placeholder={
                          language === "ar"
                            ? "العاصمة الإدارية الجديدة"
                            : "New Administrative Capital"
                        }
                      />
                      {errors.location && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.location}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          {language === "ar" ? "عدد الغرف" : "Bedrooms"}
                        </label>
                        <input
                          type="number"
                          name="bedrooms"
                          value={formData.bedrooms}
                          onChange={handleInputChange}
                          className="w-full p-3 border border-gray-300 dark:border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-600 text-gray-900 dark:text-white"
                          placeholder="3"
                          min="0"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          {language === "ar" ? "عدد الحمامات" : "Bathrooms"}
                        </label>
                        <input
                          type="number"
                          name="bathrooms"
                          value={formData.bathrooms}
                          onChange={handleInputChange}
                          className="w-full p-3 border border-gray-300 dark:border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-600 text-gray-900 dark:text-white"
                          placeholder="2"
                          min="0"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    {language === "ar" ? "وصف العقار" : "Property Description"}
                  </h3>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {language === "ar"
                        ? "الوصف التفصيلي *"
                        : "Detailed Description *"}
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={6}
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-600 text-gray-900 dark:text-white ${
                        errors.description
                          ? "border-red-500"
                          : "border-gray-300 dark:border-gray-500"
                      }`}
                      placeholder={
                        language === "ar"
                          ? "اكتب وصفاً تفصيلياً للعقار يشمل المميزات والخدمات المتاحة..."
                          : "Write a detailed description of the property including features and available services..."
                      }
                    />
                    {errors.description && (
                      <p className="text-red-500 text-sm mt-1 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.description}
                      </p>
                    )}
                  </div>
                </div>

                {/* Images Upload */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    {language === "ar" ? "صور العقار" : "Property Images"}
                  </h3>

                  <div className="space-y-4">
                    <div
                      className={`border-2 border-dashed rounded-lg p-6 text-center ${
                        errors.images
                          ? "border-red-500"
                          : "border-gray-300 dark:border-gray-500"
                      }`}>
                      <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {language === "ar"
                          ? "اسحب الصور هنا أو انقر لاختيار الملفات"
                          : "Drag images here or click to select files"}
                      </p>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition-colors duration-300 inline-flex items-center space-x-2 rtl:space-x-reverse">
                        <Plus className="h-4 w-4" />
                        <span>
                          {language === "ar" ? "اختر الصور" : "Choose Images"}
                        </span>
                      </label>
                    </div>

                    {errors.images && (
                      <p className="text-red-500 text-sm flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.images}
                      </p>
                    )}

                    {formData.images.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {formData.images.map((image, index) => (
                          <div key={index} className="relative group">
                            <Image
                              src={URL.createObjectURL(image)}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-32 object-cover rounded-lg"
                              width={300}
                              height={128}
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Contact Information */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    {language === "ar"
                      ? "معلومات التواصل"
                      : "Contact Information"}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {language === "ar" ? "الاسم *" : "Name *"}
                      </label>
                      <input
                        type="text"
                        name="contactName"
                        value={formData.contactName}
                        onChange={handleInputChange}
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-600 text-gray-900 dark:text-white ${
                          errors.contactName
                            ? "border-red-500"
                            : "border-gray-300 dark:border-gray-500"
                        }`}
                        placeholder={
                          language === "ar" ? "اسمك الكامل" : "Your full name"
                        }
                      />
                      {errors.contactName && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.contactName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {language === "ar" ? "رقم الهاتف *" : "Phone Number *"}
                      </label>
                      <input
                        type="tel"
                        name="contactPhone"
                        value={formData.contactPhone}
                        onChange={handleInputChange}
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-600 text-gray-900 dark:text-white ${
                          errors.contactPhone
                            ? "border-red-500"
                            : "border-gray-300 dark:border-gray-500"
                        }`}
                        placeholder="+20 1234567890"
                      />
                      {errors.contactPhone && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.contactPhone}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {language === "ar" ? "البريد الإلكتروني *" : "Email *"}
                      </label>
                      <input
                        type="email"
                        name="contactEmail"
                        value={formData.contactEmail}
                        onChange={handleInputChange}
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-600 text-gray-900 dark:text-white ${
                          errors.contactEmail
                            ? "border-red-500"
                            : "border-gray-300 dark:border-gray-500"
                        }`}
                        placeholder="your.email@example.com"
                      />
                      {errors.contactEmail && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.contactEmail}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="text-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`bg-gradient-to-r from-blue-600 to-green-600 text-white py-4 px-8 rounded-lg font-semibold text-lg transition-all duration-300 ${
                      isSubmitting
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:from-blue-700 hover:to-green-700 transform hover:-translate-y-1"
                    }`}>
                    {isSubmitting ? (
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>
                          {language === "ar"
                            ? "جاري الإرسال..."
                            : "Submitting..."}
                        </span>
                      </div>
                    ) : (
                      <>
                        {language === "ar"
                          ? "إرسال العقار للمراجعة"
                          : "Submit Property for Review"}
                      </>
                    )}
                  </button>

                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                    {language === "ar"
                      ? "سيتم مراجعة عقارك خلال 24-48 ساعة"
                      : "Your property will be reviewed within 24-48 hours"}
                  </p>
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
