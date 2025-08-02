import { PaginationResponse } from "@/types/api";
import { Property } from "../properties/property.service";

// The fetcher for SWR with optional token
export const fetcher = async (
  url: string,
  token?: string
): Promise<PaginationResponse<Property>> => {
  const headers: HeadersInit = token
    ? { Authorization: `Bearer ${token}` }
    : {};

  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error("Failed to fetch properties");
  return res.json();
};
