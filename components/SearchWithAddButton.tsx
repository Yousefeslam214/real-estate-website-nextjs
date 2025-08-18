import React from "react";
import { Search, Plus } from "lucide-react";

interface SearchWithAddButtonProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  language: string;
  activeTab: string;
  onAddClick?: () => void;
}

const SearchWithAddButton: React.FC<SearchWithAddButtonProps> = ({
  searchQuery,
  setSearchQuery,
  language,
  activeTab,
  onAddClick,
}) => {
  return (
    <div className="flex items-end space-x-4 rtl:space-x-reverse">
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={language === "ar" ? "البحث..." : "Search..."}
          className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                     focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                     bg-white dark:bg-gray-700 text-gray-900 dark:text-white 
                     placeholder-gray-500 dark:placeholder-gray-400"
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
      </div>

      {(activeTab === "properties" || activeTab === "posts") && (
        <button
          onClick={onAddClick}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg 
                     hover:bg-blue-700 transition-colors duration-200 
                     flex items-center space-x-2 rtl:space-x-reverse">
          <Plus className="h-5 w-5" />
          <span>
            {activeTab === "properties"
              ? language === "ar"
                ? "إضافة عقار"
                : "Add Property"
              : language === "ar"
              ? "إضافة مقال"
              : "Add Post"}
          </span>
        </button>
      )}
    </div>
  );
};

export default SearchWithAddButton;
