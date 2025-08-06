import { PropertyInput } from "./schema";

export type PropertyFormProps = {
  mode: "create" | "update";
  defaultValues?: PropertyInput;
  onSubmit: (data: PropertyInput) => void;
};
