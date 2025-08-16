import { ApiResponse } from "@/types/api";
import { baseUrl } from "../shared/apiUrl";
import { PropertyInput, PropertyUpdateInput } from "@/schemas/property.schema";

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
): Promise<ApiResponse<Property>> => {
  const params = new URLSearchParams();
  if (page !== undefined) params.append("page", page.toString());
  if (limit !== undefined) params.append("limit", limit.toString());

  const url = `${baseUrl}/properties${
    params.toString() ? "?" + params.toString() : ""
  }`;
  const res = await fetch(url);

  if (!res.ok) throw new Error("Failed to fetch properties");

  const data: ApiResponse<Property> = await res.json();
  return data;
};

export async function updateProperty(id: number, data: PropertyUpdateInput) {
  try {
    const res = await fetch(`${baseUrl}/api/properties/${id}/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error(`Failed to update property. Status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error updating property:", error);
    throw error;
  }
}

export async function createProperty(data: Record<string, any>) {
  try {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    const res = await fetch(`${baseUrl}/properties/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error(`${res.status}`);
      // return await { status: res.status, body: await res.json() };
    }
    return await { status: res.status, body: await res.json() };

  } catch (error) {
    console.error("Error creating property:", error);
    throw error;
  }
}
