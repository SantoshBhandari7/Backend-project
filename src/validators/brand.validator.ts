import mongoose from "mongoose";
import { optional, z } from "zod";

export const createBrandSchema = z.object({
  body: z.object({
    full_name: z
      .string({
        error: (issue) =>
          issue.input === null ? "name is reuired" : "name must be string",
      })
      .trim()
      .min(3, "name must be 3 charcaters long.")
      .max(100, "name must not exceed 100 charcaters")
      .refine((val) => !z.regexes.number.test(val), "name must be string"),

    description: z
      .string({
        error: "description must be string",
      })
      .min(25, "description must be 25 characters along")
      .max(500, "description must not exceed 500 characters")
      .optional(),
  }),
});

export const updateBrandSchema = z.object({
  body: z.object({
    name: z
      .string({
        error: "name is must be string",
      })
      .min(4, "Name must be 3 characters along")
      .max(90, "Name donot exceeds than 90 characters"),

    description: z
      .string({
        error: "description must be string",
      })
      .min(25, "description must be 25 characters along")
      .max(500, "description must not exceed 500 characters")
      .optional(),
  }),
});

export const deleteBrandSchema = z.object({
  params: z.object({
    id: z
      .string()
      .refine((id) => mongoose.Types.ObjectId.isValid(id), "invalid id"),
  }),
});

export const getBrandByIdSchema = z.object({
  params: z.object({
    id: z
      .string()
      .refine((id) => mongoose.Types.ObjectId.isValid(id), "invalid id"),
  }),
});

export const brandQuerySchema = z.object({
  query: z.object({
    query: z.string().optional(),
    order: z.enum(["DESC", "ASC"]).default("DESC"),
    sortBy: z.string().default("createdAt"),
  }),
});
