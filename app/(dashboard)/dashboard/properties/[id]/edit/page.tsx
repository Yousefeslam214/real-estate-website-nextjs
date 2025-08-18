import UpdatePropertyForm from "@/components/PropertiesComponents/EditPropertyForm";

interface EditPropertyPageProps {
  params: {
    id: string;
  };
}

export default function EditPropertyPage({ params }: EditPropertyPageProps) {
  return <UpdatePropertyForm params={params} />;
}
