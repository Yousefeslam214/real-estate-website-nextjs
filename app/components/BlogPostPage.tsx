// app/blog/[...slug]/page.tsx
"use client";

import React from "react";
import { ArrowLeft, Calendar, User, Share2, ArrowRight } from "lucide-react";
import { useLanguage } from "@/app/contexts/LanguageContext";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { DetailsPageProps } from "@/types/detailsPage";

// Define the blog post type
interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  image: string;
  category: string;
  readTime: string;
}

// Mock blog data (same as in your blog/page.tsx)
const blogPosts : BlogPost[] = [
  {
    id: 1,
    title: "Launch of New Administrative Capital Phase 3",
    excerpt:
      "Government announces the launch of the third phase of the New Administrative Capital project...",
    content:
      "The third phase of the New Administrative Capital project has been officially announced, aiming to provide 50,000 new residential units and advanced facilities.",
    date: "2025-01-15",
    author: "Ministry of Housing",
    image: "https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg",
    category: "housing",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "Digital Transformation in Real Estate",
    excerpt:
      "How digital services are revolutionizing property management and transactions in Egypt.",
    content:
      "Digital platforms are streamlining property management, making transactions faster and more transparent for buyers and sellers.",
    date: "2024-11-20",
    author: "Tech Insights",
    image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg",
    category: "digital",
    readTime: "4 min read",
  },
  {
    id: 3,
    title: "Investment Opportunities in Cairo’s New Districts",
    excerpt:
      "Explore the best investment opportunities in Cairo’s rapidly developing districts.",
    content:
      "Cairo’s new districts offer lucrative investment opportunities with high ROI and modern infrastructure.",
    date: "2024-12-05",
    author: "Investment Weekly",
    image: "https://images.pexels.com/photos/210617/pexels-photo-210617.jpeg",
    category: "investment",
    readTime: "6 min read",
  },
  {
    id: 4,
    title: "Sustainable Housing Projects in Egypt",
    excerpt:
      "A look at the latest sustainable housing initiatives and their impact on communities.",
    content:
      "Sustainable housing projects are improving living standards and reducing environmental impact across Egypt.",
    date: "2025-02-10",
    author: "Green Future",
    image: "https://images.pexels.com/photos/1643389/pexels-photo-1643389.jpeg",
    category: "sustainability",
    readTime: "5 min read",
  },
  {
    id: 5,
    title: "Affordable Housing for Young Families",
    excerpt:
      "Government launches new affordable housing schemes targeting young families.",
    content:
      "The new schemes provide affordable options for young families, with flexible payment plans and modern amenities.",
    date: "2025-03-01",
    author: "Ministry of Housing",
    image: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg",
    category: "housing",
    readTime: "4 min read",
  },
  {
    id: 6,
    title: "Smart Cities: The Future of Urban Living",
    excerpt:
      "Discover how smart city technologies are shaping the future of urban living in Egypt.",
    content:
      "Smart cities integrate IoT, AI, and green technologies to create efficient, sustainable urban environments.",
    date: "2025-04-12",
    author: "Tech Insights",
    image: "https://images.pexels.com/photos/373912/pexels-photo-373912.jpeg",
    category: "digital",
    readTime: "7 min read",
  },
  {
    id: 7,
    title: "Foreign Investment in Egyptian Real Estate",
    excerpt:
      "An overview of foreign investment trends and their impact on the real estate market.",
    content:
      "Foreign investors are increasingly attracted to Egypt’s real estate market due to favorable policies and strong growth.",
    date: "2025-05-18",
    author: "Investment Weekly",
    image: "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg",
    category: "investment",
    readTime: "5 min read",
  },
  {
    id: 8,
    title: "Eco-Friendly Building Materials",
    excerpt:
      "The rise of eco-friendly building materials in new construction projects.",
    content:
      "Builders are adopting eco-friendly materials to reduce carbon footprint and improve energy efficiency.",
    date: "2025-06-02",
    author: "Green Future",
    image: "https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg",
    category: "sustainability",
    readTime: "4 min read",
  },
  {
    id: 9,
    title: "Luxury Apartments in Downtown Cairo",
    excerpt:
      "A guide to the most luxurious apartments available in downtown Cairo.",
    content:
      "Downtown Cairo offers a range of luxury apartments with premium amenities and stunning views.",
    date: "2025-07-14",
    author: "Real Estate Guide",
    image: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg",
    category: "housing",
    readTime: "6 min read",
  },
  {
    id: 10,
    title: "Renewable Energy in Real Estate Developments",
    excerpt:
      "How renewable energy is being integrated into new real estate developments.",
    content:
      "Developers are incorporating solar and wind energy solutions to power new residential and commercial projects.",
    date: "2025-08-09",
    author: "Green Future",
    image: "https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg",
    category: "sustainability",
    readTime: "5 min read",
  },
];

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: [
      post.id.toString(),
      post.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    ],
  }));
}

// // const BlogPostPage = ({ params }: { params: { slug: string[] } }) => {
// const BlogPostPage = (id: DetailsPageProps) => {

const BlogPostPage: React.FC<DetailsPageProps> = ({ id, initialData }) => {
  const params = useParams();
  console.log("params", params); // Check shape
  const { language, t } = useLanguage();
  console.log("initialData :", initialData);
  const router = useRouter();
  const postId = parseInt(params.slug[0]);
  // const post = blogPosts.find((p) => p.id === postId);
  const post = initialData?.data;
  console.log("Post data fetched:", post);
  // Format date function
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === "ar" ? "ar-EG" : "en-EG", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

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
  const relatedPosts = blogPosts
    .filter((p) => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Hero Section */}
      <div className="relative h-96">
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/80 z-10" />
        <img
          src={post.featuredImageUrl}
          alt={post.title}
          className="w-full h-full object-cover"
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
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center text-gray-200 text-sm">
              <div className="flex items-center mr-6 mb-2">
                <User className="h-4 w-4 mr-2" />
                <span>{post.author.name}</span>
              </div>
              <div className="flex items-center mr-6 mb-2">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{formatDate(post.date)}</span>
              </div>
              <div className="flex items-center mb-2">
                <span>{post.readTime}</span>
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
                {language === "ar" ? "النقاط الرئيسية" : "Key Takeaways"}
              </h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  {language === "ar"
                    ? "إطلاق المرحلة الثالثة من مشروع العاصمة الإدارية"
                    : "Launch of New Administrative Capital Phase 3"}
                </li>
                <li>
                  {language === "ar"
                    ? "توفير 50,000 وحدة سكنية جديدة"
                    : "Provision of 50,000 new residential units"}
                </li>
                <li>
                  {language === "ar"
                    ? "مرافق تجارية وترفيهية وتعليمية متطورة"
                    : "Advanced commercial, recreational, and educational facilities"}
                </li>
              </ul>
            </div>

            <p className="mb-6">{post.content}</p>

            <h2 className="text-2xl font-bold mt-10 mb-6">
              {language === "ar" ? "ملخص المقال" : "Post Summary"}
            </h2>

            <p className="mb-6">
              {language === "ar"
                ? "يشمل المشروع إنشاء 50,000 وحدة سكنية متنوعة تلبي احتياجات جميع الشرائح الاجتماعية، بالإضافة إلى مرافق تجارية وترفيهية وتعليمية متطورة. تم تصميم المشروع ليكون نموذجاً للتنمية المستدامة والتخطيط الحضري الحديث في المنطقة."
                : "The project includes the construction of 50,000 diverse residential units catering to all social segments, along with advanced commercial, recreational, and educational facilities. Designed to be a model of sustainable development and modern urban planning in the region."}
            </p>
            <h2 className="text-2xl font-bold mt-10 mb-6">
              {language === "ar" ? "تفاصيل المشروع" : "Project Details"}
            </h2>

            <p className="mb-6">
              {language === "ar"
                ? "يشمل المشروع إنشاء 50,000 وحدة سكنية متنوعة تلبي احتياجات جميع الشرائح الاجتماعية، بالإضافة إلى مرافق تجارية وترفيهية وتعليمية متطورة. تم تصميم المشروع ليكون نموذجاً للتنمية المستدامة والتخطيط الحضري الحديث في المنطقة."
                : "The project includes the construction of 50,000 diverse residential units catering to all social segments, along with advanced commercial, recreational, and educational facilities. Designed to be a model of sustainable development and modern urban planning in the region."}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
              <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  {language === "ar" ? "المزايا الرئيسية" : "Key Benefits"}
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>
                      {language === "ar"
                        ? "وحدات سكنية بأسعار تنافسية"
                        : "Competitively priced residential units"}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>
                      {language === "ar"
                        ? "بنية تحتية متطورة"
                        : "Advanced infrastructure"}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>
                      {language === "ar"
                        ? "تصميم مستدام وصديق للبيئة"
                        : "Sustainable and eco-friendly design"}
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  {language === "ar" ? "الجدول الزمني" : "Timeline"}
                </h3>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span>
                      {language === "ar"
                        ? "بدء الإنشاءات"
                        : "Construction start"}
                    </span>
                    <span className="font-medium">Q1 2025</span>
                  </li>
                  <li className="flex justify-between">
                    <span>
                      {language === "ar"
                        ? "استلام المرحلة الأولى"
                        : "Phase 1 delivery"}
                    </span>
                    <span className="font-medium">Q4 2026</span>
                  </li>
                  <li className="flex justify-between">
                    <span>
                      {language === "ar"
                        ? "الانتهاء الكامل"
                        : "Full completion"}
                    </span>
                    <span className="font-medium">Q2 2028</span>
                  </li>
                </ul>
              </div>
            </div>

            <blockquote className="border-l-4 border-blue-600 pl-6 py-3 my-8 italic text-gray-700 dark:text-gray-300">
              {language === "ar"
                ? "يمثل هذا المشروع نقلة نوعية في قطاع الإسكان المصري، حيث يدمج بين التصميم الحديث والممارسات المستدامة لخلق مجتمعات متكاملة تلبي احتياجات المواطنين."
                : "This project represents a qualitative leap in the Egyptian housing sector, integrating modern design and sustainable practices to create integrated communities that meet citizens' needs."}
            </blockquote>

            <h2 className="text-2xl font-bold mt-10 mb-6">
              {language === "ar" ? "التأثير المجتمعي" : "Community Impact"}
            </h2>

            <p className="mb-6">
              {language === "ar"
                ? "من المتوقع أن يوفر المشروع أكثر من 100,000 فرصة عمل مباشرة وغير مباشرة خلال مراحل الإنشاء المختلفة، كما سيسهم في تحسين جودة الحياة للمواطنين من خلال توفير مساحات خضراء ومرافق عامة عالية الجودة. سيتم تخصيص 20% من الوحدات السكنية للشباب والأسر محدودة الدخل."
                : "The project is expected to provide over 100,000 direct and indirect job opportunities during various construction phases. It will also improve citizens' quality of life by providing green spaces and high-quality public facilities. 20% of residential units will be allocated to youth and low-income families."}
            </p>
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
              {relatedPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.featuredImageUrl}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
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
                        <span>{formatDate(post.date)}</span>
                      </div>
                      <span>{post.readTime}</span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <Link
                      href={`/blog/${post.id}/${post.title
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, "-")}`}
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
