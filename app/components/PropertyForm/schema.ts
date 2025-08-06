import { z } from "zod";

export const propertySchema = z.object({
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
});

export type PropertyInput = z.infer<typeof propertySchema>;
