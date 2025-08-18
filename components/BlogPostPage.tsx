"use client";

import React from "react";
import { ArrowLeft, Calendar, User, Share2, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { DetailsPageProps } from "@/lib/types/detailsPage";
import { formatDate, readTime } from "@/lib/utils/utils";
import Image from "next/image";

const BlogPostPage: React.FC<DetailsPageProps> = ({ initialData }) => {
  const params = useParams();
  console.log("params", params); // Check shape
  const { language } = useLanguage();
  console.log("initialData :", initialData);
  const router = useRouter();
  const post = initialData?.data;
  console.log("Post data fetched:", post);

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            {language === "ar" ? "المقال غير موجود" : "Article Not Found"}
          </h2>
          <button
            onClick={() => router.push("/blog")}
            className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-green-700 transition-all duration-300 flex items-center justify-center mx-auto">
            <ArrowLeft
              className={`mr-2 h-5 w-5 ${language === "ar" && "rotate-180"}`}
            />
            {language === "ar" ? "العودة إلى المدونة" : "Back to Blog"}
          </button>
        </div>
      </div>
    );
  }

  // Find related posts (same category, excluding current)
  const relatedPosts = post[language].relatedPosts;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Hero Section */}
      <div className="relative h-96 w-full">
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/80 z-10" />
        <Image
          src={post.featuredImageUrl}
          alt={post[language].title}
          className="w-full h-full object-cover"
          sizes="100vw"
          width={1920}
          height={384}
        />
        <div
          className="
          absolute bottom-0 left-0 right-0 z-20 max-w-7xl
         mx-auto px-4 sm:px-6 lg:px-8 pb-12
         ">
          <div className="max-w-3xl">
            <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium mb-4 inline-block">
              {post.category === "housing"
                ? language === "ar"
                  ? "مشاريع الإسكان"
                  : "Housing Projects"
                : post.category === "digital"
                ? language === "ar"
                  ? "الخدمات الرقمية"
                  : "Digital Services"
                : post.category === "investment"
                ? language === "ar"
                  ? "الاستثمار"
                  : "Investment"
                : language === "ar"
                ? "الاستدامة"
                : "Sustainability"}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {language === "ar" ? post.titleAr : post.titleEn}
            </h1>
            <div className="flex flex-wrap items-center text-gray-200 text-sm">
              <div className="flex items-center mr-6 mb-2">
                <User className="h-4 w-4 mr-2" />
                <span>{post.author.name}</span>
              </div>
              <div className="flex items-center mr-6 mb-2">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{formatDate(language)}</span>
              </div>
              <div className="flex items-center mb-2">
                <span>{readTime(language)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="lead text-gray-700 dark:text-gray-300 text-xl mb-8">
              {post.excerpt}
            </p>

            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl my-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                {language === "ar" ? "جدول المحتويات" : "Table of Contents"}
              </h3>
              <ul className="list-disc pl-5 space-y-2">
                {post[language].tableOfContents?.map(
                  (
                    item: {
                      id: string | number;
                      heading: string;
                      tocOrder?: number;
                    },
                    index: number
                  ) => (
                    <li key={item.id ?? index}>
                      <a
                        href={`#${item.heading}`}
                        className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">
                        {item.heading}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>

            <p className="mb-6">{post.content}</p>

            <h2 className="text-2xl font-bold mt-10 mb-6">
              {language === "ar" ? "ملخص المقال" : "Post Summary"}
            </h2>

            <p className="mb-6">
              {language === "ar" ? post.summaryAr : post.summaryEn}
            </p>

            {/* Render content sections */}
            {post[language]?.contentSections?.map(
              (section: any, idx: number) => (
                <section key={section.id || idx} className="mb-12">
                  {section.heading && (
                    <h2
                      id={`${section.heading}`}
                      className="text-2xl font-bold mb-4 scroll-mt-24">
                      {section.heading}
                    </h2>
                  )}

                  {section.sectionType === "text" && (
                    <p className="mb-4">{section.body}</p>
                  )}

                  {/* {section.sectionType === "code" && (
                    <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto">
                      <code>{section.body}</code>
                    </pre>
                  )} */}

                  {section.sectionType !== "text" && (
                    //   && section.sectionType !== "code"
                    <div className="mb-4">{section.body}</div>
                  )}
                </section>
              )
            )}

            {/* Gather all FAQ items and show at the end */}
            {(() => {
              const allFaqs = post[language]?.contentSections
                ?.flatMap((sec: any) => sec.faqItems || [])
                ?.filter((faq: any) => faq.question && faq.answer);

              return allFaqs?.length > 0 ? (
                <section className="mb-12">
                  <h2 className="text-2xl font-bold mb-6">
                    {language === "ar"
                      ? "الأسئلة الشائعة"
                      : "Frequently Asked Questions"}
                  </h2>
                  <div className="space-y-4">
                    {allFaqs.map((faq: any, i: number) => (
                      <div
                        key={i}
                        className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                        <h3 className="font-semibold mb-2">{faq.question}</h3>
                        <p>{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </section>
              ) : null;
            })()}
          </div>

          {/* Share Buttons */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {language === "ar" ? "شارك هذه المقالة" : "Share this article"}
              </h3>
              <div className="flex space-x-3 rtl:space-x-reverse">
                <button className="bg-gray-200 dark:bg-gray-700 p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200">
                  <Share2 className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-12 bg-gray-100 dark:bg-gray-800 transition-colors duration-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {language === "ar" ? "مقالات ذات صلة" : "Related Articles"}
              </h2>
              <Link
                href="/blog"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium flex items-center">
                {language === "ar" ? "عرض الكل" : "View All"}
                <ArrowRight
                  className={`h-5 w-5 ${
                    language === "ar" ? "mr-2 rotate-180" : "ml-2"
                  }`}
                />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((post: any) => (
                <article
                  key={post.id}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="relative h-48 overflow-hidden">
                    {/* <img
                      src={post.featuredImageUrl}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    /> */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {post.category === "housing"
                          ? language === "ar"
                            ? "مشاريع الإسكان"
                            : "Housing"
                          : post.category === "digital"
                          ? language === "ar"
                            ? "رقمية"
                            : "Digital"
                          : post.category === "investment"
                          ? language === "ar"
                            ? "استثمار"
                            : "Investment"
                          : language === "ar"
                          ? "استدامة"
                          : "Sustainability"}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between text-gray-500 dark:text-gray-400 text-sm mb-3">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>{formatDate(language)}</span>
                      </div>
                      <span>
                        {/* Random read time between 2 and 10 min */}
                        {readTime(language)}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                      {post.relatedPostTitle}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                      {/* {post.excerpt} */}
                    </p>

                    <Link
                      href={`/blog/${post.id}`}
                      className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold transition-colors duration-200">
                      <span>
                        {language === "ar" ? "اقرأ المزيد" : "Read More"}
                      </span>
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
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            {language === "ar"
              ? "انضم إلى قائمتنا البريدية"
              : "Join Our Newsletter"}
          </h2>
          <p className="text-xl mb-10 max-w-3xl mx-auto text-blue-100">
            {language === "ar"
              ? "احصل على آخر التحديثات والمشاريع العقارية الجديدة مباشرة في بريدك الإلكتروني"
              : "Get the latest updates and new real estate projects directly in your inbox"}
          </p>

          <div className="max-w-xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder={
                  language === "ar" ? "بريدك الإلكتروني" : "Your email address"
                }
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 whitespace-nowrap">
                {language === "ar" ? "اشتراك" : "Subscribe"}
              </button>
            </div>
            <p className="text-sm mt-3 text-blue-200">
              {language === "ar"
                ? "نحن نحترم خصوصيتك. لن نشارك بريدك مع أي طرف ثالث."
                : "We respect your privacy. We'll never share your email with any third parties."}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPostPage;
