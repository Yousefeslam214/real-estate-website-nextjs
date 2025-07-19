'use client';

import React from 'react';
import { FileText, Calculator, Shield, Scale } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Services: React.FC = () => {
  const { t } = useLanguage();

  const services = [
    {
      icon: FileText,
      title: t('services.registration'),
      description: t('services.registration.desc'),
      color: 'bg-blue-500'
    },
    {
      icon: Calculator,
      title: t('services.valuation'),
      description: t('services.valuation.desc'),
      color: 'bg-green-500'
    },
    {
      icon: Shield,
      title: t('services.licensing'),
      description: t('services.licensing.desc'),
      color: 'bg-purple-500'
    },
    {
      icon: Scale,
      title: t('services.consultation'),
      description: t('services.consultation.desc'),
      color: 'bg-orange-500'
    }
  ];

  return (
    <section id="services" className="py-20 bg-white dark:bg-gray-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('services.title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div key={index} className="text-center group">
                <div className="relative mb-6">
                  <div className={`${service.color} w-20 h-20 rounded-2xl mx-auto flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <IconComponent className="h-10 w-10 text-white" />
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;