import HeroSection from '@/components/HeroSection'
import CreateProperty from '@/components/PropertiesComponents/CreateProperty'
import React from 'react'

const createPropertyFromDashboard = () => {
  return (
    <div>
      <HeroSection
        headTxt={["Create Property"]}
        arHeadTxt={["إنشاء عقار"]}
        subTxt={["Fill in the details to create a new property listing"]}
        arSubTxt={["املأ التفاصيل لإنشاء قائمة عقارية جديدة"]}
      />
      <CreateProperty />
    </div>
  )
}

export default createPropertyFromDashboard