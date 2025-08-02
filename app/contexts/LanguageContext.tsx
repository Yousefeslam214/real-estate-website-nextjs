"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "ar";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

const translations = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.offers": "Offers",
    "nav.about": "About Us",
    "nav.blog": "Blog",
    "nav.contact": "Contact Us",
    "nav.sellProperty": "Sell Property",

    // Hero Section
    "hero.title": "Egyptian Real Estate Portal",
    "hero.subtitle":
      "Your gateway to government-verified properties and real estate services",
    "hero.search.placeholder":
      "Search for properties, locations, or property types...",
    "hero.search.button": "Search Properties",

    // Property Search
    "search.property.type": "Property Type",
    "search.location": "Location",
    "search.price.range": "Price Range",
    "search.area": "Area (m²)",
    "search.all.types": "All Types",
    "search.residential": "Residential",
    "search.commercial": "Commercial",
    "search.industrial": "Industrial",
    "search.land": "Land",

    // Properties
    "properties.title": "Featured Properties",
    "properties.subtitle":
      "Discover verified government properties across Egypt",
    "properties.view.details": "View Details",
    "properties.price": "EGP",
    "properties.area": "m²",
    "properties.bedrooms": "Bedrooms",
    "properties.bathrooms": "Bathrooms",

    // Services
    "services.title": "Our Services",
    "services.subtitle": "Comprehensive real estate services for citizens",
    "services.registration": "Property Registration",
    "services.registration.desc":
      "Official property registration and documentation services",
    "services.valuation": "Property Valuation",
    "services.valuation.desc":
      "Professional property assessment and valuation services",
    "services.licensing": "Real Estate Licensing",
    "services.licensing.desc":
      "Licensing services for real estate professionals",
    "services.consultation": "Legal Consultation",
    "services.consultation.desc":
      "Expert legal advice for real estate transactions",

    // About
    "about.title": "About Egyptian Real Estate Portal",
    "about.description":
      "The Egyptian Real Estate Portal is the official government platform dedicated to providing comprehensive real estate services to Egyptian citizens and investors. Our mission is to facilitate transparent, efficient, and secure real estate transactions while ensuring compliance with Egyptian property laws and regulations.",

    // News
    "news.title": "Latest News & Updates",
    "news.subtitle":
      "Stay informed about real estate developments and policy changes",
    "news.read.more": "Read More",

    // Contact
    "contact.title": "Contact Us",
    "contact.subtitle": "Get in touch with our real estate experts",
    "contact.address": "Ministry of Housing, New Administrative Capital, Egypt",
    "contact.phone": "+20 2 1234 5678",
    "contact.email": "info@realestate.gov.eg",
    "contact.hours": "Sunday - Thursday: 9:00 AM - 5:00 PM",

    // Footer
    "footer.description":
      "Official Egyptian Government Real Estate Portal providing comprehensive property services and information.",
    "footer.quick.links": "Quick Links",
    "footer.services.links": "Services",
    "footer.contact.info": "Contact Information",
    "footer.rights": "© 2025 Egyptian Real Estate Portal. All rights reserved.",

    "sell.property.title": "Sell Your Property",
    "sell.property.subtitle": "List your property on our platform and reach thousands of potential buyers",
  },
  ar: {
    // Navigation
    "nav.home": "الرئيسية",
    "nav.offers": "عروضنا",
    "nav.about": "من نحن",
    "nav.blog": "المدونة",
    "nav.contact": "اتصل بنا",
    "nav.sellProperty": "بيع الممتلكات",

    // Hero Section
    "hero.title": "البوابة المصرية للعقارات",
    "hero.subtitle": "بوابتك إلى العقارات والخدمات العقارية المعتمدة حكومياً",
    "hero.search.placeholder":
      "ابحث عن العقارات أو المواقع أو أنواع العقارات...",
    "hero.search.button": "البحث عن العقارات",

    // Property Search
    "search.property.type": "نوع العقار",
    "search.location": "الموقع",
    "search.price.range": "نطاق السعر",
    "search.area": "المساحة (م²)",
    "search.all.types": "جميع الأنواع",
    "search.residential": "سكني",
    "search.commercial": "تجاري",
    "search.industrial": "صناعي",
    "search.land": "أرض",

    // Properties
    "properties.title": "العقارات المميزة",
    "properties.subtitle": "اكتشف العقارات الحكومية المعتمدة في جميع أنحاء مصر",
    "properties.view.details": "عرض التفاصيل",
    "properties.price": "جنيه مصري",
    "properties.area": "م²",
    "properties.bedrooms": "غرف النوم",
    "properties.bathrooms": "الحمامات",

    // Services
    "services.title": "خدماتنا",
    "services.subtitle": "خدمات عقارية شاملة للمواطنين",
    "services.registration": "تسجيل العقارات",
    "services.registration.desc": "خدمات تسجيل وتوثيق العقارات الرسمية",
    "services.valuation": "تقييم العقارات",
    "services.valuation.desc": "خدمات التقييم والتقدير المهني للعقارات",
    "services.licensing": "تراخيص العقارات",
    "services.licensing.desc": "خدمات الترخيص لمهنيي العقارات",
    "services.consultation": "الاستشارات القانونية",
    "services.consultation.desc": "مشورة قانونية متخصصة للمعاملات العقارية",

    // About
    "about.title": "حول البوابة المصرية للعقارات",
    "about.description":
      "البوابة المصرية للعقارات هي المنصة الحكومية الرسمية المخصصة لتقديم خدمات عقارية شاملة للمواطنين المصريين والمستثمرين. مهمتنا هي تسهيل المعاملات العقارية الشفافة والفعالة والآمنة مع ضمان الامتثال لقوانين ولوائح العقارات المصرية.",

    // News
    "news.title": "آخر الأخبار والتحديثات",
    "news.subtitle": "ابق على اطلاع بالتطورات العقارية وتغييرات السياسات",
    "news.read.more": "اقرأ المزيد",

    // Contact
    "contact.title": "اتصل بنا",
    "contact.subtitle": "تواصل مع خبراء العقارات لدينا",
    "contact.address": "وزارة الإسكان، العاصمة الإدارية الجديدة، مصر",
    "contact.phone": "+20 2 1234 5678",
    "contact.email": "info@realestate.gov.eg",
    "contact.hours": "الأحد - الخميس: 9:00 صباحاً - 5:00 مساءً",

    // Footer
    "footer.description":
      "البوابة الرسمية للحكومة المصرية للعقارات التي تقدم خدمات ومعلومات عقارية شاملة.",
    "footer.quick.links": "روابط سريعة",
    "footer.services.links": "الخدمات",
    "footer.contact.info": "معلومات الاتصال",
    "footer.rights": "© 2025 البوابة المصرية للعقارات. جميع الحقوق محفوظة.",

    "sell.property.title": "اعرض عقارك للبيع",
    "sell.property.subtitle": "أضف عقارك على منصتنا واصل إلى آلاف المشترين المحتملين",

  },
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "ar" : "en";
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
  };

  const t = (key: string): string => {
    return (
      translations[language][
        key as keyof (typeof translations)[typeof language]
      ] || key
    );
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
