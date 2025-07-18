// app/property-details/[...slug]/page.tsx
// import PropertyDetailsClient from "../../../components/PropertyDetailsClient";

import PropertyDetailsClient from "@/app/components/PropertyDetailsClient";

export default function Page() {
  return <PropertyDetailsClient />;
}

export async function generateStaticParams() {
  return [{ slug: ["apartment-1"] }];
}
