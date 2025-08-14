'use client';

import React from "react";
import { useLanguage } from "../contexts/LanguageContext";

const TitleOfSection = () => {
  const { t, language } = useLanguage();
  return (
    <div>
      {" "}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {t("news.title")}
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          {t("news.subtitle")}
        </p>
      </div>
    </div>
  );
};

export default TitleOfSection;
