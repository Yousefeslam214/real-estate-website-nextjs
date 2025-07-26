"use client";

import React, { useState } from "react";
import {
  MapPin,
  Bed,
  Bath,
  Square,
  Calendar,
  Phone,
  Mail,
  Heart,
  Share2,
  Camera,
  Car,
  Wifi,
  Dumbbell,
  Shield,
  TreePine,
  Building,
} from "lucide-react";

import { useParams } from "next/navigation";
import { useLanguage } from "../contexts/LanguageContext";
import Header from "./Header";
import Footer from "./Footer";

const PropertyDetailsPage: React.FC = () => {
  const { language, t } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const params = useParams();
  console.log("params", params); // Check shape

  const slug = typeof params.slug === "string" ? params.slug : "apartment-1";
  const slugArray = Array.isArray(params.slug)
    ? params.slug
    : params.slug
    ? [params.slug]
    : ["apartment-1"];
  // Mock property data - in real app this would come from API based on slug
  const property = {
    id: slugArray[0],
    title:
      language === "ar"
        ? "شقة فاخرة في العلمين - الحي اللاتيني"
        : "Luxury Apartment in Alamain - Latin District",
    location:
      language === "ar"
        ? "العلمين، الساحل الشمالي، الإسكندرية"
        : "Alamain, North Coast, Alexandria",
    fullAddress:
      language === "ar"
        ? "مبنى E03، الطابق الأرضي، الوحدة Z03-CL07-E03-X4-00-03"
        : "Building E03, Floor G, Unit Z03-CL07-E03-X4-00-03",
    price: 4500000,
    area: 180,
    bedrooms: 3,
    bathrooms: 2,
    floor: 0,
    totalFloors: 8,
    yearBuilt: 2023,
    propertyType: language === "ar" ? "شقة سكنية" : "Residential Apartment",
    status: language === "ar" ? "متاح للبيع" : "Available for Sale",
    images: [
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
      "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg",
      "https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg",
      "https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg",
      "https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg",
    ],
    features:
      language === "ar"
        ? [
            "إطلالة على البحر",
            "مطبخ مجهز بالكامل",
            "تكييف مركزي",
            "بلكونة واسعة",
            "موقف سيارة",
            "أمن 24/7",
            "حمام سباحة",
            "صالة رياضية",
            "حديقة",
            "إنترنت عالي السرعة",
          ]
        : [
            "Sea View",
            "Fully Fitted Kitchen",
            "Central Air Conditioning",
            "Spacious Balcony",
            "Parking Space",
            "24/7 Security",
            "Swimming Pool",
            "Gym",
            "Garden",
            "High-Speed Internet",
          ],
    description:
      language === "ar"
        ? "شقة فاخرة في موقع استراتيجي بالعلمين على الساحل الشمالي. تتميز الشقة بإطلالة بانورامية على البحر الأبيض المتوسط وتصميم عصري يجمع بين الأناقة والراحة. الشقة مجهزة بأحدث التقنيات والتشطيبات عالية الجودة. تقع في مجمع سكني متكامل يضم جميع الخدمات والمرافق الترفيهية."
        : "Luxury apartment in a strategic location in Alamain on the North Coast. The apartment features panoramic views of the Mediterranean Sea and modern design that combines elegance and comfort. The apartment is equipped with the latest technology and high-quality finishes. Located in an integrated residential complex with all services and recreational facilities.",
    agent: {
      name: language === "ar" ? "مها السيد" : "Maha El Sayed",
      phone: "+20 100 123 4567",
      email: "maha@realestate.gov.eg",
      image:
        "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg",
    },
    coordinates: { lat: 30.8418, lng: 28.9618 },
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(language === "ar" ? "ar-EG" : "en-EG").format(
      price
    );
  };

  const getFeatureIcon = (feature: string) => {
    const lowerFeature = feature.toLowerCase();
    if (lowerFeature.includes("car") || lowerFeature.includes("موقف"))
      return Car;
    if (lowerFeature.includes("wifi") || lowerFeature.includes("إنترنت"))
      return Wifi;
    if (lowerFeature.includes("gym") || lowerFeature.includes("رياضية"))
      return Dumbbell;
    if (lowerFeature.includes("security") || lowerFeature.includes("أمن"))
      return Shield;
    if (lowerFeature.includes("garden") || lowerFeature.includes("حديقة"))
      return TreePine;
    return Building;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Property Images Gallery */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Main Image */}
            <div className="lg:col-span-2">
              <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden">
                <img
                  src={property.images[currentImageIndex]}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 flex space-x-2 rtl:space-x-reverse">
                  <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {property.status}
                  </span>
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    ID: {property.id}
                  </span>
                </div>
                <div className="absolute top-4 right-4 flex space-x-2 rtl:space-x-reverse">
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={`p-2 rounded-full shadow-lg transition-colors duration-200 ${
                      isFavorite
                        ? "bg-red-500 text-white"
                        : "bg-white text-gray-600 hover:bg-gray-100"
                    }`}>
                    <Heart className="h-5 w-5" />
                  </button>
                  <button className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-200">
                    <Share2 className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
                <div className="absolute bottom-4 right-4">
                  <span className="bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm flex items-center">
                    <Camera className="h-4 w-4 mr-2" />
                    {currentImageIndex + 1} / {property.images.length}
                  </span>
                </div>
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="space-y-4">
              {property.images.slice(1, 5).map((image, index) => (
                <div
                  key={index}
                  className={`relative h-24 rounded-lg overflow-hidden cursor-pointer transition-all duration-200 ${
                    currentImageIndex === index + 1
                      ? "ring-2 ring-blue-500"
                      : "hover:opacity-80"
                  }`}
                  onClick={() => setCurrentImageIndex(index + 1)}>
                  <img
                    src={image}
                    alt={`Property ${index + 2}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Property Details */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Basic Info */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {property.title}
                    </h1>
                    <div className="flex items-center text-gray-600 mb-4">
                      <MapPin className="h-5 w-5 mr-2" />
                      <span>{property.location}</span>
                    </div>
                    <p className="text-sm text-gray-500">
                      {property.fullAddress}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {formatPrice(property.price)}{" "}
                      {language === "ar" ? "ج.م" : "EGP"}
                    </div>
                    <div className="text-sm text-gray-500">
                      {Math.round(
                        property.price / property.area
                      ).toLocaleString()}{" "}
                      {language === "ar" ? "ج.م/م²" : "EGP/m²"}
                    </div>
                  </div>
                </div>

                {/* Property Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Square className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                    <div className="text-2xl font-bold text-gray-900">
                      {property.area}
                    </div>
                    <div className="text-sm text-gray-600">
                      {language === "ar" ? "متر مربع" : "Square Meters"}
                    </div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Bed className="h-8 w-8 mx-auto mb-2 text-green-600" />
                    <div className="text-2xl font-bold text-gray-900">
                      {property.bedrooms}
                    </div>
                    <div className="text-sm text-gray-600">
                      {language === "ar" ? "غرف نوم" : "Bedrooms"}
                    </div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Bath className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                    <div className="text-2xl font-bold text-gray-900">
                      {property.bathrooms}
                    </div>
                    <div className="text-sm text-gray-600">
                      {language === "ar" ? "حمامات" : "Bathrooms"}
                    </div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Calendar className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                    <div className="text-2xl font-bold text-gray-900">
                      {property.yearBuilt}
                    </div>
                    <div className="text-sm text-gray-600">
                      {language === "ar" ? "سنة البناء" : "Year Built"}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {language === "ar" ? "وصف العقار" : "Property Description"}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {property.description}
                  </p>
                </div>
              </div>

              {/* Features */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  {language === "ar"
                    ? "المميزات والخدمات"
                    : "Features & Amenities"}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {property.features.map((feature, index) => {
                    const IconComponent = getFeatureIcon(feature);
                    return (
                      <div
                        key={index}
                        className="flex items-center space-x-3 rtl:space-x-reverse p-3 bg-gray-50 rounded-lg">
                        <IconComponent className="h-5 w-5 text-blue-600 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Map */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  {language === "ar" ? "الموقع على الخريطة" : "Location on Map"}
                </h3>
                <div className="bg-gray-200 rounded-xl h-64 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-16 w-16 text-gray-500 mx-auto mb-4" />
                    <p className="text-gray-600 text-lg font-medium">
                      Interactive Map
                    </p>
                    <p className="text-gray-500">
                      Alamain, North Coast, Alexandria
                    </p>
                    <p className="text-sm text-gray-400 mt-2">
                      Coordinates: {property.coordinates.lat},{" "}
                      {property.coordinates.lng}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Agent Contact */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  {language === "ar" ? "تواصل مع الوكيل" : "Contact Agent"}
                </h3>
                <div className="flex items-center space-x-4 rtl:space-x-reverse mb-6">
                  <img
                    src={property.agent.image}
                    alt={property.agent.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {property.agent.name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {language === "ar"
                        ? "وكيل عقاري معتمد"
                        : "Certified Real Estate Agent"}
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  <a
                    href={`tel:${property.agent.phone}`}
                    className="flex items-center justify-center space-x-2 rtl:space-x-reverse bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200">
                    <Phone className="h-5 w-5" />
                    <span>{language === "ar" ? "اتصال" : "Call Now"}</span>
                  </a>
                  <a
                    href={`mailto:${property.agent.email}`}
                    className="flex items-center justify-center space-x-2 rtl:space-x-reverse bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                    <Mail className="h-5 w-5" />
                    <span>
                      {language === "ar" ? "إرسال رسالة" : "Send Email"}
                    </span>
                  </a>
                </div>
              </div>

              {/* Property Details */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  {language === "ar" ? "تفاصيل العقار" : "Property Details"}
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      {language === "ar" ? "نوع العقار:" : "Property Type:"}
                    </span>
                    <span className="font-medium">{property.propertyType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      {language === "ar" ? "الطابق:" : "Floor:"}
                    </span>
                    <span className="font-medium">
                      {property.floor === 0
                        ? language === "ar"
                          ? "الطابق الأرضي"
                          : "Ground Floor"
                        : property.floor}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      {language === "ar" ? "إجمالي الطوابق:" : "Total Floors:"}
                    </span>
                    <span className="font-medium">{property.totalFloors}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      {language === "ar" ? "سنة البناء:" : "Year Built:"}
                    </span>
                    <span className="font-medium">{property.yearBuilt}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      {language === "ar" ? "رقم العقار:" : "Property ID:"}
                    </span>
                    <span className="font-medium">{property.id}</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  {language === "ar" ? "إجراءات سريعة" : "Quick Actions"}
                </h3>
                <div className="space-y-3">
                  <button className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-green-700 transition-all duration-300">
                    {language === "ar" ? "طلب معاينة" : "Schedule Viewing"}
                  </button>
                  <button className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200">
                    {language === "ar" ? "طلب تمويل" : "Request Financing"}
                  </button>
                  <button className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200">
                    {language === "ar" ? "تحميل التفاصيل" : "Download Details"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PropertyDetailsPage;
