"use client";
import React from "react";
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
import { DetailsPageProps } from "@/types/detailsPage";
import { useLanguage } from "@/app/contexts/LanguageContext";
import Image from "next/image";

const PropertyDetailsPage: React.FC<DetailsPageProps> = ({
  id,
  initialData,
}) => {
  const { language } = useLanguage();
  // const language = "en";
  let currentImageIndex = 0;
  let isFavorite = false;

  const setCurrentImageIndex = (index: number) => {
    currentImageIndex = index;
  };

  const setIsFavorite = (value: boolean) => {
    isFavorite = value;
  };
  // const params = useParams();

  // const { data, error, isLoading } = useSWR(
  //   [`${baseUrl}/properties/${id}`, token],
  //   ([url, token]) => fetcher(url, token)
  // );

  const property = initialData?.data;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(language === "ar" ? "ar-EG" : "en-EG").format(
      price
    );
  };

  const getFeatureIcon = (feature: string) => {
    const lowerFeature =
      typeof feature === "string" ? feature.toLowerCase() : "";
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
      {/* Property Images Gallery */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Main Image */}
            <div className="lg:col-span-2">
              <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden">
                <Image
                  src={property?.photos[currentImageIndex]}
                  alt={property?.additional_information[language]?.title}
                  className="w-full h-full object-cover"
                  width={500}
                  height={500}
                />
                <div className="absolute top-4 left-4 flex space-x-2 rtl:space-x-reverse">
                  <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {property?.status}
                  </span>
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    ID: {id}
                  </span>
                </div>
                <div className="absolute top-4 right-4 flex space-x-2 rtl:space-x-reverse">
                  <button
                    // onClick={() => setIsFavorite(!isFavorite)}
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
                    {currentImageIndex + 1} / {property?.photos?.length}
                  </span>
                </div>
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="space-y-4">
              {property?.photos
                .slice(1, property?.photos?.length)
                .map((image: string, index: number) => (
                  <div
                    key={index}
                    className={`relative h-24 rounded-lg overflow-hidden cursor-pointer transition-all duration-200 ${
                      currentImageIndex === index + 1
                        ? "ring-2 ring-blue-500"
                        : "hover:opacity-80"
                    }`}
                    // onClick={() => setCurrentImageIndex(index + 1)}
                  >
                    <Image
                      src={image}
                      alt={`Property ${index + 2}`}
                      className="w-full h-full object-cover"
                      width={500}
                      height={500}
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
                      {property?.additional_information[language]?.title}
                    </h1>
                    <div className="flex items-center text-gray-600 mb-4">
                      <MapPin className="h-5 w-5 mr-2" />
                      <span>
                        {property?.additional_information[language]?.address}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">
                      {/* {property?.fullAddress} */}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {formatPrice(property?.price_amount)}{" "}
                      {language === "ar" ? "ج.م" : "EGP"}
                    </div>
                    <div className="text-sm text-gray-500">
                      {Math.round(
                        parseFloat(property?.price_amount) /
                          parseFloat(property?.area_sqm)
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
                      {parseInt(property?.area_sqm)}
                    </div>
                    <div className="text-sm text-gray-600">
                      {language === "ar" ? "متر مربع" : "Square Meters"}
                    </div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Bed className="h-8 w-8 mx-auto mb-2 text-green-600" />
                    <div className="text-2xl font-bold text-gray-900">
                      {property?.bedrooms}
                    </div>
                    <div className="text-sm text-gray-600">
                      {language === "ar" ? "غرف نوم" : "Bedrooms"}
                    </div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Bath className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                    <div className="text-2xl font-bold text-gray-900">
                      {property?.bathrooms}
                    </div>
                    <div className="text-sm text-gray-600">
                      {language === "ar" ? "حمامات" : "Bathrooms"}
                    </div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Calendar className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                    <div className="text-2xl font-bold text-gray-900">
                      {property?.available_from
                        ? new Date(property.available_from).toLocaleString(
                            language === "ar" ? "ar-EG" : "en-EG",
                            {
                              month: "long",
                              year: "numeric",
                            }
                          )
                        : ""}
                    </div>
                    <div className="text-sm text-gray-600">
                      {language === "ar" ? "تاريخ التوفر" : "Available From"}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {language === "ar" ? "وصف العقار" : "Property Description"}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {property?.additional_information[language]?.description}
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
                  {property?.[language].features.map(
                    (feature: string, index: number) => {
                      const IconComponent = getFeatureIcon(String(feature));
                      return (
                        <div
                          key={index}
                          className="flex items-center space-x-3 rtl:space-x-reverse p-3 bg-gray-50 rounded-lg">
                          <IconComponent className="h-5 w-5 text-blue-600 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>

              {/* Map */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  {language === "ar" ? "الموقع على الخريطة" : "Location on Map"}
                </h3>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    property?.additional_information[language]?.address || ""
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-gray-200 rounded-xl h-64 flex items-center justify-center cursor-pointer hover:bg-gray-300 transition">
                  <div className="text-center">
                    <MapPin className="h-16 w-16 text-gray-500 mx-auto mb-4" />
                    <p className="text-gray-600 text-lg font-medium">
                      Interactive Map
                    </p>
                    <p className="text-gray-500">
                      {property?.additional_information[language]?.address}
                    </p>
                    <p className="text-sm text-gray-400 mt-2">
                      {/* Coordinates: {property?.coordinates?.lat},{" "} */}
                      {/* {property?.coordinates?.lng} */}
                    </p>
                  </div>
                </a>
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
                  <Image
                    src={property?.contact?.image || "/3866.jpg"}
                    alt={property?.contact?.name || ""}
                    className="w-16 h-16 rounded-full object-cover"
                    width={64}
                    height={64}
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {property?.contact?.name ||
                        (language === "ar" ? "وكيل عقاري" : "Agent")}
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
                    href={`tel:+201005307391`}
                    className="flex items-center justify-center space-x-2 rtl:space-x-reverse bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200">
                    <Phone className="h-5 w-5" />
                    <span>{language === "ar" ? "اتصال" : "Call Now"}</span>
                  </a>
                  <a
                    href={`mailto:yousefeslam214@gmail.com`}
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
                  {property?.property_type && (
                    <div className="flex flex-col gap-2 mb-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          {language === "ar"
                            ? "نوع العقار:"
                            : "Property Category:"}
                        </span>
                        <span className="font-medium">
                          {property.property_type.category}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          {language === "ar"
                            ? "تصنيف العقار:"
                            : "Property Subtype:"}
                        </span>
                        <span className="font-medium">
                          {property?.[language]?.property_type?.subtype}
                        </span>
                      </div>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      {language === "ar" ? "الطابق:" : "Floor:"}
                    </span>
                    <span className="font-medium">
                      {(() => {
                        const minFloor = 1;
                        const maxFloor = 3;
                        const randomFloor =
                          Math.floor(
                            Math.random() * (maxFloor - minFloor + 1)
                          ) + minFloor;
                        return randomFloor === 0
                          ? language === "ar"
                            ? "الطابق الأرضي"
                            : "Ground Floor"
                          : randomFloor;
                      })()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      {language === "ar" ? "إجمالي الطوابق:" : "Total Floors:"}
                    </span>
                    <span className="font-medium">4</span>
                  </div>
                  {/* <div className="flex justify-between">
                    <span className="text-gray-600">
                      {language === "ar" ? "سنة البناء:" : "Year Built:"}
                    </span>
                    <span className="font-medium">{property?.yearBuilt}</span> 
                  </div> */}
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      {language === "ar" ? "رقم العقار:" : "Property ID:"}
                    </span>
                    <span className="font-medium">{id}</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  {language === "ar" ? "إجراءات سريعة" : "Quick Actions"}
                </h3>
                <div className="space-y-3">
                  <a
                    href="https://calendly.com/yousefeslam214/new-meeting"
                    target="_blank"
                    rel="noopener noreferrer">
                    <button className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-green-700 transition-all duration-300">
                      {language === "ar" ? "طلب معاينة" : "Schedule Viewing"}
                    </button>
                  </a>
                  <a
                    href={`https://wa.me/201005307391?text=${encodeURIComponent(
                      language === "ar"
                        ? `طلب تمويل للوحدة رقم ${id}`
                        : `Request financing for unit with ID ${id}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full block border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200 text-center">
                    {language === "ar" ? "طلب تمويل" : "Request Financing"}
                  </a>
                  <button
                    className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200"
                    // onClick={async () => {
                    //   const { jsPDF } = await import("jspdf");
                    //   const doc = new jsPDF();

                    //   // ✅ Extract data
                    //   const title =
                    //     property?.additional_information?.en?.title || "";
                    //   const address =
                    //     property?.additional_information?.en?.address || "";
                    //   const description =
                    //     property?.additional_information?.en?.description || "";
                    //   const price = property?.price_amount || "";
                    //   const area = property?.area_sqm || "";
                    //   const bedrooms = property?.bedrooms || "";
                    //   const bathrooms = property?.bathrooms || "";
                    //   const listingType = property?.en?.listing_type || "";
                    //   const status = property?.en?.status || "";
                    //   const project = property?.project?.name || "";
                    //   const developer = property?.developer?.name || "";
                    //   const availableFrom = property?.available_from
                    //     ? new Date(property.available_from).toLocaleDateString()
                    //     : "";
                    //   const isApproved = property?.is_approved
                    //     ? "Approved"
                    //     : "Not Approved";

                    //   const locationCountry = property?.location?.country || "";
                    //   const locationGov = property?.location?.governorate || "";
                    //   const locationArea = property?.location?.area || "";
                    //   const locationDistrict =
                    //     property?.location?.district || "";

                    //   const propertyTypeCategory =
                    //     property?.property_type?.category || "";
                    //   const propertyTypeSubtype =
                    //     property?.property_type?.subtype || "";

                    //   const agent = property?.contact?.name || "";
                    //   const agentPhone = property?.contact?.phone || "";
                    //   const agentEmail = property?.contact?.email || "";
                    //   const agentType = property?.contact?.contact_type || "";

                    //   const features = property?.en?.features?.join(", ") || "";

                    //   const id = id;

                    //   // ✅ Title
                    //   doc.setFontSize(18);
                    //   doc.text(title, 10, 20, { maxWidth: 180 });

                    //   doc.setFontSize(12);
                    //   let y = 30;

                    //   const addLine = (label, value) => {
                    //     if (value) {
                    //       doc.text(`${label}: ${value}`, 10, y, {
                    //         maxWidth: 180,
                    //       });
                    //       y += 10;
                    //     }
                    //   };

                    //   // ✅ Add all data
                    //   addLine("Address", address);
                    //   addLine("Price", `${price} EGP`);
                    //   addLine("Area", `${area} sqm`);
                    //   addLine("Bedrooms", bedrooms);
                    //   addLine("Bathrooms", bathrooms);
                    //   addLine("Listing Type", listingType);
                    //   addLine("Status", status);
                    //   addLine("Project", project);
                    //   addLine("Developer", developer);
                    //   addLine("Available From", availableFrom);
                    //   addLine("Approval", isApproved);

                    //   addLine("Country", locationCountry);
                    //   addLine("Governorate", locationGov);
                    //   addLine("Area", locationArea);
                    //   addLine("District", locationDistrict);

                    //   addLine("Property Category", propertyTypeCategory);
                    //   addLine("Subtype", propertyTypeSubtype);

                    //   addLine("Features", features);

                    //   // ✅ Description block
                    //   addLine("Description", "");
                    //   doc.text(description, 10, y, { maxWidth: 180 });
                    //   y += 30;

                    //   // ✅ Agent
                    //   addLine("Agent", agent);
                    //   addLine("Agent Phone", agentPhone);
                    //   addLine("Agent Email", agentEmail);
                    //   addLine("Contact Type", agentType);

                    //   // ✅ Property ID
                    //   addLine("Property ID", id);

                    //   // ✅ Save PDF
                    //   doc.save(`property-details-${id}.pdf`);
                    // }}
                  >
                    {language === "ar"
                      ? "تحميل التفاصيل PDF"
                      : "Download Details PDF"}{" "}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PropertyDetailsPage;
