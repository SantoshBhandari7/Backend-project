import mongoose from "mongoose";
import { z } from "zod";

export const createCategorySchema = z.object({
  body: z.object({
    name: z
      .string({
        error: (issue) =>
          issue.input === null ? "name is required" : "name must be string",
      })
      .trim()
      .min(3, "name must be 3 characters long")
      .max(100, "name must not exceed 100 character")
      .refine((val) => !z.regexes.number.test(val), "name must be string"),

    description: z
      .string({
        error: (issue) =>
          issue.input === null ? "price is required" : "price must be Number",
      })
      .min(25, "description must be 25 character along")
      .max(500, "description donot exceeds than 500"),
  }),
});
export const updatecategorySchema = z.object({
  body: z.object({
    name: z
      .string({
        error: "name must be string",
      })
      .min(3, "name must  3 be characters along")
      .max(100, "name shold not exceed than 100 characters")
      .trim(),

    description: z
      .string({
        error: "description must be string",
      })
      .min(100, "description must be 100 character along")
      .max(400, "description donot must be 400 character along"),
  }),
});

export const deletecategorySchema = z.object({
  params: z.object({
    id: z
      .string()
      .refine((id) => mongoose.Types.ObjectId.isValid(id), "invalid id"),
  }),
});

export const getcategoryByIdSchema = z.object({
  params: z.object({
    id: z
      .string()
      .refine((id) => mongoose.Types.ObjectId.isValid(id), "invalid id"),
  }),
});

export const categoryQuerySchema = z.object({
  query: z.object({
    query: z.string().optional(),
  }),
});
