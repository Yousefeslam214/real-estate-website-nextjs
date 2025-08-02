import PropertyDetailsClient from "@/app/components/PropertyDetailsClient";
import { baseUrl } from "@/services/shared/apiUrl";
import { fetcher } from "@/services/shared/fetcher";
import useSWR from "swr";

// export const dynamic = "force-dynamic"; // Forces SSR on every request

export default async function Page({ params }: { params: { slug: string[] } }) {
  // const { data, error, isLoading } = useSWR(
  //   `${baseUrl}/properties/${params.slug[0]}`,
  //   fetcher
  // );
  const res = await fetch(`${baseUrl}/properties/${params.slug[0]}`, {
    next: { revalidate: 0 }, // or cache: "no-store" if needed
  });

  if (!res.ok) {
    throw new Error("Failed to fetch property data");
  }

  const data = await res.json();
  return (
    <PropertyDetailsClient idOfProperty={params.slug[0]} initialData={data} />
  );
}
