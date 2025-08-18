"use client";

import React, { useState } from "react";
import {
  BarChart3,
  Users,
  Home,
  FileText,
  Settings,
  LogOut,
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import PropertiesDashboardTab from "./properties/page";
import OverviewDashboardTab from "./overview/page";
import BlogPostsDashboardTab from "./blog/page";

const DashboardPage: React.FC = () => {
  const { language} = useLanguage();
  const [activeTab, setActiveTab] = useState("properties");

  const sidebarItems = [
    {
      id: "overview",
      label: language === "ar" ? "نظرة عامة" : "Overview",
      icon: BarChart3,
    },
    {
      id: "properties",
      label: language === "ar" ? "العقارات" : "Properties",
      icon: Home,
    },
    {
      id: "posts",
      label: language === "ar" ? "المقالات" : "Blog Posts",
      icon: FileText,
    },
    {
      id: "users",
      label: language === "ar" ? "المستخدمون" : "Users",
      icon: Users,
    },
    {
      id: "settings",
      label: language === "ar" ? "الإعدادات" : "Settings",
      icon: Settings,
    },
  ];



  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex transition-colors duration-200">
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-gray-800 shadow-lg transition-colors duration-200">
        {/* <div className="p-6">
          <div className="flex items-center"> */}
        {/* <div className="h-10 w-10 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">RE</span>
            </div> */}
        {/* <div className={`${language === "ar" ? "mr-3" : "ml-3"}`}>
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">
                {language === "ar" ? "لوحة التحكم" : "Dashboard"}
              </h1>
            </div> */}
        {/* </div>
        </div> */}

        <nav className="mt-6">
          {sidebarItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center px-6 py-3 text-left transition-colors duration-200 ${
                  activeTab === item.id
                    ? "bg-blue-50 text-blue-600 border-r-2 border-blue-600"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
                }`}>
                <IconComponent className="h-5 w-5 mr-3" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-0 w-64 p-6">
          <button className="flex items-center text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200">
            <LogOut className="h-5 w-5 mr-3" />
            <span>{language === "ar" ? "تسجيل الخروج" : "Logout"}</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {/* Header */}
        {/* <header className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700 transition-colors duration-200">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {activeTab === "overview" &&
                  (language === "ar" ? "نظرة عامة" : "Overview")}
                {activeTab === "properties" &&
                  (language === "ar" ? "إدارة العقارات" : "Manage Properties")}
                {activeTab === "posts" &&
                  (language === "ar" ? "إدارة المقالات" : "Manage Blog Posts")}
                {activeTab === "users" &&
                  (language === "ar" ? "إدارة المستخدمين" : "Manage Users")}
                {activeTab === "settings" &&
                  (language === "ar" ? "الإعدادات" : "Settings")}
              </h2>
              <div className="flex items-end space-x-4 rtl:space-x-reverse ">
               
                <BtnInHeader />
              </div>
            </div>
          </div>
        </header> */}

        {/* Content Area */}
        <main className="p-6 overflow-y-auto h-full">
          {/* Overview Tab */}
          {activeTab === "overview" && <OverviewDashboardTab />}

          {/* Properties Tab */}
          {activeTab === "properties" && <PropertiesDashboardTab />}

          {/* Blog Posts Tab */}
          {activeTab === "posts" && (
            <BlogPostsDashboardTab />
          )}

          {/* Users Tab */}
          {activeTab === "users" && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-colors duration-200">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                {language === "ar" ? "إدارة المستخدمين" : "User Management"}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {language === "ar"
                  ? "قريباً - إدارة المستخدمين والصلاحيات"
                  : "Coming Soon - User management and permissions"}
              </p>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-colors duration-200">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                {language === "ar" ? "إعدادات النظام" : "System Settings"}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {language === "ar"
                  ? "قريباً - إعدادات النظام والتكوين"
                  : "Coming Soon - System settings and configuration"}
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
