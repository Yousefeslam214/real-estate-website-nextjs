import PropertyDetailsClient from "@/app/components/PropertiesComponents/PropertyDetailsClient";
import { baseUrl } from "@/services/shared/apiUrl";

export default async function Page({ params }: { params: { slug: string[] } }) {
  const res = await fetch(`${baseUrl}/properties/${params.slug[0]}`, {
    next: { revalidate: 0 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch properties data");
  }

  const data = await res.json();
  return <PropertyDetailsClient id={params.slug[0]} initialData={data} />;
}
