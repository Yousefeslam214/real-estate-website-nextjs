import PropertyDetailsClient from "@/app/components/PropertyDetailsClient";

export const dynamic = "force-dynamic"; // Forces SSR on every request

export default async function Page({ params }: { params: { slug: string[] } }) {
  return <PropertyDetailsClient idOfProperty={params.slug[0]} />;
}
