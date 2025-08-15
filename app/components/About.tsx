'use client';

import React from 'react';
import { Shield, Users, Award, TrendingUp } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import Image from 'next/image';

const About: React.FC = () => {
  const { language, t } = useLanguage();

  const stats = [
    {
      icon: Users,
      number: '50,000+',
      label: language === 'ar' ? 'عميل راضٍ' : 'Satisfied Clients'
    },
    {
      icon: Shield,
      number: '15+',
      label: language === 'ar' ? 'سنوات من الخبرة' : 'Years of Experience'
    },
    {
      icon: Award,
      number: '100%',
      label: language === 'ar' ? 'معتمد حكومياً' : 'Government Certified'
    },
    {
      icon: TrendingUp,
      number: '25,000+',
      label: language === 'ar' ? 'عقار مسجل' : 'Properties Registered'
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              {t('about.title')}
            </h2>
            
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
              {t('about.description')}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div key={index} className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="bg-gradient-to-br from-blue-500 to-green-500 w-12 h-12 rounded-lg mx-auto mb-4 flex items-center justify-center">
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-200 to-green-200 dark:from-blue-900 dark:to-green-900 rounded-2xl p-8">
              <Image
                src="https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg"
                alt="About us"
                className="w-full h-96 object-cover rounded-xl shadow-xl"
                width={500}
                height={300}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;