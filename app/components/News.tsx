'use client';

import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const News: React.FC = () => {
  const { language, t } = useLanguage();

  const newsItems = [
    {
      id: 1,
      title: language === 'ar' ? 'إطلاق مشروع العاصمة الإدارية الجديدة المرحلة الثالثة' : 'Launch of New Administrative Capital Phase 3',
      excerpt: language === 'ar' ? 'الحكومة تعلن عن إطلاق المرحلة الثالثة من مشروع العاصمة الإدارية الجديدة بخطة استثمارية ضخمة...' : 'Government announces the launch of the third phase of the New Administrative Capital project with massive investment plans...',
      date: '2025-01-15',
      image: 'https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg',
      category: language === 'ar' ? 'أخبار' : 'News'
    },
    {
      id: 2,
      title: language === 'ar' ? 'تحديث قوانين التملك للأجانب في مصر' : 'Updated Foreign Ownership Laws in Egypt',
      excerpt: language === 'ar' ? 'تحديثات جديدة على قوانين تملك الأجانب للعقارات في مصر لتشجيع الاستثمار الأجنبي...' : 'New updates to foreign property ownership laws in Egypt to encourage foreign investment...',
      date: '2025-01-12',
      image: 'https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg',
      category: language === 'ar' ? 'قوانين' : 'Regulations'
    },
    {
      id: 3,
      title: language === 'ar' ? 'برنامج الإسكان الاجتماعي الجديد' : 'New Social Housing Program',
      excerpt: language === 'ar' ? 'إطلاق برنامج جديد للإسكان الاجتماعي يستهدف الشباب والأسر محدودة الدخل...' : 'Launch of a new social housing program targeting youth and low-income families...',
      date: '2025-01-10',
      image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg',
      category: language === 'ar' ? 'برامج' : 'Programs'
    }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-EG');
  };

  return (
    <section id="news" className="py-20 bg-white dark:bg-gray-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('news.title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('news.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((item) => (
            <article key={item.id} className="bg-gray-50 dark:bg-gray-700 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {item.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-3">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{formatDate(item.date)}</span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                  {item.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {item.excerpt}
                </p>

                <button className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold transition-colors duration-200">
                  <span>{t('news.read.more')}</span>
                  <ArrowRight className={`h-4 w-4 ${language === 'ar' ? 'mr-2 rotate-180' : 'ml-2'}`} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default News;