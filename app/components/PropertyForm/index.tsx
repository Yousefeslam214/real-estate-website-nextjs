"use client";

import { useForm } from "react-hook-form";
import { PropertyFormProps } from "@/types/PropertyForms";
import {  PropertyInput } from "@/schemas/property.schema";

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
    // resolver: zodResolver(inputPropertySchema),
    defaultValues,
  });
  console.log("Default Values from property Form:", defaultValues);

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
          <label className={labelStyle}>price_amount</label>
          <input
            type="number"
            {...register("price_amount")}
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
            {...register("area_sqm")}
            className={inputStyle}
          />
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
          <label className={labelStyle}>Cover Image URL</label>
          <input
            type="url"
            {...register("coverimageurl")}
            className={inputStyle}
          />
        </div>

        <div>
          <label className={labelStyle}>Listing Type</label>
          <select {...register("listing_type")} className={inputStyle}>
            <option value="rent">Rent</option>
            <option value="إيجار">إيجار</option>
          </select>
        </div>

        <div>
          <label className={labelStyle}>Status</label>
          <select {...register("status")} className={inputStyle}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="نشط">نشط</option>
            <option value="غير نشط">غير نشط</option>
          </select>
        </div>

        <div>
          <label className={labelStyle}>Developer Name</label>
          <input
            type="text"
            {...register("developer.name")}
            className={inputStyle}
          />
        </div>

        <div>
          <label className={labelStyle}>Project Name</label>
          <input
            type="text"
            {...register("project.name")}
            className={inputStyle}
          />
        </div>

        <div>
          <label className={labelStyle}>Your Name</label>
          <input
            type="text"
            {...register("contact.name")}
            className={inputStyle}
          />
        </div>

        <div>
          <label className={labelStyle}>Email</label>
          <input
            type="email"
            {...register("contact.email")}
            className={inputStyle}
          />
        </div>

        <div>
          <label className={labelStyle}>Phone</label>
          <input
            type="text"
            {...register("contact.phone")}
            className={inputStyle}
          />
        </div>

        <div>
          <label className={labelStyle}>Contact Type</label>
          <input
            type="text"
            {...register("contact.contact_type")}
            className={inputStyle}
          />
        </div>

        <div>
          <label className={labelStyle}>Location - Country</label>
          <input
            type="text"
            {...register("location.country")}
            className={inputStyle}
          />
        </div>

        <div>
          <label className={labelStyle}>Governorate</label>
          <input
            type="text"
            {...register("location.governorate")}
            className={inputStyle}
          />
        </div>

        <div>
          <label className={labelStyle}>District</label>
          <input
            type="text"
            {...register("location.district")}
            className={inputStyle}
          />
        </div>

        <div>
          <label className={labelStyle}>Area</label>
          <input
            type="text"
            {...register("location.area")}
            className={inputStyle}
          />
        </div>
      </div>

      {/* Additional Info - Arabic / English */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Titles */}
        <div>
          <label className={labelStyle}>Title (EN)</label>
          <input
            type="text"
            {...register("additional_information.en.title")}
            className={inputStyle}
          />
        </div>
        <div>
          <label className={labelStyle}>Title (AR)</label>
          <input
            type="text"
            {...register("additional_information.ar.title")}
            className={inputStyle}
            dir="rtl"
          />
        </div>

        {/* Descriptions */}
        <div>
          <label className={labelStyle}>Description (EN)</label>
          <textarea
            {...register("additional_information.en.description")}
            className={inputStyle}
          />
        </div>
        <div>
          <label className={labelStyle}>Description (AR)</label>
          <textarea
            {...register("additional_information.ar.description")}
            className={inputStyle}
            dir="rtl"
          />
        </div>

        {/* Addresses */}
        <div>
          <label className={labelStyle}>Address (EN)</label>
          <input
            type="text"
            {...register("additional_information.en.address")}
            className={inputStyle}
          />
        </div>
        <div>
          <label className={labelStyle}>Address (AR)</label>
          <input
            type="text"
            {...register("additional_information.ar.address")}
            className={inputStyle}
            dir="rtl"
          />
        </div>

        {/* Features */}
        <div>
          <label className={labelStyle}>Features (EN)</label>
          <input
            type="text"
            {...register("additional_information.en.features")}
            className={inputStyle}
            placeholder="e.g. Elevator, Pool"
          />
        </div>
        <div>
          <label className={labelStyle}>Features (AR)</label>
          <input
            type="text"
            {...register("additional_information.ar.features")}
            className={inputStyle}
            dir="rtl"
            placeholder="مثال: مصعد، مسبح"
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
