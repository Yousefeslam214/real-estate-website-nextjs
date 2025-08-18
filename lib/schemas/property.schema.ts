import { z } from "zod";

export const updatePropertySchema = z.object({
  projectId: z.number(),
  propertyTypeId: z.number(),
  priceAmount: z.number(),
  bedrooms: z.number().min(0),
  bathrooms: z.number().min(0),
  areaSqm: z.number().min(0),
  listingType: z.enum(["rent", "sale"]),
  status: z.enum(["active", "inactive"]),
  available_from: z.string(), // ISO date string (e.g. "2025-08-01")
  titleEn: z.string().min(3),
  titleAr: z.string().min(3),
  descriptionEn: z.string().min(3),
  descriptionAr: z.string().min(3),
  addressEn: z.string().min(3),
  addressAr: z.string().min(3),
  features: z.array(z.number()),
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(6),
  price_amount: z.coerce.number(),
});

export const inputPropertySchema = z.object({
  price_amount: z.coerce.number(),
  bedrooms: z.coerce.number(),
  bathrooms: z.coerce.number(),
  area_sqm: z.coerce.number(),
  coverimageurl: z.string().url().nullable().optional(),

  available_from: z.string(), // ISO date string

  is_approved: z.boolean().optional(),

  contact: z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string(),
    contact_type: z.string(),
  }),

  location: z.object({
    country: z.string(),
    governorate: z.string(),
    district: z.string(),
    area: z.string(),
  }),

  project: z.object({
    name: z.string(),
  }),

  developer: z.object({
    name: z.string(),
  }),

  listing_type: z.enum(["rent", "إيجار"]),
  status: z.enum(["active", "inactive", "نشط", "غير نشط"]),

  property_type: z.object({
    category: z.string(),
    subtype: z.string(),
  }),

  additional_information: z.object({
    ar: z.object({
      title: z.string(),
      description: z.string(),
      address: z.string(),
      features: z.array(z.string()),
    }),
    en: z.object({
      title: z.string(),
      description: z.string(),
      address: z.string(),
      features: z.array(z.string()),
    }),
  }),

  photos: z.array(z.any()).optional(),
  actions: z.array(z.any()).optional(),
});

export type PropertyInput = z.infer<typeof inputPropertySchema>;
export type PropertyUpdateInput = z.infer<typeof updatePropertySchema>;
