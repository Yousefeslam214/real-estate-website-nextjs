import { ApiResponse, DashboardOverviewResponse } from "@/lib/types/api";

// The fetcher for SWR with optional token
export const fetcher = async (
  url: string,
  token?: string
): Promise<ApiResponse<any>> => {
  const headers: HeadersInit = token
    ? { Authorization: `Bearer ${token}` }
    : {};

  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error("Failed to fetch properties");
  return res.json();
};

export const fetcherDash = async (
  url: string,
  token?: string
): Promise<DashboardOverviewResponse> => {
  const headers: HeadersInit = token
    ? { Authorization: `Bearer ${token}` }
    : {};

  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error("Failed to fetch properties");
  return res.json();
};
