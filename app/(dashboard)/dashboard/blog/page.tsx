"use client";

import SearchWithAddButton from "@/app/components/SearchWithAddButton";
import { useLanguage } from "@/contexts/LanguageContext";
import { baseUrl } from "@/services/shared/apiUrl";
import { fetcher } from "@/services/shared/fetcher";
import { Edit, Eye, Trash2 } from "lucide-react";
import Image from "next/image";
import React from "react";
import useSWR from "swr";

// const BlogPostsDashboardTab = ({ blogPosts }: any) => {
const BlogPostsDashboardTab = () => {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = React.useState("");
  const activeTab = "posts"; // This can be dynamic based on your app's state
  const { data, isLoading, error } = useSWR(`${baseUrl}/posts`, fetcher);
  console.log("Blog Posts data:", data?.data);
  const blogPosts = data?.data || [];

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error loading blog posts.</div>;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg transition-colors duration-200">
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            {language === "ar" ? "قائمة المقالات" : "Blog Posts List"}
          </h3>
          <SearchWithAddButton
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            language={language}
            activeTab={activeTab}
            //   onAddClick={handleAdd}
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                {language === "ar" ? "المنشور" : "Post"}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                {language === "ar" ? "العنوان" : "Title"}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                {language === "ar" ? "الوسوم" : "Tags"}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                {language === "ar" ? "الحالة" : "Status"}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                {language === "ar" ? "الإجراءات" : "Actions"}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {blogPosts.map((post) => (
              <tr
                key={post.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                <td className="px-6 py-4 flex items-center">
                  <Image
                    src={post?.featuredImageUrl || "/placeholder.jpg"}
                    alt={post?.title || "Post"}
                    className="h-12 w-12 rounded-lg object-cover"
                    width={48}
                    height={48}
                  />
                  <div className="ml-4">
                    {/* <div className="text-sm font-medium">{post?.title}</div> */}
                    <div className="text-sm text-gray-500">
                      {/* {post`?.location} */}
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {post.title}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {post.category}
                  </div>
                </td>
                {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {post.author}
                </td> */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {post.tags && post.tags.length > 0 ? (
                    post.tags.map(
                      (tag: { id: number; name: string; slug: string }) => (
                        <span
                          key={tag.id}
                          className="inline-flex items-center px-2 py-1 mr-2 mb-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                          {tag.name}
                        </span>
                      )
                    )
                  ) : (
                    <span className="text-gray-400">
                      {language === "ar" ? "لا توجد وسوم" : "No tags"}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      post.status === "Published" || post.status === "منشور"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}>
                    {post.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <button className="text-blue-600 hover:text-blue-900">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="text-green-600 hover:text-green-900">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BlogPostsDashboardTab;
