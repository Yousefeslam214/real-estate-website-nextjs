"use client";

import React, { useState, useEffect } from "react";
import PropertyForm from "@/components/PropertyForm";
import { PropertyFormData } from "@/lib/types/PropertyFormData&Props";
import { fetcher } from "@/services/shared/fetcher";
import { baseUrl } from "@/services/shared/apiUrl";
import { ApiResponse } from "@/lib/types/api";
import { set } from "date-fns";

interface EditPropertyPageProps {
  params: { id: string }; // Next.js dynamic route [id]
}

const EditPropertyPage = ({ params }: EditPropertyPageProps) => {
  const propertyId = params.id;
  console.log("Property ID:", propertyId);

  const [formData, setFormData] = useState<PropertyFormData>({
    titleAr: "",
    titleEn: "",
    propertyTypeId: 1,
    projectId: 8,
    priceAmount: 0,
    areaSqm: 0,
    addressEn: "",
    addressAr: "",
    descriptionEn: "",
    descriptionAr: "",
    bedrooms: 0,
    bathrooms: 0,
    name: "",
    phone: "",
    email: "",
    listingType: "sale",
    status: "inactive",
    availableFrom: "2025-08-12",
    floor: 1,
    totalFloors: 5,
    features: [],
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Fetch existing property
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res: ApiResponse<any> = await fetcher(
          `${baseUrl}/properties/${propertyId}`
        );

        const data = res.data;
        console.log("Fetched property data type:", Array.isArray(data), data);

        console.log("Fetched property data:", data);
        const property =
          Array.isArray(data) ? data[0] : data;

        setFormData((prevFormData) => ({
          ...prevFormData,
          // projectId: 8,
          // propertyTypeId: 1,
          // projectId: property.project?.id || 0,
          // propertyTypeId: property.en?.property_type?.id || 0,
          priceAmount: Number(property?.price_amount),
          bedrooms: property?.bedrooms,
          bathrooms: property?.bathrooms,
          areaSqm: Number(property?.area_sqm),
          listingType: property?.en?.listing_type,
          status: property?.en?.status,
          availableFrom: property?.available_from?.split("T")[0] || "",
          titleEn: property?.additional_information?.en?.title,
          titleAr: property?.additional_information?.ar?.title,
          descriptionEn: property?.additional_information?.en?.description,
          descriptionAr: property?.additional_information?.ar?.description,
          addressEn: property?.additional_information?.en?.address,
          addressAr: property?.additional_information?.ar?.address,
          features:
            property?.en?.features?.map((f: string, index: number) => index + 1) ||
            [], // map to feature IDs if needed
          name: property?.contact?.name,
          email: property?.contact?.email,
          phone: property?.contact?.phone,
          floor: property?.floor,
          totalFloors: property?.total_floors,
        }));
      } catch (err) {
        console.error("Failed to fetch property", err);
      }
    };

    fetchProperty();
  }, [propertyId]);

  // Handle submit
  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("Submitting form data:", formData);
      const res = await fetch(`${baseUrl}/properties/${propertyId}/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      console.log("Update result:", result);
    } catch (err) {
      console.error("Failed to update property", err);
    }
  };

  return (
    <div>
      <PropertyForm
        formData={formData}
        setFormData={setFormData}
        errors={errors}
        setErrors={setErrors}
      />
      <button
        onClick={handleSubmit}
        className="mt-4 p-3 bg-blue-600 text-white rounded-lg">
        Update Property
      </button>
    </div>
  );
};

export default EditPropertyPage;
