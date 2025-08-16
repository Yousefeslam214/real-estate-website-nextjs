import { Building } from "lucide-react";
import React from "react";
import { useLanguage } from "../contexts/LanguageContext";

const HeroSectionSellProperty = () => {
  const { language } = useLanguage();
  return (
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
  );
};

export default HeroSectionSellProperty;
