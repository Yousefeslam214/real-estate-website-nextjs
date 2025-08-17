"use client";

import React, { useState } from "react";
import { Mail, Lock, User, Eye, EyeOff, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "../contexts/LanguageContext";
import { SignUpInput } from "@/schemas/login.schema";
import { signUpUser } from "@/services/auth/auth.service";
import { useRouter } from "next/navigation";

const SignUpPage: React.FC = () => {
  const { language } = useLanguage();
  const [formData, setFormData] = useState<SignUpInput>({
    username: "",
    email: "",
    password: "",
  });
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sign up form data:", formData);
    try {
      const data = await signUpUser(formData);
      console.log("Sign up response:", data);
      if (data?.result?.token) {
        localStorage.setItem("token", data.result.token);
        setIsSubmitted(true);
        router.push("/");
        router.refresh();
        return;
      }
    } catch (err) {
      console.error("Sign up error:", err);

      // If you have a toast function, use it here, e.g. showToast("Something went wrong!", "error");
    }
    setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 to-green-600 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            {language === "ar" ? "إنشاء حساب جديد" : "Create an Account"}
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-blue-100 dark:text-blue-200">
            {language === "ar"
              ? "انضم إلينا واحصل على تجربة عقارية مميزة"
              : "Join us and get an exceptional real estate experience"}
          </p>
        </div>
      </section>

      {/* Sign Up Form */}
      <section className="py-16 bg-white dark:bg-gray-800 transition-colors duration-200">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            {isSubmitted ? (
              <div className="text-center py-8">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-green-600 dark:text-green-400 mb-2">
                  {language === "ar"
                    ? "تم إنشاء الحساب بنجاح!"
                    : "Account created successfully!"}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {language === "ar"
                    ? "يتم تحويلك الآن إلى صفحة تسجيل الدخول..."
                    : "Redirecting you to login page..."}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {language === "ar" ? "الاسم الكامل" : "Full Name"}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                      placeholder={
                        language === "ar"
                          ? "أدخل اسمك الكامل"
                          : "Enter your full name"
                      }
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {language === "ar" ? "البريد الإلكتروني" : "Email Address"}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                      placeholder={
                        language === "ar"
                          ? "أدخل بريدك الإلكتروني"
                          : "Enter your email"
                      }
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {language === "ar" ? "كلمة المرور" : "Password"}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                      placeholder={
                        language === "ar"
                          ? "أدخل كلمة المرور"
                          : "Enter your password"
                      }
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>

                {/* <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {language === "ar"
                      ? "تأكيد كلمة المرور"
                      : "Confirm Password"}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      // value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                      placeholder={
                        language === "ar"
                          ? "أعد إدخال كلمة المرور"
                          : "Re-enter your password"
                      }
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }>
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div> */}

                <div className="flex items-center">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    required
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="terms"
                    className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    {language === "ar"
                      ? "أوافق على الشروط والأحكام وسياسة الخصوصية"
                      : "I agree to the terms and conditions and privacy policy"}
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-green-700 transition-all duration-300 flex items-center justify-center space-x-2 rtl:space-x-reverse">
                  <span>
                    {language === "ar" ? "إنشاء حساب" : "Create Account"}
                  </span>
                </button>

                <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                  {language === "ar"
                    ? "لديك حساب بالفعل؟"
                    : "Already have an account?"}{" "}
                  <Link
                    href="/signin"
                    className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
                    {language === "ar" ? "سجل الدخول" : "Sign in"}
                  </Link>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignUpPage;
