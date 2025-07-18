"use client";

import React from "react";
import { MapPin, Bed, Bath, Square, Eye } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

const Properties: React.FC = () => {
  const { language, t } = useLanguage();

  const properties = [
    {
      id: 1,
      title:
        language === "ar"
          ? "شقة فاخرة في العاصمة الإدارية"
          : "Luxury Apartment in New Capital",
      location:
        language === "ar"
          ? "العاصمة الإدارية الجديدة"
          : "New Administrative Capital",
      price: 2500000,
      area: 150,
      bedrooms: 3,
      bathrooms: 2,
      image:
        "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
      type: language === "ar" ? "سكني" : "Residential"
    },
    {
      id: 2,
      title:
        language === "ar"
          ? "فيلا حديثة في الشيخ زايد"
          : "Modern Villa in Sheikh Zayed",
      location: language === "ar" ? "الشيخ زايد، الجيزة" : "Sheikh Zayed, Giza",
      price: 4200000,
      area: 300,
      bedrooms: 4,
      bathrooms: 3,
      image:
        "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg",
      type: language === "ar" ? "سكني" : "Residential",
    },
    {
      id: 3,
      title:
        language === "ar"
          ? "مكتب تجاري في وسط البلد"
          : "Commercial Office Downtown",
      location: language === "ar" ? "وسط البلد، القاهرة" : "Downtown, Cairo",
      price: 1800000,
      area: 120,
      bedrooms: 0,
      bathrooms: 2,
      image: "https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg",
      type: language === "ar" ? "تجاري" : "Commercial",
    },
    {
      id: 4,
      title:
        language === "ar"
          ? "شقة بإطلالة بحرية في الإسكندرية"
          : "Sea View Apartment in Alexandria",
      location: language === "ar" ? "الإسكندرية" : "Alexandria",
      price: 3200000,
      area: 180,
      bedrooms: 3,
      bathrooms: 2,
      image:
        "https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg",
      type: language === "ar" ? "سكني" : "Residential",
    },
    {
      id: 5,
      title:
        language === "ar"
          ? "أرض للبيع في القاهرة الجديدة"
          : "Land for Sale in New Cairo",
      location: language === "ar" ? "القاهرة الجديدة" : "New Cairo",
      price: 5000000,
      area: 500,
      bedrooms: 0,
      bathrooms: 0,
      image:
        "https://images.pexels.com/photos/1546168/pexels-photo-1546168.jpeg",
      type: language === "ar" ? "أرض" : "Land",
    },
    {
      id: 6,
      title:
        language === "ar"
          ? "مجمع تجاري في مدينة نصر"
          : "Commercial Complex in Nasr City",
      location: language === "ar" ? "مدينة نصر، القاهرة" : "Nasr City, Cairo",
      price: 8500000,
      area: 600,
      bedrooms: 0,
      bathrooms: 4,
      image: "https://images.pexels.com/photos/273209/pexels-photo-273209.jpeg",
      type: language === "ar" ? "تجاري" : "Commercial",
    },
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(language === "ar" ? "ar-EG" : "en-EG").format(
      price
    );
  };

  return (
    <section id="properties" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {t("properties.title")}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t("properties.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="relative h-64 overflow-hidden">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {property.type}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="bg-white text-gray-900 px-3 py-1 rounded-full text-sm font-bold">
                    {formatPrice(property.price)} {t("properties.price")}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                  {property.title}
                </h3>

                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span className="text-sm">{property.location}</span>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <Square className="h-5 w-5 mx-auto mb-1 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      {property.area} {t("properties.area")}
                    </span>
                  </div>
                  {property.bedrooms > 0 && (
                    <div className="text-center">
                      <Bed className="h-5 w-5 mx-auto mb-1 text-gray-500" />
                      <span className="text-sm text-gray-600">
                        {property.bedrooms} {t("properties.bedrooms")}
                      </span>
                    </div>
                  )}
                  {property.bathrooms > 0 && (
                    <div className="text-center">
                      <Bath className="h-5 w-5 mx-auto mb-1 text-gray-500" />
                      <span className="text-sm text-gray-600">
                        {property.bathrooms} {t("properties.bathrooms")}
                      </span>
                    </div>
                  )}
                </div>

                <button className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-green-700 transition-all duration-300 flex items-center justify-center space-x-2 rtl:space-x-reverse">
                  <Eye className="h-5 w-5" />
                  <span>{t("properties.view.details")}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Properties;
