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
export const addUnitSchema = z.object({
  title: z.string().min(2, {
    message: "title must be at least 2 characters.",
  }),
  abbreviation: z.string(),
  status: z.string(),
});

export const updateUnitSchema = z.object({
  title: z.string().min(2, {
    message: "title must be at least 2 characters.",
  }),
  abbreviation: z.string(),
  status: z.string(),
});
export const addProductSchema = z.object({
  name: z.string(),
  productCode: z.string(),
  stockQty: z.number(),
  supplierId: z.string(),
  brandId: z.string(),
  subCategoryId: z.string(),
  unitId: z.string(),
  productCost: z.number(),
  productPrice: z.number(),
  alertQty: z.number(),
  productTax: z.number(),
  taxMethod: z.enum(["INCLUSIVE", "EXCLUSIVE"]), // Assuming taxMethod can be "inclusive" or "exclusive"
  // productImages: z.array(z.string()),
  productThumbnail: z.string(),
  productDetails: z.string(),
  status: z.string().min(2, {
    message: "status must be at least 2 characters.",
  }),
});

export const updateProductSchema = z.object({
  name: z.string(),
  productCode: z.string(),
  stockQty: z.number(),
  supplierId: z.string(),
  brandId: z.string(),
  subCategoryId: z.string(),
  unitId: z.string(),
  productCost: z.number(),
  productPrice: z.number(),
  alertQty: z.number(),
  productTax: z.number(),
  taxMethod: z.enum(["INCLUSIVE", "EXCLUSIVE"]), // Assuming taxMethod can be "inclusive" or "exclusive"
  productImages: z.array(z.string()),
  productThumbnail: z.string(),
  productDetails: z.string(),
  status: z.string().min(2, {
    message: "status must be at least 2 characters.",
  }),
});

export const addRoleSchema = z.object({
  displayName: z
    .string({ required_error: "Display Name is required" })
    .min(3, { message: "Display Name must be at least 3 characters" }),
  roleName: z
    .string({ required_error: "Role Name is required" })
    .min(1, { message: "Role Name must be at least 1 characters" }),
  description: z.string().optional(),
  status: z.string(),
});

export const updateRoleSchema = z.object({
  displayName: z
    .string({ required_error: "Display Name is required" })
    .min(3, { message: "Display Name must be at least 3 characters" }),
  roleName: z
    .string({ required_error: "Role Name is required" })
    .min(1, { message: "Role Name must be at least 1 characters" }),
  description: z.string().optional(),
  status: z.string(),
});

export const addPermissionSchema = z.object({
  displayName: z
    .string({ required_error: "Display Name is required" })
    .min(3, { message: "Display Name must be at least 3 characters" }),
  permissionName: z.string(),
  module: z.string().optional(),
  description: z.string().optional(),
  status: z.string(),
});

export const updatePermissionSchema = z.object({
  displayName: z
    .string({ required_error: "Display Name is required" })
    .min(3, { message: "Display Name must be at least 3 characters" }),
  permissionName: z.string(),
  description: z.string().optional(),
  module: z.string().optional(),
  status: z.string(),
});

export const addUserSchema = z.object({
  firstName: z.string().min(2, {
    message: "First Name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last Name must be at least 2 characters.",
  }),
  email: z.string().email(),
  phone: z.string(),
  imageUrl: z.string().optional(),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters.",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter.",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter.",
    })
    .regex(/[0-9]/, {
      message: "Password must contain at least one number.",
    })
    .regex(/[^A-Za-z0-9]/, {
      message: "Password must contain at least one symbol.",
    }),
  roleId: z.string(),
  status: z.string().min(2, {
    message: "status must be at least 2 characters.",
  }),
});

export const updateUserSchema = z.object({
  firstName: z.string().min(2, {
    message: "First Name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last Name must be at least 2 characters.",
  }),
  email: z.string().email(),
  phone: z.string(),
  imageUrl: z.string().optional(),
  roleId: z.string(),
  status: z.string().min(2, {
    message: "status must be at least 2 characters.",
  }),
});

export const updateInviteSentSchema = z.object({
  email: z.string().email(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters.",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter.",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter.",
    })
    .regex(/[0-9]/, {
      message: "Password must contain at least one number.",
    })
    .regex(/[^A-Za-z0-9]/, {
      message: "Password must contain at least one symbol.",
    }),
});

// OrderLineItem schema
const OrderLineItemSchema = z.object({
  id: z.string().min(1, { message: "ID is required" }), // String, non-empty
  name: z.string().min(1, { message: "Name is required" }), // String, non-empty
  price: z.number().positive("Price must be a positive number"), // Positive number
  qty: z.number().int().positive("Quantity must be a positive integer"), // Positive integer
  productThumbnail: z.string().url("Must be a valid URL"), // Valid URL string
});
// CustomerData schema
const CustomerDataSchema = z.object({
  customerId: z.string().min(1, { message: "Customer ID is required" }), // String, non-empty
});
export const createLineOrderSchema = z.object({
  orderItems: z.array(OrderLineItemSchema),
  customerData: CustomerDataSchema,
});

export const createCustomersSchema = z.object({
  firstName: z.string().min(2, {
    message: "First Name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last Name must be at least 2 characters.",
  }),
  email: z.string().email(),
  phone: z.string(),
  imageUrl: z.string().optional(),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters.",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter.",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter.",
    })
    .regex(/[0-9]/, {
      message: "Password must contain at least one number.",
    })
    .regex(/[^A-Za-z0-9]/, {
      message: "Password must contain at least one symbol.",
    }),
  roleId: z.string(),
  status: z.string().min(2, {
    message: "status must be at least 2 characters.",
  }),
  additionalInfo: z.string().optional(),
  shippingAddress: z.string().optional(),
  billingAddress: z.string().optional(),
});

export const updateCustomerSchema = z.object({
  firstName: z.string().min(2, {
    message: "First Name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last Name must be at least 2 characters.",
  }),
  email: z.string().email(),
  phone: z.string(),
  imageUrl: z.string().optional(),
  status: z.string().min(2, {
    message: "status must be at least 2 characters.",
  }),
  additionalInfo: z.string().optional(),
  shippingAddress: z.string().optional(),
  billingAddress: z.string().optional(),
});

export const addMainCategorySchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(3, { message: "Title must be at least 3 characters" }),
});

export const updateMainCategorySchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(3, { message: "Title must be at least 3 characters" }),
});

export const addSubCategorySchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(3, { message: "Title must be at least 3 characters" }),
  categoryId: z.string({ required_error: "Category Id is required" }),
});

export const updateSubCategorySchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(3, { message: "Title must be at least 3 characters" }),
  categoryId: z.string({ required_error: "Category Id is required" }),
});

export const addAdvertSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(3, { message: "Title must be at least 3 characters" }),
  description: z
    .string({ required_error: "Content is required" })
    .min(1, { message: "Content must be at least 1 characters" }),
  status: z.enum(["ACTIVE", "DISABLED"]),
  imageUrl: z.string({ required_error: "Content is required" }).optional(),
  link: z.string({ required_error: "Link is required" }),
});

export const updateAdvertSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(3, { message: "Title must be at least 3 characters" }),
  description: z
    .string({ required_error: "Content is required" })
    .min(1, { message: "Content must be at least 1 characters" }),
  status: z.enum(["ACTIVE", "DISABLED"]),
  imageUrl: z.string({ required_error: "Content is required" }).optional(),
  link: z.string({ required_error: "Link is required" }),
});
