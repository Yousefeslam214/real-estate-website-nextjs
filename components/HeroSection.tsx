"use client";

import { Building } from "lucide-react";
import React from "react";
import { useLanguage } from "../contexts/LanguageContext";

interface HeroSectionProps {
  headTxt: string[];
  arHeadTxt: string[];
  subTxt: string[];
  arSubTxt: string[];
}

const HeroSection: React.FC<HeroSectionProps> = ({
  headTxt,
  arHeadTxt,
  subTxt,
  arSubTxt,
}) => {
  const { language } = useLanguage();
  return (
    <section className="relative bg-gradient-to-br from-blue-600 to-green-600 text-white py-20">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Building className="h-16 w-16 text-white mx-auto mb-6" />
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
          {language === "ar" ? arHeadTxt[0] : headTxt[0]}
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-blue-100 dark:text-blue-200">
          {language === "ar" ? arSubTxt[0] : subTxt[0]}
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
