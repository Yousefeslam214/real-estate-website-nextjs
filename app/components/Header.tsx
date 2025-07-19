'use client';

import React, { useState } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();

  const navigationItems = [
    { key: 'nav.home', href: '#home' },
    { key: 'nav.properties', href: '#properties' },
    { key: 'nav.buy', href: '/buy/residential/apartment' },
    { key: 'nav.services', href: '#services' },
    { key: 'nav.about', href: '#about' },
    { key: 'nav.blog', href: '/blog' },
    { key: 'nav.news', href: '#news' },
    { key: 'nav.contact', href: '#contact' },
  ];

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">RE</span>
              </div>
            </div>
            <div className={`${language === 'ar' ? 'mr-3' : 'ml-3'} hidden sm:block`}>
              <h1 className="text-lg font-bold text-gray-900">
                {language === 'ar' ? 'البوابة المصرية للعقارات' : 'Egyptian Real Estate'}
              </h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 rtl:space-x-reverse">
            {navigationItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                {t(item.key)}
              </a>
            ))}
          </nav>

          {/* Language Toggle and Mobile Menu */}
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-2 rtl:space-x-reverse bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg transition-colors duration-200"
            >
              <Globe className="h-4 w-4" />
              <span className="text-sm font-medium">{language === 'en' ? 'العربية' : 'English'}</span>
            </button>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="bg-gray-100 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-200 transition-colors duration-200"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50 rounded-lg mt-2">
              {navigationItems.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  className="text-gray-700 hover:text-blue-600 block px-3 py-2 text-base font-medium transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t(item.key)}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;