"use client";

import React, { useState } from "react";
import { Search, Calendar, User, ArrowRight, Filter } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import useSWR from "swr";
import { fetcher } from "@/services/shared/fetcher";
import { baseUrl } from "@/services/shared/apiUrl";
import Link from "next/link";
import { ButtonLoading } from "../components/ButtonLoading";

const BlogPage: React.FC = () => {
  const { language, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

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

<<<<<<< HEAD
  const blogPosts1 = [
    {
      id: 1,
      title:
        language === "ar"
          ? "إطلاق مشروع العاصمة الإدارية الجديدة المرحلة الثالثة"
          : "Launch of New Administrative Capital Phase 3",
      excerpt:
        language === "ar"
          ? "الحكومة تعلن عن إطلاق المرحلة الثالثة من مشروع العاصمة الإدارية الجديدة بخطة استثمارية ضخمة تهدف إلى توفير 50,000 وحدة سكنية جديدة..."
          : "Government announces the launch of the third phase of the New Administrative Capital project with massive investment plans aimed at providing 50,000 new residential units...",
      content:
        language === "ar"
          ? "تم الإعلان رسمياً عن إطلاق المرحلة الثالثة من مشروع العاصمة الإدارية الجديدة، والتي تعد من أكبر المشاريع التنموية في مصر. يشمل المشروع إنشاء 50,000 وحدة سكنية متنوعة تلبي احتياجات جميع الشرائح الاجتماعية، بالإضافة إلى مرافق تجارية وترفيهية وتعليمية متطورة."
          : "The third phase of the New Administrative Capital project has been officially announced, representing one of Egypt's largest development projects. The project includes the construction of 50,000 diverse residential units catering to all social segments, along with advanced commercial, recreational, and educational facilities.",
      date: "2025-01-15",
      author: language === "ar" ? "وزارة الإسكان" : "Ministry of Housing",
      image:
        "https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg",
      category: "housing",
      readTime: language === "ar" ? "5 دقائق" : "5 min read",
    },
    {
      id: 2,
      title:
        language === "ar"
          ? "تحديث قوانين التملك للأجانب في مصر"
          : "Updated Foreign Ownership Laws in Egypt",
      excerpt:
        language === "ar"
          ? "تحديثات جديدة على قوانين تملك الأجانب للعقارات في مصر لتشجيع الاستثمار الأجنبي وجذب رؤوس الأموال الدولية..."
          : "New updates to foreign property ownership laws in Egypt to encourage foreign investment and attract international capital...",
      content:
        language === "ar"
          ? "أقرت الحكومة المصرية تحديثات مهمة على قوانين تملك الأجانب للعقارات، تهدف إلى تسهيل إجراءات الاستثمار وجذب المزيد من رؤوس الأموال الأجنبية. التحديثات تشمل تبسيط الإجراءات البيروقراطية وتوفير حوافز ضريبية للمستثمرين الأجانب."
          : "The Egyptian government has approved important updates to foreign property ownership laws, aimed at facilitating investment procedures and attracting more foreign capital. The updates include simplifying bureaucratic procedures and providing tax incentives for foreign investors.",
      date: "2025-01-12",
      author: language === "ar" ? "وزارة العدل" : "Ministry of Justice",
      image:
        "https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg",
      category: "investment",
      readTime: language === "ar" ? "7 دقائق" : "7 min read",
    },
    {
      id: 3,
      title:
        language === "ar"
          ? "برنامج الإسكان الاجتماعي الجديد"
          : "New Social Housing Program",
      excerpt:
        language === "ar"
          ? "إطلاق برنامج جديد للإسكان الاجتماعي يستهدف الشباب والأسر محدودة الدخل بشروط ميسرة وأسعار مدعومة..."
          : "Launch of a new social housing program targeting youth and low-income families with flexible conditions and subsidized prices...",
      content:
        language === "ar"
          ? "أطلقت وزارة الإسكان برنامجاً جديداً للإسكان الاجتماعي يهدف إلى توفير وحدات سكنية بأسعار مدعومة للشباب والأسر محدودة الدخل. البرنامج يوفر تسهيلات في السداد وشروط ميسرة للحصول على وحدة سكنية مناسبة."
          : "The Ministry of Housing has launched a new social housing program aimed at providing subsidized residential units for youth and low-income families. The program offers payment facilities and flexible conditions for obtaining suitable housing units.",
      date: "2025-01-10",
      author: language === "ar" ? "وزارة الإسكان" : "Ministry of Housing",
      image:
        "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg",
      category: "housing",
      readTime: language === "ar" ? "4 دقائق" : "4 min read",
    },
    {
      id: 4,
      title:
        language === "ar"
          ? "منصة رقمية جديدة لخدمات العقارات"
          : "New Digital Platform for Real Estate Services",
      excerpt:
        language === "ar"
          ? "إطلاق منصة رقمية متطورة تسهل على المواطنين الحصول على الخدمات العقارية إلكترونياً دون الحاجة لزيارة المكاتب الحكومية..."
          : "Launch of an advanced digital platform that makes it easier for citizens to access real estate services electronically without visiting government offices...",
      content:
        language === "ar"
          ? "تم إطلاق منصة رقمية جديدة تهدف إلى رقمنة جميع الخدمات العقارية وتسهيل الحصول عليها إلكترونياً. المنصة توفر خدمات التسجيل والتقييم والاستعلام عن العقارات بطريقة سهلة وآمنة."
          : "A new digital platform has been launched aimed at digitizing all real estate services and facilitating electronic access to them. The platform provides registration, valuation, and property inquiry services in an easy and secure manner.",
      date: "2025-01-08",
      author:
        language === "ar" ? "وزارة الاتصالات" : "Ministry of Communications",
      image: "https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg",
      category: "digital",
      readTime: language === "ar" ? "6 دقائق" : "6 min read",
    },
    {
      id: 5,
      title:
        language === "ar"
          ? "مبادرة المباني الخضراء في مصر"
          : "Green Buildings Initiative in Egypt",
      excerpt:
        language === "ar"
          ? "إطلاق مبادرة جديدة لتشجيع البناء المستدام والمباني الصديقة للبيئة في جميع المشاريع العقارية الجديدة..."
          : "Launch of a new initiative to encourage sustainable construction and environmentally friendly buildings in all new real estate projects...",
      content:
        language === "ar"
          ? "أطلقت الحكومة مبادرة المباني الخضراء التي تهدف إلى تشجيع استخدام تقنيات البناء المستدام والمواد الصديقة للبيئة. المبادرة تقدم حوافز للمطورين الذين يلتزمون بمعايير البناء الأخضر."
          : "The government has launched the Green Buildings Initiative aimed at encouraging the use of sustainable construction techniques and environmentally friendly materials. The initiative provides incentives for developers who comply with green building standards.",
      date: "2025-01-05",
      author: language === "ar" ? "وزارة البيئة" : "Ministry of Environment",
      image:
        "https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg",
      category: "sustainability",
      readTime: language === "ar" ? "5 دقائق" : "5 min read",
    },
    {
      id: 6,
      title:
        language === "ar"
          ? "تطوير المدن الجديدة في صعيد مصر"
          : "Development of New Cities in Upper Egypt",
      excerpt:
        language === "ar"
          ? "خطة طموحة لتطوير مدن جديدة في صعيد مصر لتحقيق التوازن التنموي وجذب الاستثمارات للمحافظات الجنوبية..."
          : "Ambitious plan to develop new cities in Upper Egypt to achieve developmental balance and attract investments to southern governorates...",
      content:
        language === "ar"
          ? "تعمل الحكومة على تنفيذ خطة شاملة لتطوير مدن جديدة في صعيد مصر، تهدف إلى تحقيق التوازن التنموي بين المحافظات وجذب الاستثمارات للمناطق الجنوبية. المشروع يشمل إنشاء مناطق سكنية وصناعية وتجارية متكاملة."
          : "The government is implementing a comprehensive plan to develop new cities in Upper Egypt, aimed at achieving developmental balance between governorates and attracting investments to southern regions. The project includes establishing integrated residential, industrial, and commercial areas.",
      date: "2025-01-03",
      author:
        language === "ar"
          ? "وزارة التنمية المحلية"
          : "Ministry of Local Development",
      image:
        "https://images.pexels.com/photos/1546168/pexels-photo-1546168.jpeg",
      category: "housing",
      readTime: language === "ar" ? "8 دقائق" : "8 min read",
    },
  ];

=======
>>>>>>> c79548b (Updated)
  const { data, isLoading, error } = useSWR(`${baseUrl}/posts`, fetcher);

  const blogPosts = data?.data || [];
  console.log("blogPosts");
  console.log(blogPosts);

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === "ar" ? "ar-EG" : "en-EG");
  };

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
<<<<<<< HEAD
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
=======
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          {isLoading && <ButtonLoading />}
>>>>>>> c79548b (Updated)
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
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
                      {
                        categories.find((cat) => cat.value === post.category)
                          ?.label
                      }
                      {Array.isArray(post.categories) &&
                        post.categories.map(
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

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                    {post.excerpt}
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

<<<<<<< HEAD
          {filteredPosts.length === 0 && (
=======
          {filteredPosts.length === 0 && !isLoading && (
>>>>>>> c79548b (Updated)
            <div className="text-center py-16">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                {language === "ar"
                  ? "لم يتم العثور على مقالات تطابق البحث"
                  : "No articles found matching your search"}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
