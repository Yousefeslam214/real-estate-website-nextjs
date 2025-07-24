import { PaginationResponse } from "@/types/api";
import { baseUrl } from "../shared/apiUrl";

export interface Property {
  id: string;
  mlsId: string;
  projectId: string;
  propertyTypeId: string;
  building: string | null;
  floor: number;
  unit: string;
  priceAmount: number;
  priceCurrency: string;
  bedrooms: number;
  bathrooms: number;
  areaSqm: number;
  yearBuilt: number;
  description: string;
  listingType: string;
  imagesCount: number;
  listedBy: string;
  approved: boolean;
  createdAt: string;
  updatedAt: string;
}

export const fetchProperties = async (
  page?: number,
  limit?: number
): Promise<PaginationResponse<Property>> => {
  const params = new URLSearchParams();
  if (page !== undefined) params.append("page", page.toString());
  if (limit !== undefined) params.append("limit", limit.toString());

  const url = `${baseUrl}/properties${
    params.toString() ? "?" + params.toString() : ""
  }`;
  const res = await fetch(url);

  if (!res.ok) throw new Error("Failed to fetch properties");

  const data: PaginationResponse<Property> = await res.json();
  return data;
};
