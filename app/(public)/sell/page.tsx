"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import CreateProperty from "@/components/PropertiesComponents/CreateProperty";
import HeroSection from "@/components/HeroSection";

const SellProperty: React.FC = () => {
  const router = useRouter();
  // Show login form if not authenticated
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/signin");
  }, [router]);

  return (
    <>
      {/* Hero Section */}
      <HeroSection
        headTxt={["Sell Your Property"]}
        arHeadTxt={["اعرض عقارك للبيع"]}
        subTxt={["List your property on our platform and reach thousands of potential buyers"]}
        arSubTxt={["أضف عقارك على منصتنا واصل إلى آلاف المشترين المحتملين"]}
      />
      {/* Main Form Section */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <CreateProperty />
        </div>
      </div>
    </>
  );
};

export default SellProperty;
