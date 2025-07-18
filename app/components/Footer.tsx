'use client';

import React from 'react';
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Footer: React.FC = () => {
  const { language, t } = useLanguage();

  const quickLinks = [
    { key: 'nav.home', href: '#home' },
    { key: 'nav.properties', href: '#properties' },
    { key: 'nav.services', href: '#services' },
    { key: 'nav.about', href: '#about' },
    { key: 'nav.news', href: '#news' },
    { key: 'nav.contact', href: '#contact' },
  ];

  const serviceLinks = [
    { key: 'services.registration' },
    { key: 'services.valuation' },
    { key: 'services.licensing' },
    { key: 'services.consultation' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-6">
              <div className="h-12 w-12 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">RE</span>
              </div>
              <div className={`${language === 'ar' ? 'mr-3' : 'ml-3'}`}>
                <h3 className="text-lg font-bold">
                  {language === 'ar' ? 'البوابة المصرية للعقارات' : 'Egyptian Real Estate'}
                </h3>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6">
              {t('footer.description')}
            </p>
            
            {/* Social Media */}
            <div className="flex space-x-4 rtl:space-x-reverse">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="bg-gray-800 hover:bg-blue-600 p-3 rounded-lg transition-colors duration-200"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">{t('footer.quick.links')}</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {t(link.key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold mb-6">{t('footer.services.links')}</h4>
            <ul className="space-y-3">
              {serviceLinks.map((service) => (
                <li key={service.key}>
                  <a
                    href="#services"
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {t(service.key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-lg font-bold mb-6">{t('footer.contact.info')}</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 rtl:space-x-reverse">
                <MapPin className="h-5 w-5 text-blue-400 mt-1 flex-shrink-0" />
                <span className="text-gray-300 text-sm">{t('contact.address')}</span>
              </div>
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <Phone className="h-5 w-5 text-green-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">{t('contact.phone')}</span>
              </div>
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <Mail className="h-5 w-5 text-purple-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">{t('contact.email')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="text-center text-gray-400">
            <p>{t('footer.rights')}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;