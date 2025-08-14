import { Suspense } from "react";
import NewsCard from "./NewsCard";
import TitleOfSection from "../TitleOfSection";
import NewsSkeleton from "./NewsSkeleton";

const News: React.FC = () => {
  return (
    <section
      id="news"
      className="py-20 bg-white dark:bg-gray-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TitleOfSection />
        <Suspense fallback={<NewsSkeleton length={3} />}>
          <NewsCard />
        </Suspense>
      </div>
    </section>
  );
};

export default News;
