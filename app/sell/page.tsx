"use client";

import React, { useState, useEffect } from "react";
import { AlertCircle, Camera, CheckCircle, Plus, X } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  createProperty,
  uploadPropertyPhotos,
} from "@/services/properties/property.service";
import { PropertyFormData } from "@/types/PropertyForms";
import PropertyForm from "../components/PropertyForm";
import HeroSectionSellProperty from "../components/HeroSectionSellProperty";
import { toast } from "@/hooks/use-toast";

const SellProperty: React.FC = () => {
  const { language } = useLanguage();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();
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
    availableFrom: "2025-08-12",
    floor: 1,
    totalFloors: 5,

    features: [],
  });

  const [images, setImages] = useState<File[]>([]);
  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImages((prev) => [...prev, ...files].slice(0, 6)); // Max 6
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.titleAr.trim()) {
      newErrors.titleAr =
        language === "ar" ? "عنوان العقار مطلوب" : "Property title is required";
    }

    if (!formData.titleEn.trim()) {
      newErrors.titleEn =
        language === "ar"
          ? "Property title in English is required"
          : "Property title in English is required";
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
        language === "ar"
          ? "المساحة مطلوبة ويجب أن تكون رقماً"
          : "Area is required and must be a number";
    }

    if (!formData.addressAr.trim()) {
      newErrors.addressAr =
        language === "ar"
          ? "العنوان بالعربية مطلوب"
          : "Address in Arabic is required";
    }

    if (!formData.addressEn.trim()) {
      newErrors.addressEn =
        language === "ar"
          ? "العنوان بالإنجليزية مطلوب"
          : "Address in English is required";
    }

    if (!formData.descriptionAr.trim()) {
      newErrors.descriptionAr =
        language === "ar"
          ? "الوصف بالعربية مطلوب"
          : "Description in Arabic is required";
    }

    if (!formData.descriptionEn.trim()) {
      newErrors.descriptionEn =
        language === "ar"
          ? "الوصف بالإنجليزية مطلوب"
          : "Description in English is required";
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
    } else if (
      !/^\d{11}$/.test(formData.phone.trim()) &&
      !/^\+20\d{10}$/.test(formData.phone.trim())
    ) {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      console.log("Form validation failed");
      console.log(validateForm());
      return;
    }

    try {
      console.log(formData);
      const res = await createProperty(formData);
      console.log("Response from createProperty:", res);
      if (res?.status === 401) {
        router.push("/signin");
        return;
      }
      if (res?.status !== 200 && res?.status !== 201) {
        toast({ description: language === "ar" ? "حدث خطأ أثناء إنشاء العقار" : "Error creating property", variant: "destructive" });
        return;
      }
      console.log("Property submitted:", formData);

      const propertyId = res?.propertyId;
      console.log("Property ID:", propertyId);
      console.log("images.length:", images.length);

      if (propertyId && images.length > 0) {
        await uploadPropertyPhotos(propertyId, images);
      }

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
          listingType: "sale",
          status: "inactive",
          availableFrom: "2025-08-12",
          floor: 1,
          totalFloors: 5,
          features: [],
        });
      }, 3000);
    } catch (error) {
      console.error("Error submitting property:", error);
    }
  };

  // Show login form if not authenticated
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/signin");
  }, [router]);

  return (
    <>
      {/* Hero Section */}
      <HeroSectionSellProperty />
      {/* Main Form Section */}
      <div className="py-16">
        <form onSubmit={handleSubmit}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
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
                <>
                  <PropertyForm
                    formData={formData}
                    setFormData={setFormData}
                    errors={errors}
                    setErrors={setErrors}
                  />

                  <div className="rounded-xl py-8">
                    <h3 className="font-bold mb-5">
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

                      {errors.photos && (
                        <p className="text-red-500 text-sm flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.photos}
                        </p>
                      )}

                      {images.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {images.map((image, index) => (
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
                </>
              )}
              {!isSubmitted && (
                <div className="text-center">
                  <button
                    type="submit"
                    disabled={isSubmitted}
                    className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-4 px-8 rounded-lg font-semibold text-lg">
                    {isSubmitted
                      ? language === "ar"
                        ? "جاري الإرسال..."
                        : "Submitting..."
                      : language === "ar"
                      ? "إرسال العقار"
                      : "Submit Property"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default SellProperty;
