import { PaginationResponse } from "@/types/api";
import { Property } from "../properties/property.service";

// The fetcher for SWR
export const fetcher = async (
  url: string
): Promise<PaginationResponse<Property>> => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch properties");
  return res.json();
};
