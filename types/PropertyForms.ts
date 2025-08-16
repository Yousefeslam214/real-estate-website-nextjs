import { PropertyInput } from "@/schemas/property.schema";

export type PropertyFormProps = {
  mode: "create" | "update";
  defaultValues?: PropertyInput;
  onSubmit: (data: PropertyInput) => void;
};
export interface PropertyFormData {
  titleAr: string;
  titleEn: string;
  propertyTypeId: number;
  projectId: number;
  priceAmount: number;
  areaSqm: number;
  addressEn: string;
  addressAr: string;
  descriptionEn: string;
  descriptionAr: string;
  bedrooms: number;
  bathrooms: number;
  name: string;
  phone: string;
  email: string;
  listingType: string;
  status: "inactive";
  availableFrom: string;
  floor: number;
  totalFloors: number;
  features: number[];

}
