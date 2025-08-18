"use client";

import React, { useState } from "react";
import { Search, Calendar, User, ArrowRight, Filter } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import useSWR from "swr";
import { fetcher } from "@/services/shared/fetcher";
import { baseUrl } from "@/services/shared/apiUrl";
import Link from "next/link";
import Image from "next/image";
import { paginate } from "@/lib/utils/paginate";
import NewsSkeleton from "../components/NewsComponents/NewsSkeleton";

const BlogPage: React.FC = () => {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const [page, setPage] = useState(1);
  const limit = 6; // posts per page

  const categories = [
    { value: "", label: language === "ar" ? "جميع الفئات" : "All Categories" },
    {
      value: "housing",
      label: language === "ar" ? "مشاريع الإسكان" : "Housing Projects",
    },
    {
      value: "digital",
      label: language === "ar" ? "الخدمات الرقمية" : "Digital Services",
    },
    {
      value: "investment",
      label: language === "ar" ? "الاستثمار" : "Investment",
    },
    {
      value: "sustainability",
      label: language === "ar" ? "الاستدامة" : "Sustainability",
    },
  ];

  const { data, isLoading, error } = useSWR(
    `${baseUrl}/posts?page=${page}&limit=${limit}`,
    fetcher
  );
  if (error) {
    console.error("Error fetching blog posts:", error);
    return <div>Error loading blog posts</div>;
  }
  const blogPosts = data?.data || [];
  console.log("blogPosts");
  console.log(blogPosts);

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      // post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (post[language]?.title &&
        post[language].title
          .toLowerCase()
          .includes(searchQuery.toLowerCase())) ||
      (post[language]?.summary &&
        post[language].summary
          .toLowerCase()
          .includes(searchQuery.toLowerCase()));
    const matchesCategory =
      selectedCategory === "" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === "ar" ? "ar-EG" : "en-EG");
  };
  const { data: paginatedPosts, totalPages } = paginate(
    filteredPosts,
    page,
    limit
  );
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-green-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              {language === "ar" ? "مدونة العقارات" : "Real Estate Blog"}
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 dark:text-blue-200 max-w-3xl mx-auto">
              {language === "ar"
                ? "آخر الأخبار والتحديثات في قطاع العقارات المصري"
                : "Latest news and updates in the Egyptian real estate sector"}
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white dark:bg-gray-800 shadow-sm transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  language === "ar"
                    ? "البحث في المقالات..."
                    : "Search articles..."
                }
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-10 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-500" />
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <Filter className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading && <NewsSkeleton length={limit} />}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.featuredImageUrl}
                    alt={post[language].title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    width={500}
                    height={300}
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {
                        categories.find(
                          (cat) => cat.value === post[language].category
                        )?.label
                      }
                      {Array.isArray(post[language].categories) &&
                        post[language].categories.map(
                          (cat: { name: string }, idx: number) => (
                            <span key={idx} className="ml-1">
                              {cat.name}{" "}
                            </span>
                          )
                        )}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between text-gray-500 dark:text-gray-400 text-sm mb-3">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>
                        {formatDate(
                          post.date ||
                            new Date(
                              Date.now() -
                                Math.floor(Math.random() * 10000000000)
                            ).toISOString()
                        )}
                      </span>
                    </div>
                    <span>
                      {Math.floor(Math.random() * 10) + 1}{" "}
                      {language === "ar" ? "دقيقة" : "min"}
                    </span>
                  </div>

                  <h3
                    className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 min-h-[57px]
                    flex flex-col justify-center
                    ">
                    {post[language].title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                    {post[language].excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                      <User className="h-4 w-4 mr-2" />
                      <span>{post.author.username}</span>
                    </div>
                    <Link href={`/blog/${post.id}`}>
                      <button className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold transition-colors duration-200">
                        <span>
                          {language === "ar" ? "اقرأ المزيد" : "Read More"}
                        </span>
                        <ArrowRight
                          className={`h-4 w-4 ${
                            language === "ar" ? "mr-2 rotate-180" : "ml-2"
                          }`}
                        />
                      </button>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredPosts.length === 0 && !isLoading && (
            <div className="text-center py-16">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                {language === "ar"
                  ? "لم يتم العثور على مقالات تطابق البحث"
                  : "No articles found matching your search"}
              </p>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2 mt-8 justify-end pr-7 pl-7">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50">
            {language === "ar" ? "السابق" : "Previous"}
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-4 py-2 rounded ${
                page === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700"
              }`}>
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50">
            {language === "ar" ? "التالي" : "Next"}
          </button>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
