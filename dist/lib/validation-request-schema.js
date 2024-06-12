"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateWarehouseSchema = exports.addWarehouseSchema = exports.updateBrandSchema = exports.addBrandSchema = exports.updateCategorySchema = exports.addCategorySchema = void 0;
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
