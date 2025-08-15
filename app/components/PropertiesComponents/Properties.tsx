import React from "react";
import PropertiesCard from "./PropertiesCard";
import PropertiesSkeleton from "./PropertiesSkeleton";

const Properties: React.FC = () => {
  return (
    <section
      id="properties"
      className="pt-20  mt-10 pb-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className=" pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* <Suspense fallback={<PropertiesSkeleton length={6} />}> */}
        <PropertiesCard />
        {/* </Suspense> */}
      </div>
    </section>
  );
};

export default Properties;
