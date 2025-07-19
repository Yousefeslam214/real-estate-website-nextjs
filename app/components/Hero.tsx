'use client';

import React, { useState } from 'react';
import { Search, MapPin, Home, Building, Factory, Mountain } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Hero: React.FC = () => {
  const { language, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [location, setLocation] = useState('');

  const propertyTypes = [
    { value: '', label: t('search.all.types'), icon: Home },
    { value: 'residential', label: t('search.residential'), icon: Home },
    { value: 'commercial', label: t('search.commercial'), icon: Building },
    { value: 'industrial', label: t('search.industrial'), icon: Factory },
    { value: 'land', label: t('search.land'), icon: Mountain },
  ];

  const locations = [
    { value: '', label: t('search.location') },
    { value: 'cairo', label: language === 'ar' ? 'القاهرة' : 'Cairo' },
    { value: 'giza', label: language === 'ar' ? 'الجيزة' : 'Giza' },
    { value: 'alexandria', label: language === 'ar' ? 'الإسكندرية' : 'Alexandria' },
    { value: 'new-capital', label: language === 'ar' ? 'العاصمة الإدارية الجديدة' : 'New Administrative Capital' },
  ];

  return (
    <section id="home" className="relative bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-[80vh] flex items-center transition-colors duration-200">
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg')] bg-cover bg-center opacity-10"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            {t('hero.title')}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
            {t('hero.subtitle')}
          </p>

          {/* Search Form */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              {/* Property Type */}
              <div className="relative">
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  {propertyTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Location */}
              <div className="relative">
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  {locations.map((loc) => (
                    <option key={loc.value} value={loc.value}>
                      {loc.label}
                    </option>
                  ))}
                </select>
                <MapPin className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
              </div>

              {/* Price Range */}
              <div className="relative">
                <input
                  type="text"
                  placeholder={t('search.price.range')}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>

              {/* Area */}
              <div className="relative">
                <input
                  type="text"
                  placeholder={t('search.area')}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative mb-6">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('hero.search.placeholder')}
                className="w-full p-4 text-lg border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-12 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
              <Search className="absolute left-4 top-4 h-6 w-6 text-gray-400 dark:text-gray-500" />
            </div>

            {/* Search Button */}
            <button className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-green-600 text-white px-12 py-4 rounded-lg text-lg font-semibold hover:from-blue-700 hover:to-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
              {t('hero.search.button')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;