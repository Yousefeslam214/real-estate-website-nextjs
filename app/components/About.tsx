'use client';

import React from 'react';
import { Shield, Users, Award, TrendingUp } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

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
    <section id="about" className="py-20 bg-gradient-to-br from-blue-50 to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              {t('about.title')}
            </h2>
            
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              {t('about.description')}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div key={index} className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="bg-gradient-to-br from-blue-500 to-green-500 w-12 h-12 rounded-lg mx-auto mb-4 flex items-center justify-center">
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-2">
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-600">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-200 to-green-200 rounded-2xl p-8">
              <img
                src="https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg"
                alt="About us"
                className="w-full h-96 object-cover rounded-xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;