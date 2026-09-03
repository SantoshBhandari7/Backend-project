import mongoose from "mongoose";
import { z } from "zod";

export const createProductSchema = z.object({
  body: z.object({
    name: z
      .string({
        error: (issue) =>
          issue.input === null
            ? "name is required"
            : "name must be string",
      })
      .min(3, "name must be 3 characters long")
      .max(100, "name should not exceed 100 characters")
      .trim(),

    price: z.coerce
      .number({
        error: "price must be number",
      })
      .positive("price must be greater than 0"),

    stock: z.coerce
      .number({
        error: "stock must be number",
      })
      .min(0, "stock cannot be negative"),

    brand: z
      .string({
        error: (issue) =>
          issue.input === null
            ? "Brand is required"
            : "brand must be string",
      })
      .min(1, "brand is required")
      .trim(),

    category: z
      .string({
        error: (issue) =>
          issue.input === null
            ? "category is required"
            : "category must be string",
      })
      .min(1, "category is required")
      .trim(),

    description: z
      .string({
        error: "description is required",
      })
      .min(25, "description must be at least 25 characters")
      .trim(),

    new_arrival: z.coerce.boolean().default(false),
  }),
});

export const updateproductSchema = z.object({
  body: z.object({
    name: z
      .string({
        error: "name must be required",
      })
      .min(3, "name must be 3 character along")
      .max(100, "name shouldnot be exceds than 100")
      .trim(),
    price: z.number({
      error: "price must be number",
    }),

    stock: z.number({
      error: "stock must be number",
    }),
    brand: z
      .string({
        error: "brand must be string",
      })
      .min(3, "brand must be 3 character along")
      .max(20, "brand shouldnot excceds tahn 20 characters")
      .trim(),

    category: z
      .string({
        error: "category must be string",
      })
      .min(3, "brand must be 3 character along")
      .max(20, "brand shouldnot excceds tahn 20 characters")
      .trim(),
  }),
});

export const deleteproductSchema = z.object({
  params: z.object({
    id: z
      .string()
      .refine((id) => mongoose.Types.ObjectId.isValid(id), "invalid id"),
  }),
});

export const getproductByIdSchema = z.object({
  params: z.object({
    id: z
      .string()
      .refine((id) => mongoose.Types.ObjectId.isValid(id), "invalid id"),
  }),
});

export const productQuerySchema = z.object({
  query: z.object({
    query: z.string().optional(),
  }),
});
