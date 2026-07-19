import mongoose from "mongoose";
import { number, z } from "zod";

export const createProductSchema = z.object({
  body: z.object({
    name: z
      .string({
        error: (issue) =>
          issue.input === null ? "name is required" : "name must be required",
      })
      .min(3, "name must be 3 character along")
      .max(100, "name shouldnot be exceds than 100")
      .trim(),
    price: z.number({
      error: (issue) =>
        issue.input === null ? "price is required" : "price must be number",
    }),

    stock: z.number({
      error: "stock must be number",
    }),
    brand: z
      .string({
        error: (issue) =>
          issue.input === null ? "Brand is required" : "brand must be string",
      })
      .min(3, "brand must be 3 character along")
      .max(20, "brand shouldnot excceds tahn 20 characters")
      .trim(),

    category: z.string({
      error: (issue) =>
        issue.input === null
          ? "category is required"
          : "category must be string",
    }),
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
