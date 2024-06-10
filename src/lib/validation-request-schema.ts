import { z } from "zod";

export const addCategorySchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(3, { message: "Title must be at least 3 characters" }),
  description: z
    .string({ required_error: "Content is required" })
    .min(1, { message: "Content must be at least 1 characters" }),
  status: z.enum(["ACTIVE", "DISABLED"]),
  imageUrl: z.string({ required_error: "Content is required" }).optional(),
});

export const updateCategorySchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(3, { message: "Title must be at least 3 characters" }),
  description: z
    .string({ required_error: "Content is required" })
    .min(1, { message: "Content must be at least 1 characters" }),
  status: z.enum(["ACTIVE", "DISABLED"]),
  imageUrl: z.string({ required_error: "Content is required" }).optional(),
});

export const addBrandSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(3, { message: "Title must be at least 3 characters" }),
  status: z.enum(["ACTIVE", "DISABLED"]),
  imageUrl: z.string({ required_error: "Content is required" }).optional(),
});

export const updateBrandSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(3, { message: "Title must be at least 3 characters" }),
  status: z.enum(["ACTIVE", "DISABLED"]),
  imageUrl: z.string({ required_error: "Content is required" }).optional(),
});
