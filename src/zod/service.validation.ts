// service.validation.frontend.ts

/**
 * Frontend-friendly create service validation
 * - string/number conversion
 * - tags string or array support
 * - image file optional
 */
// service.validation.frontend.ts
import { z } from "zod";
import { ServiceCategory, ServiceStatus } from "@/types/service.interface";

// enums
const serviceStatusEnum = z.nativeEnum(ServiceStatus);
const serviceCategoryEnum = z.nativeEnum(ServiceCategory);

// CREATE SCHEMA
export const serviceZodSchema = z.object({
  title: z.string().min(5).max(100),
  description: z.string().min(20, "Description must be at least 20 characters"),
  price: z
    .union([z.string(), z.number()])
    .transform((v) => Number(v))
    .refine((v) => v >= 1, "Price must be greater than 0"),
  deliveryTime: z
    .union([z.string(), z.number()])
    .transform((v) => Number(v))
    .refine((v) => Number.isInteger(v) && v >= 1, "Delivery days must be >= 1"),

  category: serviceCategoryEnum, // REQUIRED

  tags: z.union([z.array(z.string()), z.string()]).transform((val) => {
    if (!val) return [];
    if (Array.isArray(val)) return val.map((t) => t.trim()).filter(Boolean);
    return val
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
  }),

  image: z.instanceof(File).refine((f) => f.size > 0, "Image is required"),
});


/**
 * Frontend-friendly update service validation
 * - all fields optional
 * - same transformations as create
 */
export const updateServiceSchema = z.object({
  title: z.string().min(5).max(100).optional(),
 description: z.string().min(20, "Description must be at least 20 characters").optional(),
  price: z
    .union([z.string(), z.number()])
    .transform((v) => Number(v))
    .refine((v) => !isNaN(v) && v >= 1, "Price must be > 0")
    .optional(),
  deliveryTime: z
    .union([z.string(), z.number()])
    .transform((v) => Number(v))
    .refine(
      (v) => !isNaN(v) && Number.isInteger(v) && v >= 1,
      "Delivery time must be >= 1 day"
    )
    .optional(),

  category: serviceCategoryEnum.optional(),

  tags: z
    .union([z.array(z.string()), z.string()])
    .optional()
    .transform((val) => {
      if (!val) return [];
      if (Array.isArray(val)) return val.map((t) => t.trim()).filter(Boolean);
      return val
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
    }),

  status: serviceStatusEnum.optional(),

  image: z.instanceof(File).optional(),
});
