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

export const addWarehouseSchema = z.object({
  name: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  state: z.string().min(2, {
    message: "state must be at least 2 characters.",
  }),
  country: z.string().min(2, {
    message: "country must be at least 2 characters.",
  }),
  city: z.string().min(2, {
    message: "city must be at least 2 characters.",
  }),
  phone: z.string().min(2, {
    message: "phone must be at least 2 characters.",
  }),
  email: z
    .string()
    .min(2, {
      message: "email must be at least 2 characters.",
    })
    .email(),
  contactPerson: z.string().min(2, {
    message: "contact person must be at least 2 characters.",
  }),
  zipCode: z.string().min(2, {
    message: "zipCode must be at least 2 characters.",
  }),
  imageUrl: z.string().optional(),
  status: z.string().min(2, {
    message: "status must be at least 2 characters.",
  }),
});

export const updateWarehouseSchema = z.object({
  name: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  state: z.string().min(2, {
    message: "state must be at least 2 characters.",
  }),
  country: z.string().min(2, {
    message: "country must be at least 2 characters.",
  }),
  city: z.string().min(2, {
    message: "city must be at least 2 characters.",
  }),
  phone: z.string().min(2, {
    message: "phone must be at least 2 characters.",
  }),
  email: z
    .string()
    .min(2, {
      message: "email must be at least 2 characters.",
    })
    .email(),
  contactPerson: z.string().min(2, {
    message: "contact person must be at least 2 characters.",
  }),
  zipCode: z.string().min(2, {
    message: "zipCode must be at least 2 characters.",
  }),
  imageUrl: z.string().optional(),
  status: z.string().min(2, {
    message: "status must be at least 2 characters.",
  }),
});
export const addSupplierSchema = z.object({
  name: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  companyName: z.string().min(2, {
    message: "companyName must be at least 2 characters.",
  }),
  state: z.string().min(2, {
    message: "state must be at least 2 characters.",
  }),
  country: z.string().min(2, {
    message: "country must be at least 2 characters.",
  }),
  city: z.string().min(2, {
    message: "city must be at least 2 characters.",
  }),
  phone: z.string().min(2, {
    message: "phone must be at least 2 characters.",
  }),
  email: z
    .string()
    .min(2, {
      message: "email must be at least 2 characters.",
    })
    .email(),
  address: z.string().min(2, {
    message: "address person must be at least 2 characters.",
  }),
  postalCode: z.string().min(2, {
    message: "postalCode must be at least 2 characters.",
  }),
  imageUrl: z.string().optional(),
});

export const updateSupplierSchema = z.object({
  name: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  companyName: z.string().min(2, {
    message: "companyName must be at least 2 characters.",
  }),
  state: z.string().min(2, {
    message: "state must be at least 2 characters.",
  }),
  country: z.string().min(2, {
    message: "country must be at least 2 characters.",
  }),
  city: z.string().min(2, {
    message: "city must be at least 2 characters.",
  }),
  phone: z.string().min(2, {
    message: "phone must be at least 2 characters.",
  }),
  email: z
    .string()
    .min(2, {
      message: "email must be at least 2 characters.",
    })
    .email(),
  address: z.string().min(2, {
    message: "address person must be at least 2 characters.",
  }),
  postalCode: z.string().min(2, {
    message: "postalCode must be at least 2 characters.",
  }),
  imageUrl: z.string().optional(),
});
