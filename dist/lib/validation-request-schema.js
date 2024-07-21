"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePermissionSchema = exports.addPermissionSchema = exports.updateRoleSchema = exports.addRoleSchema = exports.updateProductSchema = exports.addProductSchema = exports.updateUnitSchema = exports.addUnitSchema = exports.updateSupplierSchema = exports.addSupplierSchema = exports.updateWarehouseSchema = exports.addWarehouseSchema = exports.updateBrandSchema = exports.addBrandSchema = exports.updateCategorySchema = exports.addCategorySchema = void 0;
const zod_1 = require("zod");
exports.addCategorySchema = zod_1.z.object({
    title: zod_1.z
        .string({ required_error: "Title is required" })
        .min(3, { message: "Title must be at least 3 characters" }),
    description: zod_1.z
        .string({ required_error: "Content is required" })
        .min(1, { message: "Content must be at least 1 characters" }),
    status: zod_1.z.enum(["ACTIVE", "DISABLED"]),
    imageUrl: zod_1.z.string({ required_error: "Content is required" }).optional(),
});
exports.updateCategorySchema = zod_1.z.object({
    title: zod_1.z
        .string({ required_error: "Title is required" })
        .min(3, { message: "Title must be at least 3 characters" }),
    description: zod_1.z
        .string({ required_error: "Content is required" })
        .min(1, { message: "Content must be at least 1 characters" }),
    status: zod_1.z.enum(["ACTIVE", "DISABLED"]),
    imageUrl: zod_1.z.string({ required_error: "Content is required" }).optional(),
});
exports.addBrandSchema = zod_1.z.object({
    title: zod_1.z
        .string({ required_error: "Title is required" })
        .min(3, { message: "Title must be at least 3 characters" }),
    status: zod_1.z.enum(["ACTIVE", "DISABLED"]),
    imageUrl: zod_1.z.string({ required_error: "Content is required" }).optional(),
});
exports.updateBrandSchema = zod_1.z.object({
    title: zod_1.z
        .string({ required_error: "Title is required" })
        .min(3, { message: "Title must be at least 3 characters" }),
    status: zod_1.z.enum(["ACTIVE", "DISABLED"]),
    imageUrl: zod_1.z.string({ required_error: "Content is required" }).optional(),
});
exports.addWarehouseSchema = zod_1.z.object({
    name: zod_1.z.string().min(2, {
        message: "name must be at least 2 characters.",
    }),
    state: zod_1.z.string().min(2, {
        message: "state must be at least 2 characters.",
    }),
    country: zod_1.z.string().min(2, {
        message: "country must be at least 2 characters.",
    }),
    city: zod_1.z.string().min(2, {
        message: "city must be at least 2 characters.",
    }),
    phone: zod_1.z.string().min(2, {
        message: "phone must be at least 2 characters.",
    }),
    email: zod_1.z
        .string()
        .min(2, {
        message: "email must be at least 2 characters.",
    })
        .email(),
    contactPerson: zod_1.z.string().min(2, {
        message: "contact person must be at least 2 characters.",
    }),
    zipCode: zod_1.z.string().min(2, {
        message: "zipCode must be at least 2 characters.",
    }),
    imageUrl: zod_1.z.string().optional(),
    status: zod_1.z.string().min(2, {
        message: "status must be at least 2 characters.",
    }),
});
exports.updateWarehouseSchema = zod_1.z.object({
    name: zod_1.z.string().min(2, {
        message: "name must be at least 2 characters.",
    }),
    state: zod_1.z.string().min(2, {
        message: "state must be at least 2 characters.",
    }),
    country: zod_1.z.string().min(2, {
        message: "country must be at least 2 characters.",
    }),
    city: zod_1.z.string().min(2, {
        message: "city must be at least 2 characters.",
    }),
    phone: zod_1.z.string().min(2, {
        message: "phone must be at least 2 characters.",
    }),
    email: zod_1.z
        .string()
        .min(2, {
        message: "email must be at least 2 characters.",
    })
        .email(),
    contactPerson: zod_1.z.string().min(2, {
        message: "contact person must be at least 2 characters.",
    }),
    zipCode: zod_1.z.string().min(2, {
        message: "zipCode must be at least 2 characters.",
    }),
    imageUrl: zod_1.z.string().optional(),
    status: zod_1.z.string().min(2, {
        message: "status must be at least 2 characters.",
    }),
});
exports.addSupplierSchema = zod_1.z.object({
    name: zod_1.z.string().min(2, {
        message: "name must be at least 2 characters.",
    }),
    companyName: zod_1.z.string().min(2, {
        message: "companyName must be at least 2 characters.",
    }),
    state: zod_1.z.string().min(2, {
        message: "state must be at least 2 characters.",
    }),
    country: zod_1.z.string().min(2, {
        message: "country must be at least 2 characters.",
    }),
    city: zod_1.z.string().min(2, {
        message: "city must be at least 2 characters.",
    }),
    phone: zod_1.z.string().min(2, {
        message: "phone must be at least 2 characters.",
    }),
    email: zod_1.z
        .string()
        .min(2, {
        message: "email must be at least 2 characters.",
    })
        .email(),
    address: zod_1.z.string().min(2, {
        message: "address person must be at least 2 characters.",
    }),
    postalCode: zod_1.z.string().min(2, {
        message: "postalCode must be at least 2 characters.",
    }),
    imageUrl: zod_1.z.string().optional(),
});
exports.updateSupplierSchema = zod_1.z.object({
    name: zod_1.z.string().min(2, {
        message: "name must be at least 2 characters.",
    }),
    companyName: zod_1.z.string().min(2, {
        message: "companyName must be at least 2 characters.",
    }),
    state: zod_1.z.string().min(2, {
        message: "state must be at least 2 characters.",
    }),
    country: zod_1.z.string().min(2, {
        message: "country must be at least 2 characters.",
    }),
    city: zod_1.z.string().min(2, {
        message: "city must be at least 2 characters.",
    }),
    phone: zod_1.z.string().min(2, {
        message: "phone must be at least 2 characters.",
    }),
    email: zod_1.z
        .string()
        .min(2, {
        message: "email must be at least 2 characters.",
    })
        .email(),
    address: zod_1.z.string().min(2, {
        message: "address person must be at least 2 characters.",
    }),
    postalCode: zod_1.z.string().min(2, {
        message: "postalCode must be at least 2 characters.",
    }),
    imageUrl: zod_1.z.string().optional(),
});
exports.addUnitSchema = zod_1.z.object({
    title: zod_1.z.string().min(2, {
        message: "title must be at least 2 characters.",
    }),
    abbreviation: zod_1.z.string(),
    status: zod_1.z.string(),
});
exports.updateUnitSchema = zod_1.z.object({
    title: zod_1.z.string().min(2, {
        message: "title must be at least 2 characters.",
    }),
    abbreviation: zod_1.z.string(),
    status: zod_1.z.string(),
});
exports.addProductSchema = zod_1.z.object({
    name: zod_1.z.string(),
    productCode: zod_1.z.string(),
    stockQty: zod_1.z.number(),
    supplierId: zod_1.z.string(),
    brandId: zod_1.z.string(),
    categoryId: zod_1.z.string(),
    unitId: zod_1.z.string(),
    productCost: zod_1.z.number(),
    productPrice: zod_1.z.number(),
    alertQty: zod_1.z.number(),
    productTax: zod_1.z.number(),
    taxMethod: zod_1.z.enum(["INCLUSIVE", "EXCLUSIVE"]), // Assuming taxMethod can be "inclusive" or "exclusive"
    productImages: zod_1.z.array(zod_1.z.string()),
    productThumbnail: zod_1.z.string(),
    productDetails: zod_1.z.string(),
    status: zod_1.z.string().min(2, {
        message: "status must be at least 2 characters.",
    }),
});
exports.updateProductSchema = zod_1.z.object({
    name: zod_1.z.string(),
    slug: zod_1.z.string(),
    productCode: zod_1.z.string(),
    stockQty: zod_1.z.number(),
    supplierId: zod_1.z.string(),
    brandId: zod_1.z.string(),
    categoryId: zod_1.z.string(),
    unitId: zod_1.z.string(),
    productCost: zod_1.z.number(),
    productPrice: zod_1.z.number(),
    alertQty: zod_1.z.number(),
    productTax: zod_1.z.number(),
    taxMethod: zod_1.z.enum(["inclusive", "exclusive"]), // Assuming taxMethod can be "inclusive" or "exclusive"
    productImages: zod_1.z.array(zod_1.z.string()),
    productThumbnail: zod_1.z.string(),
    productDetails: zod_1.z.string(),
    status: zod_1.z.string().min(2, {
        message: "status must be at least 2 characters.",
    }),
});
exports.addRoleSchema = zod_1.z.object({
    displayName: zod_1.z
        .string({ required_error: "Display Name is required" })
        .min(3, { message: "Display Name must be at least 3 characters" }),
    roleName: zod_1.z
        .string({ required_error: "Role Name is required" })
        .min(1, { message: "Role Name must be at least 1 characters" }),
    description: zod_1.z.string().optional(),
    status: zod_1.z.string(),
});
exports.updateRoleSchema = zod_1.z.object({
    displayName: zod_1.z
        .string({ required_error: "Display Name is required" })
        .min(3, { message: "Display Name must be at least 3 characters" }),
    roleName: zod_1.z
        .string({ required_error: "Role Name is required" })
        .min(1, { message: "Role Name must be at least 1 characters" }),
    description: zod_1.z.string().optional(),
    status: zod_1.z.string(),
});
exports.addPermissionSchema = zod_1.z.object({
    displayName: zod_1.z
        .string({ required_error: "Display Name is required" })
        .min(3, { message: "Display Name must be at least 3 characters" }),
    permissionName: zod_1.z.string(),
    module: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    status: zod_1.z.string(),
});
exports.updatePermissionSchema = zod_1.z.object({
    displayName: zod_1.z
        .string({ required_error: "Display Name is required" })
        .min(3, { message: "Display Name must be at least 3 characters" }),
    permissionName: zod_1.z.string(),
    description: zod_1.z.string().optional(),
    module: zod_1.z.string().optional(),
    status: zod_1.z.string(),
});
