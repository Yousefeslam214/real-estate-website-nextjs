'use client';

import React, { useState } from 'react';
import { Plus, Edit, Trash2, Eye, Search, Filter, BarChart3, Users, Home, FileText, Settings, LogOut } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const DashboardPage: React.FC = () => {
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = useState('properties');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for properties
  const properties = [
    {
      id: 'E101847',
      title: language === 'ar' ? 'شقة فاخرة في العلمين' : 'Luxury Apartment in Alamain',
      location: language === 'ar' ? 'العلمين، الساحل الشمالي' : 'Alamain, North Coast',
      price: 4500000,
      status: language === 'ar' ? 'متاح' : 'Available',
      views: 1250,
      createdAt: '2025-01-10',
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg'
    },
    {
      id: 'E101848',
      title: language === 'ar' ? 'فيلا في الشيخ زايد' : 'Villa in Sheikh Zayed',
      location: language === 'ar' ? 'الشيخ زايد، الجيزة' : 'Sheikh Zayed, Giza',
      price: 6200000,
      status: language === 'ar' ? 'محجوز' : 'Reserved',
      views: 890,
      createdAt: '2025-01-08',
      image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg'
    },
    {
      id: 'E101849',
      title: language === 'ar' ? 'شقة في العاصمة الإدارية' : 'Apartment in New Capital',
      location: language === 'ar' ? 'العاصمة الإدارية الجديدة' : 'New Administrative Capital',
      price: 3800000,
      status: language === 'ar' ? 'متاح' : 'Available',
      views: 2100,
      createdAt: '2025-01-05',
      image: 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg'
    }
  ];

  // Mock data for blog posts
  const blogPosts = [
    {
      id: 1,
      title: language === 'ar' ? 'إطلاق مشروع العاصمة الإدارية المرحلة الثالثة' : 'Launch of New Administrative Capital Phase 3',
      author: language === 'ar' ? 'وزارة الإسكان' : 'Ministry of Housing',
      status: language === 'ar' ? 'منشور' : 'Published',
      views: 5420,
      createdAt: '2025-01-15',
      category: language === 'ar' ? 'أخبار' : 'News'
    },
    {
      id: 2,
      title: language === 'ar' ? 'تحديث قوانين التملك للأجانب' : 'Updated Foreign Ownership Laws',
      author: language === 'ar' ? 'وزارة العدل' : 'Ministry of Justice',
      status: language === 'ar' ? 'مسودة' : 'Draft',
      views: 0,
      createdAt: '2025-01-12',
      category: language === 'ar' ? 'قوانين' : 'Regulations'
    }
  ];

  const sidebarItems = [
    { id: 'overview', label: language === 'ar' ? 'نظرة عامة' : 'Overview', icon: BarChart3 },
    { id: 'properties', label: language === 'ar' ? 'العقارات' : 'Properties', icon: Home },
    { id: 'posts', label: language === 'ar' ? 'المقالات' : 'Blog Posts', icon: FileText },
    { id: 'users', label: language === 'ar' ? 'المستخدمون' : 'Users', icon: Users },
    { id: 'settings', label: language === 'ar' ? 'الإعدادات' : 'Settings', icon: Settings },
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(language === 'ar' ? 'ar-EG' : 'en-EG').format(price);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-EG');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6">
          <div className="flex items-center">
            <div className="h-10 w-10 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">RE</span>
            </div>
            <div className={`${language === 'ar' ? 'mr-3' : 'ml-3'}`}>
              <h1 className="text-lg font-bold text-gray-900">
                {language === 'ar' ? 'لوحة التحكم' : 'Dashboard'}
              </h1>
            </div>
          </div>
        </div>

        <nav className="mt-6">
          {sidebarItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center px-6 py-3 text-left transition-colors duration-200 ${
                  activeTab === item.id
                    ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <IconComponent className="h-5 w-5 mr-3" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-0 w-64 p-6">
          <button className="flex items-center text-gray-600 hover:text-red-600 transition-colors duration-200">
            <LogOut className="h-5 w-5 mr-3" />
            <span>{language === 'ar' ? 'تسجيل الخروج' : 'Logout'}</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                {activeTab === 'overview' && (language === 'ar' ? 'نظرة عامة' : 'Overview')}
                {activeTab === 'properties' && (language === 'ar' ? 'إدارة العقارات' : 'Manage Properties')}
                {activeTab === 'posts' && (language === 'ar' ? 'إدارة المقالات' : 'Manage Blog Posts')}
                {activeTab === 'users' && (language === 'ar' ? 'إدارة المستخدمين' : 'Manage Users')}
                {activeTab === 'settings' && (language === 'ar' ? 'الإعدادات' : 'Settings')}
              </h2>
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={language === 'ar' ? 'البحث...' : 'Search...'}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
                {(activeTab === 'properties' || activeTab === 'posts') && (
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2 rtl:space-x-reverse">
                    <Plus className="h-5 w-5" />
                    <span>
                      {activeTab === 'properties' 
                        ? (language === 'ar' ? 'إضافة عقار' : 'Add Property')
                        : (language === 'ar' ? 'إضافة مقال' : 'Add Post')
                      }
                    </span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="p-6 overflow-y-auto h-full">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">{language === 'ar' ? 'إجمالي العقارات' : 'Total Properties'}</p>
                      <p className="text-3xl font-bold text-gray-900">1,247</p>
                    </div>
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <Home className="h-8 w-8 text-blue-600" />
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">{language === 'ar' ? 'المقالات المنشورة' : 'Published Posts'}</p>
                      <p className="text-3xl font-bold text-gray-900">89</p>
                    </div>
                    <div className="bg-green-100 p-3 rounded-lg">
                      <FileText className="h-8 w-8 text-green-600" />
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">{language === 'ar' ? 'المستخدمون النشطون' : 'Active Users'}</p>
                      <p className="text-3xl font-bold text-gray-900">15,432</p>
                    </div>
                    <div className="bg-purple-100 p-3 rounded-lg">
                      <Users className="h-8 w-8 text-purple-600" />
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">{language === 'ar' ? 'المشاهدات الشهرية' : 'Monthly Views'}</p>
                      <p className="text-3xl font-bold text-gray-900">234K</p>
                    </div>
                    <div className="bg-orange-100 p-3 rounded-lg">
                      <BarChart3 className="h-8 w-8 text-orange-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  {language === 'ar' ? 'النشاط الأخير' : 'Recent Activity'}
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <Home className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {language === 'ar' ? 'تم إضافة عقار جديد' : 'New property added'}
                      </p>
                      <p className="text-sm text-gray-600">
                        {language === 'ar' ? 'منذ ساعتين' : '2 hours ago'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <FileText className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {language === 'ar' ? 'تم نشر مقال جديد' : 'New blog post published'}
                      </p>
                      <p className="text-sm text-gray-600">
                        {language === 'ar' ? 'منذ 4 ساعات' : '4 hours ago'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Properties Tab */}
          {activeTab === 'properties' && (
            <div className="bg-white rounded-xl shadow-lg">
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-900">
                    {language === 'ar' ? 'قائمة العقارات' : 'Properties List'}
                  </h3>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                      <Filter className="h-5 w-5 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {language === 'ar' ? 'العقار' : 'Property'}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {language === 'ar' ? 'السعر' : 'Price'}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {language === 'ar' ? 'الحالة' : 'Status'}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {language === 'ar' ? 'المشاهدات' : 'Views'}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {language === 'ar' ? 'الإجراءات' : 'Actions'}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {properties.map((property) => (
                      <tr key={property.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <img
                              src={property.image}
                              alt={property.title}
                              className="h-12 w-12 rounded-lg object-cover"
                            />
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{property.title}</div>
                              <div className="text-sm text-gray-500">{property.location}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {formatPrice(property.price)} {language === 'ar' ? 'ج.م' : 'EGP'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            property.status === 'Available' || property.status === 'متاح'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {property.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {property.views.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <button className="text-blue-600 hover:text-blue-900">
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className="text-green-600 hover:text-green-900">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button className="text-red-600 hover:text-red-900">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Blog Posts Tab */}
          {activeTab === 'posts' && (
            <div className="bg-white rounded-xl shadow-lg">
              <div className="p-6 border-b">
                <h3 className="text-lg font-bold text-gray-900">
                  {language === 'ar' ? 'قائمة المقالات' : 'Blog Posts List'}
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {language === 'ar' ? 'العنوان' : 'Title'}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {language === 'ar' ? 'الكاتب' : 'Author'}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {language === 'ar' ? 'الحالة' : 'Status'}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {language === 'ar' ? 'المشاهدات' : 'Views'}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {language === 'ar' ? 'الإجراءات' : 'Actions'}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {blogPosts.map((post) => (
                      <tr key={post.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">{post.title}</div>
                          <div className="text-sm text-gray-500">{post.category}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {post.author}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            post.status === 'Published' || post.status === 'منشور'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {post.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {post.views.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <button className="text-blue-600 hover:text-blue-900">
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className="text-green-600 hover:text-green-900">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button className="text-red-600 hover:text-red-900">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                {language === 'ar' ? 'إدارة المستخدمين' : 'User Management'}
              </h3>
              <p className="text-gray-600">
                {language === 'ar' ? 'قريباً - إدارة المستخدمين والصلاحيات' : 'Coming Soon - User management and permissions'}
              </p>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                {language === 'ar' ? 'إعدادات النظام' : 'System Settings'}
              </h3>
              <p className="text-gray-600">
                {language === 'ar' ? 'قريباً - إعدادات النظام والتكوين' : 'Coming Soon - System settings and configuration'}
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;