import { PropertyInput } from "@/schemas/property.schema";

export type PropertyFormProps = {
  mode: "create" | "update";
  defaultValues?: PropertyInput;
  onSubmit: (data: PropertyInput) => void;
};
