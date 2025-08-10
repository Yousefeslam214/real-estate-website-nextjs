"use client";

import { useRouter } from "next/navigation";
// import PropertyForm from "@/components/PropertyForm";
// import { updateProperty } from "@/services/propertyService";
import { PropertyInput } from "@/schemas/property.schema";
import { updateProperty } from "@/services/properties/property.service";
import PropertyForm from "@/app/components/PropertyForm";
import useSWR from "swr";
import { fetcher } from "@/services/shared/fetcher";
import { baseUrl } from "@/services/shared/apiUrl";

export default function EditPropertyPage({ params }) {
  const router = useRouter();
  const propertyId = Number(params.id); // get ID from route

  console.log("Property ID:", propertyId);
  const { data, error, isLoading } = useSWR(
    `${baseUrl}/properties/${propertyId}`,
    fetcher
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading property.</div>;
  }

  //   const { project, error, isLoading } = useSWR(
  //     `${baseUrl}/properties/getAvailableProjects`,
  //     fetcher
  //   );
  //   const projects = project?.data || [];
  const propertyDefaultValues = data?.data || {};
  console.log("Fetched data:", propertyDefaultValues);
  const handleUpdate = async (data: PropertyInput) => {
    try {
      await updateProperty(propertyId, data);
      router.push("/dashboard/properties");
    } catch (error) {
      console.error("Failed to update property", error);
    }
  };

  return (
    <PropertyForm
      mode="update"
      defaultValues={propertyDefaultValues}
      onSubmit={handleUpdate}
    />
  );
}
