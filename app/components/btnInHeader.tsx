import { Globe, Menu, Moon, Sun, X } from "lucide-react";
import React, { useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";
import { useRouter } from "next/navigation";

const BtnInHeader = () => {
  const render = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  return (
    <div>
      {" "}
      <div className="flex items-center space-x-4 rtl:space-x-reverse">
        <button
          onClick={toggleTheme}
          className="flex items-center space-x-2 rtl:space-x-reverse bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 px-3 py-2 rounded-lg transition-colors duration-200">
          {theme === "light" ? (
            <Moon className="h-4 w-4 text-gray-600 dark:text-gray-300" />
          ) : (
            <Sun className="h-4 w-4 text-gray-600 dark:text-gray-300" />
          )}
        </button>

        <button
          onClick={toggleLanguage}
          className="flex items-center space-x-2 rtl:space-x-reverse bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 px-3 py-2 rounded-lg transition-colors duration-200">
          <Globe className="h-4 w-4 text-gray-600 dark:text-gray-300" />
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
            {language === "en" ? "العربية" : "English"}
          </span>
        </button>
        <button
          onClick={() => render.push("/signup")}
          className="flex items-center space-x-2 rtl:space-x-reverse bg-gradient-to-br from-blue-600 to-green-600 hover:bg-blue-600 dark:hover:bg-blue-800 px-3 py-2 rounded-lg transition-colors duration-200 shadow text-white">
          {/* <Globe className="h-4 w-4" /> */}
          <span className="text-sm font-medium">
            {language === "en" ? t("Sign Up") : t("إنشاء حساب")}
          </span>
        </button>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="bg-gray-100 dark:bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200">
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BtnInHeader;
