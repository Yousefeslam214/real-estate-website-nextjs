'use client';

import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Contact: React.FC = () => {
  const { t } = useLanguage();

  const contactInfo = [
    {
      icon: MapPin,
      title: t('contact.address'),
      color: 'bg-blue-500'
    },
    {
      icon: Phone,
      title: t('contact.phone'),
      color: 'bg-green-500'
    },
    {
      icon: Mail,
      title: t('contact.email'),
      color: 'bg-purple-500'
    },
    {
      icon: Clock,
      title: t('contact.hours'),
      color: 'bg-orange-500'
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('contact.title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div className="space-y-8">
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon;
              return (
                <div key={index} className="flex items-start space-x-4 rtl:space-x-reverse">
                  <div className={`${info.color} w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <IconComponent className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                      {info.title}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Map Placeholder */}
          <div className="bg-gray-200 dark:bg-gray-700 rounded-2xl h-96 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-green-500 opacity-20"></div>
            <div className="text-center z-10">
              <MapPin className="h-16 w-16 text-gray-500 dark:text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-300 text-lg font-medium">Interactive Map</p>
              <p className="text-gray-500 dark:text-gray-400">Location: New Administrative Capital</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;