"use client";

import { ArrowRight } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import { baseUrl } from "@/services/shared/apiUrl";
import { fetcher } from "@/services/shared/fetcher";
import { ApiResponse } from "@/lib/types/api";
import useSWR from "swr";
import Link from "next/link";
import Image from "next/image";
import NewsSkeleton from "./NewsSkeleton";

type NewsCardProps = {
  page?: number;
  itemNum?: number;
};

const NewsCard = ({ page, itemNum }: NewsCardProps) => {
  const { language, t } = useLanguage();

  const { data, isLoading, error } = useSWR<ApiResponse>(
    `${baseUrl}/posts?page=${page}&limit=${itemNum}`,
    fetcher,
    {
      // suspense: true,
    }
  );
  const newsItems = data?.data || [];
  console.log("fetch posts ", newsItems);
  if (error) return <div>error {error}</div>;
  if (isLoading) return <NewsSkeleton length={itemNum || 3} />;

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.isArray(newsItems) &&
          newsItems.slice(0, 3).map((item: any) => (
            <article
              key={item?.id}
              className="bg-gray-50 dark:bg-gray-700 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="relative h-48 overflow-hidden">
              <Image
                src={item?.featuredImageUrl}
                alt={item?.[language].title}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                width={500}
                height={300}
              />
              <div className="absolute top-4 left-4">
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {item?.[language].categories
                    .map((cat: { name: string }) => cat.name)
                    .join(", ")}
                </span>
              </div>
            </div>

            <div className="p-6">
              {/* <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-3">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{formatDate(item.date)}</span>
                </div> */}

              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                {item?.[language].title}
              </h3>

              <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                {item?.[language].summary}
              </p>

              <Link
                href={`/blog/${item.id}`}
                className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold transition-colors duration-200">
                <span>{t("news.read.more")}</span>
                <ArrowRight
                  className={`h-4 w-4 ${
                    language === "ar" ? "mr-2 rotate-180" : "ml-2"
                  }`}
                />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default NewsCard;
