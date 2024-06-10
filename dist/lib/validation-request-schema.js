"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBrandSchema = exports.addBrandSchema = exports.updateCategorySchema = exports.addCategorySchema = void 0;
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
