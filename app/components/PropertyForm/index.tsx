"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { propertySchema } from "./schema";
import type { PropertyInput, PropertyFormProps } from "./types";

export default function PropertyForm({ mode, defaultValues, onSubmit }: PropertyFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PropertyInput>({
    resolver: zodResolver(propertySchema),
    defaultValues: defaultValues || {},
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label>Title</label>
        <input {...register("title")} className="input" />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
      </div>

      <div>
        <label>Price</label>
        <input type="number" {...register("price")} className="input" />
        {errors.price && <p className="text-red-500">{errors.price.message}</p>}
      </div>

      {/* Add more fields like location, images, type, status, etc. */}

      <button type="submit" className="btn btn-primary">
        {mode === "create" ? "Create Property" : "Update Property"}
      </button>
    </form>
  );
}
