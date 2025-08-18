"use client";
import { useLanguage } from "@/contexts/LanguageContext";
import { DashboardOverview } from "@/lib/types/api";
import { baseUrl } from "@/services/shared/apiUrl";
import { fetcher, fetcherDash } from "@/services/shared/fetcher";
// import Home from "@/app/page";
import { BarChart3, FileText, Home, Users } from "lucide-react";
import React from "react";
import useSWR from "swr";
type DashboardCardProps = {
  title: string;
  value?: number | string;
  icon: React.ReactNode;
  iconBg: string;
};

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  icon,
  iconBg,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-colors duration-200 flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <div className="text-left">
          <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {value}
          </p>
        </div>
        <div
          className={`${iconBg} p-3 rounded-lg flex items-center justify-center`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

const OverviewDashboardTab = () => {
  const { language } = useLanguage();

  const { data } = useSWR(
    [`${baseUrl}/dashboard`, localStorage.getItem("token") ?? ""],
    ([url, token]) => fetcherDash(url, token)
  );
  const dashboardData: DashboardOverview | undefined = data?.data;
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title={language === "ar" ? "إجمالي العقارات" : "Total Properties"}
          value={dashboardData?.totalProperties}
          icon={<Home className="h-8 w-8 text-blue-600" />}
          iconBg="bg-blue-100"
        />
        <DashboardCard
          title={language === "ar" ? "المقالات المنشورة" : "Published Posts"}
          value={dashboardData?.totalPosts}
          icon={<FileText className="h-8 w-8 text-green-600" />}
          iconBg="bg-green-100"
        />
        <DashboardCard
          title={language === "ar" ? "المستخدمون النشطون" : "Active Users"}
          value={dashboardData?.totalUsers}
          icon={<Users className="h-8 w-8 text-purple-600" />}
          iconBg="bg-purple-100"
        />
        <DashboardCard
          title={
            language === "ar"
              ? "العقارات غير المعتمدة"
              : "Unapproved Properties"
          }
          value={dashboardData?.totalUnAprovedProperties}
          icon={<BarChart3 className="h-8 w-8 text-orange-600" />}
          iconBg="bg-orange-100"
        />
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
