import { useLanguage } from "@/app/contexts/LanguageContext";
import { fetcher } from "@/services/shared/fetcher";
// import Home from "@/app/page";
import { BarChart3, FileText, Home, Users } from "lucide-react";
import React from "react";
import useSWR from "swr";

const OverviewDashboardTab = () => {
  const { language, t } = useLanguage();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
 const { data, error, isLoading } = useSWR(
   `${apiUrl}/properties` ,
    fetcher
  );
  const totalProperties = data?.pagination?.totalCount || 0;
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-colors duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {language === "ar" ? "إجمالي العقارات" : "Total Properties"}
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {totalProperties}
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Home className="h-8 w-8 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-colors duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {language === "ar" ? "المقالات المنشورة" : "Published Posts"}
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                89
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <FileText className="h-8 w-8 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-colors duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {language === "ar" ? "المستخدمون النشطون" : "Active Users"}
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                15,432
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-colors duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {language === "ar" ? "المشاهدات الشهرية" : "Monthly Views"}
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                234K
              </p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <BarChart3 className="h-8 w-8 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-colors duration-200">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          {language === "ar" ? "النشاط الأخير" : "Last Month Activity"}
        </h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Home className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                {language === "ar"
                  ? "تم إضافة عقار جديد"
                  : "New property added"}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {language === "ar" ? "منذ ساعتين" : "2 hours ago"}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <div className="bg-green-100 p-2 rounded-lg">
              <FileText className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                {language === "ar"
                  ? "تم نشر مقال جديد"
                  : "New blog post published"}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {language === "ar" ? "منذ 4 ساعات" : "4 hours ago"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewDashboardTab;
