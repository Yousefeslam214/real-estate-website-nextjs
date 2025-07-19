'use client';

import React, { useState } from 'react';
import { Search, MapPin, Bed, Bath, Square, Eye, Heart, Filter, Phone, Mail } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

const ApartmentPage: React.FC = () => {
  const { language, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [location, setLocation] = useState('');

  const priceRanges = [
    { value: '', label: language === 'ar' ? 'جميع الأسعار' : 'All Prices' },
    { value: '0-1000000', label: language === 'ar' ? 'أقل من مليون جنيه' : 'Under 1M EGP' },
    { value: '1000000-2000000', label: language === 'ar' ? '1-2 مليون جنيه' : '1-2M EGP' },
    { value: '2000000-3000000', label: language === 'ar' ? '2-3 مليون جنيه' : '2-3M EGP' },
    { value: '3000000-5000000', label: language === 'ar' ? '3-5 مليون جنيه' : '3-5M EGP' },
    { value: '5000000+', label: language === 'ar' ? 'أكثر من 5 مليون جنيه' : '5M+ EGP' },
  ];

  const bedroomOptions = [
    { value: '', label: language === 'ar' ? 'جميع الغرف' : 'All Bedrooms' },
    { value: '1', label: language === 'ar' ? 'غرفة واحدة' : '1 Bedroom' },
    { value: '2', label: language === 'ar' ? 'غرفتان' : '2 Bedrooms' },
    { value: '3', label: language === 'ar' ? '3 غرف' : '3 Bedrooms' },
    { value: '4', label: language === 'ar' ? '4 غرف' : '4 Bedrooms' },
    { value: '5+', label: language === 'ar' ? '5 غرف أو أكثر' : '5+ Bedrooms' },
  ];

  const locations = [
    { value: '', label: language === 'ar' ? 'جميع المواقع' : 'All Locations' },
    { value: 'cairo', label: language === 'ar' ? 'القاهرة' : 'Cairo' },
    { value: 'giza', label: language === 'ar' ? 'الجيزة' : 'Giza' },
    { value: 'alexandria', label: language === 'ar' ? 'الإسكندرية' : 'Alexandria' },
    { value: 'new-capital', label: language === 'ar' ? 'العاصمة الإدارية الجديدة' : 'New Administrative Capital' },
    { value: 'new-cairo', label: language === 'ar' ? 'القاهرة الجديدة' : 'New Cairo' },
    { value: 'sheikh-zayed', label: language === 'ar' ? 'الشيخ زايد' : 'Sheikh Zayed' },
  ];

  const apartments = [
    {
      id: 1,
      title: language === 'ar' ? 'شقة فاخرة في العاصمة الإدارية' : 'Luxury Apartment in New Capital',
      location: language === 'ar' ? 'العاصمة الإدارية الجديدة، R7' : 'New Administrative Capital, R7',
      price: 2500000,
      area: 150,
      bedrooms: 3,
      bathrooms: 2,
      floor: 5,
      totalFloors: 12,
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
      features: language === 'ar' ? ['مكيف', 'مطبخ مجهز', 'بلكونة', 'موقف سيارة', 'أمن 24/7'] : ['Air Conditioning', 'Fitted Kitchen', 'Balcony', 'Parking', '24/7 Security'],
      agent: {
        name: language === 'ar' ? 'أحمد محمد' : 'Ahmed Mohamed',
        phone: '+20 100 123 4567',
        email: 'ahmed@realestate.gov.eg'
      },
      description: language === 'ar' ? 'شقة فاخرة في موقع متميز بالعاصمة الإدارية الجديدة، تتميز بالتشطيب الراقي والإطلالة المميزة.' : 'Luxury apartment in a prime location in the New Administrative Capital, featuring high-end finishes and stunning views.'
    },
    {
      id: 2,
      title: language === 'ar' ? 'شقة عائلية في الشيخ زايد' : 'Family Apartment in Sheikh Zayed',
      location: language === 'ar' ? 'الشيخ زايد، الجيزة' : 'Sheikh Zayed, Giza',
      price: 3200000,
      area: 180,
      bedrooms: 4,
      bathrooms: 3,
      floor: 3,
      totalFloors: 8,
      image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg',
      features: language === 'ar' ? ['حديقة خاصة', 'مطبخ أمريكي', 'غرفة خادمة', 'تراس', 'جيم'] : ['Private Garden', 'American Kitchen', 'Maid Room', 'Terrace', 'Gym'],
      agent: {
        name: language === 'ar' ? 'فاطمة علي' : 'Fatma Ali',
        phone: '+20 101 234 5678',
        email: 'fatma@realestate.gov.eg'
      },
      description: language === 'ar' ? 'شقة عائلية واسعة في منطقة راقية بالشيخ زايد، مناسبة للعائلات الكبيرة.' : 'Spacious family apartment in an upscale area of Sheikh Zayed, suitable for large families.'
    },
    {
      id: 3,
      title: language === 'ar' ? 'شقة حديثة في القاهرة الجديدة' : 'Modern Apartment in New Cairo',
      location: language === 'ar' ? 'القاهرة الجديدة، التجمع الخامس' : 'New Cairo, Fifth Settlement',
      price: 2800000,
      area: 160,
      bedrooms: 3,
      bathrooms: 2,
      floor: 7,
      totalFloors: 15,
      image: 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg',
      features: language === 'ar' ? ['إطلالة على الحديقة', 'مطبخ مجهز', 'دريسنج روم', 'بلكونتان', 'مصعد'] : ['Garden View', 'Fitted Kitchen', 'Dressing Room', 'Two Balconies', 'Elevator'],
      agent: {
        name: language === 'ar' ? 'محمد حسن' : 'Mohamed Hassan',
        phone: '+20 102 345 6789',
        email: 'mohamed@realestate.gov.eg'
      },
      description: language === 'ar' ? 'شقة حديثة بتصميم عصري في قلب التجمع الخامس، قريبة من جميع الخدمات.' : 'Modern apartment with contemporary design in the heart of Fifth Settlement, close to all amenities.'
    },
    {
      id: 4,
      title: language === 'ar' ? 'شقة بإطلالة بحرية في الإسكندرية' : 'Sea View Apartment in Alexandria',
      location: language === 'ar' ? 'الإسكندرية، سيدي جابر' : 'Alexandria, Sidi Gaber',
      price: 3500000,
      area: 200,
      bedrooms: 4,
      bathrooms: 3,
      floor: 8,
      totalFloors: 10,
      image: 'https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg',
      features: language === 'ar' ? ['إطلالة بحرية', 'تراس كبير', 'مطبخ إيطالي', 'جاكوزي', 'موقف خاص'] : ['Sea View', 'Large Terrace', 'Italian Kitchen', 'Jacuzzi', 'Private Parking'],
      agent: {
        name: language === 'ar' ? 'سارة أحمد' : 'Sara Ahmed',
        phone: '+20 103 456 7890',
        email: 'sara@realestate.gov.eg'
      },
      description: language === 'ar' ? 'شقة فاخرة بإطلالة بحرية مباشرة في أرقى أحياء الإسكندرية.' : 'Luxury apartment with direct sea view in one of Alexandria\'s most prestigious neighborhoods.'
    },
    {
      id: 5,
      title: language === 'ar' ? 'شقة استثمارية في وسط البلد' : 'Investment Apartment Downtown',
      location: language === 'ar' ? 'وسط البلد، القاهرة' : 'Downtown, Cairo',
      price: 1800000,
      area: 120,
      bedrooms: 2,
      bathrooms: 2,
      floor: 4,
      totalFloors: 6,
      image: 'https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg',
      features: language === 'ar' ? ['موقع تجاري', 'مدخل منفصل', 'تشطيب كامل', 'قريب من المترو', 'عائد استثماري عالي'] : ['Commercial Location', 'Separate Entrance', 'Fully Finished', 'Near Metro', 'High ROI'],
      agent: {
        name: language === 'ar' ? 'خالد عبدالله' : 'Khaled Abdullah',
        phone: '+20 104 567 8901',
        email: 'khaled@realestate.gov.eg'
      },
      description: language === 'ar' ? 'شقة استثمارية في موقع استراتيجي بوسط البلد، مناسبة للاستثمار التجاري.' : 'Investment apartment in a strategic downtown location, suitable for commercial investment.'
    },
    {
      id: 6,
      title: language === 'ar' ? 'شقة دوبلكس في مدينة نصر' : 'Duplex Apartment in Nasr City',
      location: language === 'ar' ? 'مدينة نصر، القاهرة' : 'Nasr City, Cairo',
      price: 4200000,
      area: 250,
      bedrooms: 5,
      bathrooms: 4,
      floor: 9,
      totalFloors: 10,
      image: 'https://images.pexels.com/photos/1546168/pexels-photo-1546168.jpeg',
      features: language === 'ar' ? ['دوبلكس', 'روف خاص', 'مطبخان', 'غرفة معيشة كبيرة', 'مصعد خاص'] : ['Duplex', 'Private Roof', 'Two Kitchens', 'Large Living Room', 'Private Elevator'],
      agent: {
        name: language === 'ar' ? 'نورا سالم' : 'Nora Salem',
        phone: '+20 105 678 9012',
        email: 'nora@realestate.gov.eg'
      },
      description: language === 'ar' ? 'شقة دوبلكس فاخرة مع روف خاص في أرقى مناطق مدينة نصر.' : 'Luxury duplex apartment with private roof in one of Nasr City\'s most prestigious areas.'
    }
  ];

  const filteredApartments = apartments.filter(apartment => {
    const matchesSearch = apartment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         apartment.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBedrooms = bedrooms === '' || apartment.bedrooms.toString() === bedrooms || (bedrooms === '5+' && apartment.bedrooms >= 5);
    const matchesLocation = location === '' || apartment.location.toLowerCase().includes(location);
    
    let matchesPrice = true;
    if (priceRange) {
      const [min, max] = priceRange.split('-').map(p => p.replace('+', ''));
      if (max) {
        matchesPrice = apartment.price >= parseInt(min) && apartment.price <= parseInt(max);
      } else {
        matchesPrice = apartment.price >= parseInt(min);
      }
    }
    
    return matchesSearch && matchesBedrooms && matchesLocation && matchesPrice;
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(language === 'ar' ? 'ar-EG' : 'en-EG').format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Header />
      
      {/* Hero Section */}
      {/* Map Section */}
      <section className="bg-white dark:bg-gray-800 py-8 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {language === 'ar' ? 'شقق سكنية للبيع' : 'Residential Apartments for Sale'}
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              {language === 'ar' ? 'اكتشف أفضل الشقق السكنية المعتمدة حكومياً في جميع أنحاء مصر' : 'Discover the best government-certified residential apartments across Egypt'}
            </p>
          </div>
          
          {/* Interactive Map */}
          <div className="bg-gray-200 dark:bg-gray-700 rounded-2xl h-96 flex items-center justify-center relative overflow-hidden mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-green-500 opacity-20"></div>
            <div className="text-center z-10">
              <MapPin className="h-16 w-16 text-gray-500 dark:text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-300 text-lg font-medium">
                {language === 'ar' ? 'خريطة تفاعلية للعقارات' : 'Interactive Properties Map'}
              </p>
              <p className="text-gray-500 dark:text-gray-400">
                {language === 'ar' ? `عرض ${filteredApartments.length} عقار على الخريطة` : `Showing ${filteredApartments.length} properties on map`}
              </p>
            </div>
            
            {/* Mock map pins */}
            <div className="absolute top-20 left-20">
              <div className="bg-red-500 text-white p-2 rounded-full shadow-lg">
                <MapPin className="h-4 w-4" />
              </div>
            </div>
            <div className="absolute top-32 right-32">
              <div className="bg-red-500 text-white p-2 rounded-full shadow-lg">
                <MapPin className="h-4 w-4" />
              </div>
            </div>
            <div className="absolute bottom-24 left-1/3">
              <div className="bg-red-500 text-white p-2 rounded-full shadow-lg">
                <MapPin className="h-4 w-4" />
              </div>
            </div>
            <div className="absolute top-1/2 right-1/4">
              <div className="bg-red-500 text-white p-2 rounded-full shadow-lg">
                <MapPin className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white dark:bg-gray-800 shadow-sm transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Search Bar */}
            <div className="relative md:col-span-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === 'ar' ? 'البحث في الشقق...' : 'Search apartments...'}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-10 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-500" />
            </div>

            {/* Price Range Filter */}
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              {priceRanges.map((range) => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>

            {/* Bedrooms Filter */}
            <select
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
              className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              {bedroomOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {/* Location Filter */}
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              {locations.map((loc) => (
                <option key={loc.value} value={loc.value}>
                  {loc.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Results Count */}
      <section className="py-4 bg-gray-100 dark:bg-gray-800 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gray-600 dark:text-gray-300">
            {language === 'ar' ? `تم العثور على ${filteredApartments.length} شقة` : `Found ${filteredApartments.length} apartments`}
          </p>
        </div>
      </section>

      {/* Apartments Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredApartments.map((apartment) => (
              <div key={apartment.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={apartment.image}
                    alt={apartment.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {language === 'ar' ? 'للبيع' : 'For Sale'}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <button className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-200">
                      <Heart className="h-5 w-5 text-gray-600" />
                    </button>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-1 rounded-full text-sm font-bold">
                      {formatPrice(apartment.price)} {language === 'ar' ? 'ج.م' : 'EGP'}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                    {apartment.title}
                  </h3>
                  
                  <div className="flex items-center text-gray-600 dark:text-gray-400 mb-4">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span className="text-sm">{apartment.location}</span>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <Square className="h-5 w-5 mx-auto mb-1 text-gray-500 dark:text-gray-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">{apartment.area} {language === 'ar' ? 'م²' : 'm²'}</span>
                    </div>
                    <div className="text-center">
                      <Bed className="h-5 w-5 mx-auto mb-1 text-gray-500 dark:text-gray-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">{apartment.bedrooms} {language === 'ar' ? 'غرف' : 'beds'}</span>
                    </div>
                    <div className="text-center">
                      <Bath className="h-5 w-5 mx-auto mb-1 text-gray-500 dark:text-gray-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">{apartment.bathrooms} {language === 'ar' ? 'حمام' : 'baths'}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {language === 'ar' ? `الطابق ${apartment.floor} من ${apartment.totalFloors}` : `Floor ${apartment.floor} of ${apartment.totalFloors}`}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {apartment.features.slice(0, 3).map((feature, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        <p className="font-medium">{apartment.agent.name}</p>
                        <div className="flex items-center mt-1">
                          <Phone className="h-3 w-3 mr-1" />
                          <span className="text-xs">{apartment.agent.phone}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2 rtl:space-x-reverse">
                      <a
                        href={`/property-details/apartment-${apartment.id}`}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-green-600 text-white py-2 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-green-700 transition-all duration-300 flex items-center justify-center space-x-2 rtl:space-x-reverse text-sm"
                      >
                        <Eye className="h-4 w-4" />
                        <span>{language === 'ar' ? 'التفاصيل' : 'Details'}</span>
                      </a>
                      <button className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-lg transition-colors duration-200">
                        <Phone className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredApartments.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                {language === 'ar' ? 'لم يتم العثور على شقق تطابق معايير البحث' : 'No apartments found matching your search criteria'}
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ApartmentPage;