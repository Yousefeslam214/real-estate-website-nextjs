'use client';

import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { 
  Users, 
  Target, 
  Award, 
  TrendingUp, 
  MapPin, 
  Phone, 
  Mail,
  Calendar,
  Building,
  Star,
  CheckCircle
} from 'lucide-react';

const About: React.FC = () => {
  const { language, t } = useLanguage();
  const { theme } = useTheme();

  const stats = [
    { icon: Building, value: '500+', label: language === 'ar' ? 'عقار متاح' : 'Properties Available' },
    { icon: Users, value: '1000+', label: language === 'ar' ? 'عميل راضي' : 'Happy Clients' },
    { icon: Award, value: '15+', label: language === 'ar' ? 'سنة خبرة' : 'Years Experience' },
    { icon: TrendingUp, value: '95%', label: language === 'ar' ? 'معدل النجاح' : 'Success Rate' },
  ];

  const values = [
    {
      icon: CheckCircle,
      title: language === 'ar' ? 'الشفافية' : 'Transparency',
      description: language === 'ar' 
        ? 'نؤمن بالشفافية الكاملة في جميع معاملاتنا العقارية'
        : 'We believe in complete transparency in all our real estate transactions'
    },
    {
      icon: Star,
      title: language === 'ar' ? 'الجودة' : 'Quality',
      description: language === 'ar'
        ? 'نقدم أعلى مستويات الجودة في الخدمات العقارية'
        : 'We provide the highest quality standards in real estate services'
    },
    {
      icon: Users,
      title: language === 'ar' ? 'خدمة العملاء' : 'Customer Service',
      description: language === 'ar'
        ? 'فريق متخصص لخدمة العملاء على مدار الساعة'
        : 'Dedicated customer service team available 24/7'
    },
    {
      icon: Target,
      title: language === 'ar' ? 'الابتكار' : 'Innovation',
      description: language === 'ar'
        ? 'نستخدم أحدث التقنيات في مجال العقارات'
        : 'We use the latest technologies in real estate'
    },
  ];

  const team = [
    {
      name: language === 'ar' ? 'أحمد محمد' : 'Ahmed Mohamed',
      role: language === 'ar' ? 'المدير التنفيذي' : 'CEO & Founder',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      experience: language === 'ar' ? '15 سنة خبرة' : '15 Years Experience'
    },
    {
      name: language === 'ar' ? 'فاطمة علي' : 'Fatima Ali',
      role: language === 'ar' ? 'مدير المبيعات' : 'Sales Manager',
      image: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      experience: language === 'ar' ? '10 سنوات خبرة' : '10 Years Experience'
    },
    {
      name: language === 'ar' ? 'محمد حسن' : 'Mohamed Hassan',
      role: language === 'ar' ? 'مدير التسويق' : 'Marketing Manager',
      image: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      experience: language === 'ar' ? '8 سنوات خبرة' : '8 Years Experience'
    },
  ];

  const timeline = [
    {
      year: '2009',
      title: language === 'ar' ? 'تأسيس الشركة' : 'Company Founded',
      description: language === 'ar' 
        ? 'بدأنا رحلتنا في مجال العقارات بفريق صغير وأحلام كبيرة'
        : 'Started our journey in real estate with a small team and big dreams'
    },
    {
      year: '2015',
      title: language === 'ar' ? 'التوسع الأول' : 'First Expansion',
      description: language === 'ar'
        ? 'افتتحنا فروعاً جديدة في القاهرة والإسكندرية'
        : 'Opened new branches in Cairo and Alexandria'
    },
    {
      year: '2020',
      title: language === 'ar' ? 'التحول الرقمي' : 'Digital Transformation',
      description: language === 'ar'
        ? 'أطلقنا منصتنا الرقمية لتسهيل عمليات البيع والشراء'
        : 'Launched our digital platform to facilitate buying and selling'
    },
    {
      year: '2024',
      title: language === 'ar' ? 'القيادة في السوق' : 'Market Leadership',
      description: language === 'ar'
        ? 'أصبحنا من الشركات الرائدة في مجال العقارات في مصر'
        : 'Became one of the leading real estate companies in Egypt'
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
 
        
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-600 to-green-600 text-white py-20">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              {language === 'ar' ? 'من نحن' : 'About Us'}
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-blue-100 dark:text-blue-200">
              {language === 'ar' 
                ? 'نحن شركة رائدة في مجال العقارات في مصر، نقدم خدمات متميزة لعملائنا منذ أكثر من 15 عاماً'
                : 'We are a leading real estate company in Egypt, providing exceptional services to our clients for over 15 years'
              }
            </p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full mb-4">
                    <stat.icon className="h-8 w-8" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{stat.value}</div>
                  <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 bg-white dark:bg-gray-800 transition-colors duration-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  {language === 'ar' ? 'رؤيتنا' : 'Our Vision'}
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  {language === 'ar'
                    ? 'أن نكون الشركة الرائدة في مجال العقارات في مصر والشرق الأوسط، ونقدم حلولاً عقارية مبتكرة تلبي احتياجات عملائنا وتحقق طموحاتهم في الحصول على المنزل المثالي.'
                    : 'To be the leading real estate company in Egypt and the Middle East, providing innovative real estate solutions that meet our clients\' needs and achieve their dreams of finding the perfect home.'
                  }
                </p>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  {language === 'ar' ? 'مهمتنا' : 'Our Mission'}
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  {language === 'ar'
                    ? 'نسعى لتقديم خدمات عقارية متميزة تتسم بالشفافية والمهنية، ونساعد عملائنا في اتخاذ قرارات استثمارية ذكية من خلال فريق من الخبراء المتخصصين وأحدث التقنيات.'
                    : 'We strive to provide exceptional real estate services characterized by transparency and professionalism, helping our clients make smart investment decisions through a team of specialized experts and the latest technologies.'
                  }
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {language === 'ar' ? 'قيمنا' : 'Our Values'}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                {language === 'ar'
                  ? 'القيم التي نؤمن بها وتوجه عملنا اليومي'
                  : 'The values we believe in and that guide our daily work'
                }
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full mb-4">
                    <value.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{value.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-16 bg-white dark:bg-gray-800 transition-colors duration-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {language === 'ar' ? 'فريقنا' : 'Our Team'}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                {language === 'ar'
                  ? 'تعرف على الفريق المتخصص الذي يعمل على تحقيق أهدافك العقارية'
                  : 'Meet the specialized team working to achieve your real estate goals'
                }
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden shadow-lg">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{member.name}</h3>
                    <p className="text-blue-600 dark:text-blue-400 mb-2">{member.role}</p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{member.experience}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {language === 'ar' ? 'رحلتنا' : 'Our Journey'}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                {language === 'ar'
                  ? 'المحطات المهمة في تاريخ شركتنا'
                  : 'Important milestones in our company history'
                }
              </p>
            </div>
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <div key={index} className="flex items-start space-x-4 rtl:space-x-reverse">
                  <div className="flex-shrink-0 w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    {item.year}
                  </div>
                  <div className="flex-1 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-blue-600 to-green-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6 text-white">
              {language === 'ar' ? 'هل أنت مستعد للبدء؟' : 'Ready to Get Started?'}
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-blue-100 dark:text-blue-200">
              {language === 'ar'
                ? 'تواصل معنا اليوم ودعنا نساعدك في العثور على العقار المثالي'
                : 'Contact us today and let us help you find the perfect property'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
              >
                {language === 'ar' ? 'تواصل معنا' : 'Contact Us'}
              </a>
              <a
                href="/buy/residential/apartment"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200"
              >
                {language === 'ar' ? 'تصفح العقارات' : 'Browse Properties'}
              </a>
            </div>
          </div>
        </section>
    </div>
  );
};

export default About;