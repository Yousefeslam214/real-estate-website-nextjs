"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PropertyInput, propertySchema } from "@/app/components/PropertyForm/schema";
import { PropertyFormProps } from "@/app/components/PropertyForm/types";
// import { propertySchema, PropertyInput } from "./schema";
// import { PropertyFormProps } from "./types";

export default function PropertyForm({
  mode,
  defaultValues,
  onSubmit,
}: PropertyFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PropertyInput>({
    resolver: zodResolver(propertySchema),
    defaultValues,
  });

  const labelStyle =
    "block mb-1 font-semibold text-gray-800 dark:text-gray-100";
  const inputStyle =
    "w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-900 shadow rounded">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        {mode === "create" ? "Create Property" : "Update Property"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={labelStyle}>Project ID</label>
          <input
            type="number"
            {...register("projectId")}
            className={inputStyle}
          />
          {errors.projectId && (
            <span className="text-red-500">{errors.projectId.message}</span>
          )}
        </div>

        <div>
          <label className={labelStyle}>Property Type ID</label>
          <input
            type="number"
            {...register("propertyTypeId")}
            className={inputStyle}
          />
          {errors.propertyTypeId && (
            <span className="text-red-500">
              {errors.propertyTypeId.message}
            </span>
          )}
        </div>

        <div>
          <label className={labelStyle}>Price</label>
          <input
            type="number"
            {...register("priceAmount")}
            className={inputStyle}
          />
        </div>

        <div>
          <label className={labelStyle}>Bedrooms</label>
          <input
            type="number"
            {...register("bedrooms")}
            className={inputStyle}
          />
        </div>

        <div>
          <label className={labelStyle}>Bathrooms</label>
          <input
            type="number"
            {...register("bathrooms")}
            className={inputStyle}
          />
        </div>

        <div>
          <label className={labelStyle}>Area (sqm)</label>
          <input
            type="number"
            {...register("areaSqm")}
            className={inputStyle}
          />
        </div>

        <div>
          <label className={labelStyle}>Listing Type</label>
          <select {...register("listingType")} className={inputStyle}>
            <option value="rent">Rent</option>
            <option value="sale">Sale</option>
          </select>
        </div>

        <div>
          <label className={labelStyle}>Status</label>
          <select {...register("status")} className={inputStyle}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div>
          <label className={labelStyle}>Available From</label>
          <input
            type="date"
            {...register("available_from")}
            className={inputStyle}
          />
        </div>

        <div>
          <label className={labelStyle}>Features (comma separated)</label>
          <input
            type="text"
            {...register("features", {
              setValueAs: (val) =>
                val.split(",").map((v: string) => parseInt(v.trim())),
            })}
            className={inputStyle}
            placeholder="e.g. 1,2,3"
          />
        </div>

        <div>
          <label className={labelStyle}>Your Name</label>
          <input type="text" {...register("name")} className={inputStyle} />
        </div>

        <div>
          <label className={labelStyle}>Email</label>
          <input type="email" {...register("email")} className={inputStyle} />
        </div>

        <div>
          <label className={labelStyle}>Phone</label>
          <input type="text" {...register("phone")} className={inputStyle} />
        </div>
      </div>

      {/* Arabic/English titles */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={labelStyle}>Title (EN)</label>
          <input type="text" {...register("titleEn")} className={inputStyle} />
        </div>
        <div>
          <label className={labelStyle}>Title (AR)</label>
          <input
            type="text"
            {...register("titleAr")}
            className={inputStyle}
            dir="rtl"
          />
        </div>
        <div>
          <label className={labelStyle}>Description (EN)</label>
          <textarea
            {...register("descriptionEn")}
            className={inputStyle}></textarea>
        </div>
        <div>
          <label className={labelStyle}>Description (AR)</label>
          <textarea
            {...register("descriptionAr")}
            className={inputStyle}
            dir="rtl"></textarea>
        </div>
        <div>
          <label className={labelStyle}>Address (EN)</label>
          <input
            type="text"
            {...register("addressEn")}
            className={inputStyle}
          />
        </div>
        <div>
          <label className={labelStyle}>Address (AR)</label>
          <input
            type="text"
            {...register("addressAr")}
            className={inputStyle}
            dir="rtl"
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-8 px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-200">
        {mode === "create" ? "Create Property" : "Update Property"}
      </button>
    </form>
  );
}
