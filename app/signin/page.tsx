"use client";

import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "../contexts/LanguageContext";
import { login } from "@/services/auth/auth.service";
import { LoginInput } from "@/schemas/login.schema";
import { useRouter } from "next/navigation";
import { useToast } from "../contexts/ToastContext";

const SignInPage: React.FC = () => {
  const { language } = useLanguage();
  const router = useRouter();
  const { showToast } = useToast();

  const [formData, setFormData] = useState<LoginInput>({
    email: process.env.NEXT_PUBLIC_DEFAULT_EMAIL || "",
    password: process.env.NEXT_PUBLIC_DEFAULT_PASSWORD || "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data:", formData);
    try {
      const data = await login(formData);
      console.log("Login response:", data);
      if (data.token) {
        localStorage.setItem("token", data.token);
        setIsSubmitted(true);
        router.push("/");
        return;
      }
    } catch (err) {
      console.error("Login error:", err);
      showToast("Something went wrong!", "error");
    }
    setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 to-green-600 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            {language === "ar" ? "تسجيل الدخول" : "Sign In"}
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-blue-100 dark:text-blue-200">
            {language === "ar"
              ? "سجل الدخول إلى حسابك للوصول إلى جميع الميزات"
              : "Sign in to your account to access all features"}
          </p>
        </div>
      </section>

      {/* Sign In Form */}
      <section className="py-16 bg-white dark:bg-gray-800 transition-colors duration-200">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="h-8 w-8 text-green-600 dark:text-green-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-green-600 dark:text-green-400 mb-2">
                  {language === "ar"
                    ? "تم تسجيل الدخول بنجاح!"
                    : "Signed in successfully!"}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {language === "ar"
                    ? "يتم تحويلك الآن..."
                    : "Redirecting you now..."}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
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
                      defaultValue="fouadkhalid@gmail.com"
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
                      defaultValue="12345"
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

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      {language === "ar" ? "تذكرني" : "Remember me"}
                    </label>
                  </div>

                  <div className="text-sm">
                    <Link
                      href="/forgot-password"
                      className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
                      {language === "ar"
                        ? "نسيت كلمة المرور؟"
                        : "Forgot password?"}
                    </Link>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-green-700 transition-all duration-300 flex items-center justify-center space-x-2 rtl:space-x-reverse">
                  <span>{language === "ar" ? "تسجيل الدخول" : "Sign In"}</span>
                </button>

                <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                  {language === "ar"
                    ? "ليس لديك حساب؟"
                    : "Don't have an account?"}{" "}
                  <Link
                    href="/signup"
                    className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
                    {language === "ar" ? "سجل الآن" : "Sign up now"}
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

export default SignInPage;
