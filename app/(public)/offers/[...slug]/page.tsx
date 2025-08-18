// import PropertyDetailsClient from "@/components/PropertiesComponents/PropertyDetailsClient";
import PropertyDetailsPage from "@/components/PropertiesComponents/PropertyDetailsClient";
import { baseUrl } from "@/services/shared/apiUrl";

export default async function Page({ params }: { params: { slug: string[] } }) {
  const res = await fetch(`${baseUrl}/properties/${params.slug[0]}`, {
    // next: { revalidate: 0 },
  });
console.log("Fetching property data for ID:", params.slug[0]);
console.log("Response OK:", res.ok);
  if (!res.ok) {
    throw new Error("Failed to fetch properties data");
  }

  const data = await res.json();
  console.log("Fetched property data:", data);
  return <PropertyDetailsPage id={params.slug[0]} initialData={data} />;
}
