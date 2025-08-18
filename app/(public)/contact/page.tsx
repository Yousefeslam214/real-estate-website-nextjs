'use client';

import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const ContactPage: React.FC = () => {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    propertyType: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const contactInfo = [
    {
      icon: MapPin,
      title: language === 'ar' ? 'العنوان' : 'Address',
      content: language === 'ar' ? 'وزارة الإسكان، العاصمة الإدارية الجديدة، مصر' : 'Ministry of Housing, New Administrative Capital, Egypt',
      color: 'bg-blue-500'
    },
    {
      icon: Phone,
      title: language === 'ar' ? 'الهاتف' : 'Phone',
      content: '+20 2 1234 5678',
      color: 'bg-green-500'
    },
    {
      icon: Mail,
      title: language === 'ar' ? 'البريد الإلكتروني' : 'Email',
      content: 'info@realestate.gov.eg',
      color: 'bg-purple-500'
    },
    {
      icon: Clock,
      title: language === 'ar' ? 'ساعات العمل' : 'Working Hours',
      content: language === 'ar' ? 'الأحد - الخميس: 9:00 صباحاً - 5:00 مساءً' : 'Sunday - Thursday: 9:00 AM - 5:00 PM',
      color: 'bg-orange-500'
    }
  ];

  const departments = [
    {
      name: language === 'ar' ? 'قسم المبيعات' : 'Sales Department',
      phone: '+20 2 1234 5679',
      email: 'sales@realestate.gov.eg',
      description: language === 'ar' ? 'للاستفسار عن العقارات المتاحة والأسعار' : 'For inquiries about available properties and prices'
    },
    {
      name: language === 'ar' ? 'قسم خدمة العملاء' : 'Customer Service',
      phone: '+20 2 1234 5680',
      email: 'support@realestate.gov.eg',
      description: language === 'ar' ? 'للدعم الفني وحل المشاكل' : 'For technical support and problem solving'
    },
    {
      name: language === 'ar' ? 'القسم القانوني' : 'Legal Department',
      phone: '+20 2 1234 5681',
      email: 'legal@realestate.gov.eg',
      description: language === 'ar' ? 'للاستشارات القانونية والعقود' : 'For legal consultations and contracts'
    }
  ];

  const propertyTypes = [
    { value: '', label: language === 'ar' ? 'اختر نوع العقار' : 'Select Property Type' },
    { value: 'residential', label: language === 'ar' ? 'سكني' : 'Residential' },
    { value: 'commercial', label: language === 'ar' ? 'تجاري' : 'Commercial' },
    { value: 'industrial', label: language === 'ar' ? 'صناعي' : 'Industrial' },
    { value: 'land', label: language === 'ar' ? 'أرض' : 'Land' },
  ];

  const faqItems = [
    {
      question: language === 'ar' ? 'كيف يمكنني تسجيل عقار جديد؟' : 'How can I register a new property?',
      answer: language === 'ar' ? 'يمكنك تسجيل عقار جديد من خلال زيارة مكاتبنا أو استخدام المنصة الإلكترونية مع تقديم المستندات المطلوبة.' : 'You can register a new property by visiting our offices or using the electronic platform with the required documents.'
    },
    {
      question: language === 'ar' ? 'ما هي الرسوم المطلوبة للتسجيل؟' : 'What are the required registration fees?',
      answer: language === 'ar' ? 'تختلف الرسوم حسب نوع العقار وقيمته. يمكنك الاطلاع على جدول الرسوم المحدث على موقعنا الإلكتروني.' : 'Fees vary according to property type and value. You can check the updated fee schedule on our website.'
    },
    {
      question: language === 'ar' ? 'كم يستغرق إجراء التسجيل؟' : 'How long does the registration process take?',
      answer: language === 'ar' ? 'عادة ما يستغرق التسجيل من 7 إلى 14 يوم عمل حسب نوع العقار واكتمال المستندات.' : 'Registration usually takes 7 to 14 business days depending on property type and document completeness.'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        propertyType: '',
        message: ''
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* <Header /> */}
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 to-green-600 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            {language === 'ar' ? 'تواصل معنا' : 'Contact Us'}
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-blue-100 dark:text-blue-200">
            {language === 'ar' 
              ? 'نحن هنا لمساعدتك في جميع احتياجاتك العقارية. تواصل معنا اليوم'
              : 'We are here to help you with all your real estate needs. Contact us today'
            }
          </p>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="py-16 bg-white dark:bg-gray-800 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon;
              return (
                <div key={index} className="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className={`${info.color} w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{info.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{info.content}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form and Map */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                {language === 'ar' ? 'أرسل لنا رسالة' : 'Send us a Message'}
              </h2>
              
              {isSubmitted ? (
                <div className="text-center py-8">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-green-600 mb-2">
                    {language === 'ar' ? 'تم إرسال الرسالة بنجاح!' : 'Message Sent Successfully!'}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {language === 'ar' ? 'سنتواصل معك قريباً' : 'We will contact you soon'}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {language === 'ar' ? 'الاسم الكامل' : 'Full Name'}
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                        placeholder={language === 'ar' ? 'أدخل اسمك الكامل' : 'Enter your full name'}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {language === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                        placeholder={language === 'ar' ? 'أدخل بريدك الإلكتروني' : 'Enter your email address'}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {language === 'ar' ? 'رقم الهاتف' : 'Phone Number'}
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                        placeholder={language === 'ar' ? 'أدخل رقم هاتفك' : 'Enter your phone number'}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {language === 'ar' ? 'نوع العقار' : 'Property Type'}
                      </label>
                      <select
                        name="propertyType"
                        value={formData.propertyType}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      >
                        {propertyTypes.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {language === 'ar' ? 'الموضوع' : 'Subject'}
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                      placeholder={language === 'ar' ? 'أدخل موضوع الرسالة' : 'Enter message subject'}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {language === 'ar' ? 'الرسالة' : 'Message'}
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                      placeholder={language === 'ar' ? 'اكتب رسالتك هنا...' : 'Write your message here...'}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-green-700 transition-all duration-300 flex items-center justify-center space-x-2 rtl:space-x-reverse"
                  >
                    <Send className="h-5 w-5" />
                    <span>{language === 'ar' ? 'إرسال الرسالة' : 'Send Message'}</span>
                  </button>
                </form>
              )}
            </div>

            {/* Map */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                {language === 'ar' ? 'موقعنا' : 'Our Location'}
              </h2>
              <div className="bg-gray-200 dark:bg-gray-700 rounded-xl h-96 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-green-500 opacity-20"></div>
                <div className="text-center z-10">
                  <MapPin className="h-16 w-16 text-gray-500 dark:text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-300 text-lg font-medium">
                    {language === 'ar' ? 'خريطة تفاعلية' : 'Interactive Map'}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400">
                    {language === 'ar' ? 'العاصمة الإدارية الجديدة، مصر' : 'New Administrative Capital, Egypt'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="py-16 bg-white dark:bg-gray-800 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {language === 'ar' ? 'الأقسام المتخصصة' : 'Specialized Departments'}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {language === 'ar'
                ? 'تواصل مع القسم المناسب للحصول على المساعدة المتخصصة'
                : 'Contact the appropriate department for specialized assistance'
              }
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {departments.map((dept, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{dept.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">{dept.description}</p>
                <div className="space-y-2">
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <Phone className="h-4 w-4 mr-2" />
                    <span className="text-sm">{dept.phone}</span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <Mail className="h-4 w-4 mr-2" />
                    <span className="text-sm">{dept.email}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {language === 'ar' ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {language === 'ar'
                ? 'إجابات على الأسئلة الأكثر شيوعاً'
                : 'Answers to the most common questions'
              }
            </p>
          </div>
          <div className="space-y-6">
            {faqItems.map((item, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">{item.question}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default ContactPage;