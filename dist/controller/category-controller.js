"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategoryByIdController = exports.createBulkCategoriesController = exports.getAllCategoryController = exports.addCategoryController = void 0;
const send_response_1 = require("../utils/send-response");
const db_1 = require("../lib/db");
const generate_slug_1 = require("../utils/generate-slug");
const addCategoryController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req === null || req === void 0 ? void 0 : req.body;
    try {
        const slug = (0, generate_slug_1.generateSlug)(body === null || body === void 0 ? void 0 : body.title);
        const checkSlug = yield db_1.db.category.findFirst({
            where: {
                slug: slug,
            },
        });
        if (checkSlug) {
            return (0, send_response_1.sendResponse)(res, 400, "Slug is already exist");
        }
        const category = yield db_1.db.category.create({
            data: {
                title: body === null || body === void 0 ? void 0 : body.title,
                description: body === null || body === void 0 ? void 0 : body.description,
                status: body === null || body === void 0 ? void 0 : body.status,
                slug: slug,
                imageUrl: body === null || body === void 0 ? void 0 : body.imageUrl,
            },
        });
        return (0, send_response_1.sendResponse)(res, 200, "Create category successfully", category);
    }
    catch (error) {
        return (0, send_response_1.sendResponse)(res, 500, "[CREATE_CATEGORY]: Internal Error", error);
    }
});
exports.addCategoryController = addCategoryController;
const getAllCategoryController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield db_1.db.category.findMany({
            orderBy: {
                createdAt: "desc",
            },
            where: {
                status: {
                    not: "DELETED",
                },
            },
        });
        if (!category) {
            return (0, send_response_1.sendResponse)(res, 400, "Category not found!");
        }
        return (0, send_response_1.sendResponse)(res, 200, "Get all category successfully", category);
    }
    catch (error) {
        return (0, send_response_1.sendResponse)(res, 500, "[GET_ALL_CATEGORY]: Internal Error", error);
    }
});
exports.getAllCategoryController = getAllCategoryController;
const createBulkCategoriesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req === null || req === void 0 ? void 0 : req.body;
        console.log({ body });
        let categories = [];
        for (const category of body === null || body === void 0 ? void 0 : body.categories) {
            const newCategory = yield addCategory(category);
            categories.push(newCategory);
        }
        return (0, send_response_1.sendResponse)(res, 200, "Create Bulk category successfully", categories);
    }
    catch (error) {
        return (0, send_response_1.sendResponse)(res, 500, "[GET_ALL_CATEGORY]: Internal Error", error);
    }
});
exports.createBulkCategoriesController = createBulkCategoriesController;
const addCategory = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const slug = (0, generate_slug_1.generateSlug)(data === null || data === void 0 ? void 0 : data.title);
        const checkSlug = yield db_1.db.category.findFirst({
            where: {
                slug: slug,
            },
        });
        if (checkSlug) {
            return {
                title: data.title,
                status_upload: "Error",
            };
        }
        const category = yield db_1.db.category.create({
            data: {
                title: data === null || data === void 0 ? void 0 : data.title,
                slug: slug,
                imageUrl: data === null || data === void 0 ? void 0 : data.image,
                status: "ACTIVE",
            },
        });
        return category;
    }
    catch (error) {
        return null;
    }
});
const deleteCategoryByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req === null || req === void 0 ? void 0 : req.params;
    try {
        if (!params.id) {
            return (0, send_response_1.sendResponse)(res, 400, "Category Id not found");
        }
        const category = yield db_1.db.category.findFirst({
            where: {
                id: params.id,
            },
        });
        if (!category) {
            return (0, send_response_1.sendResponse)(res, 400, "Category not found");
        }
        const deleteCategory = yield db_1.db.category.update({
            where: {
                id: params.id,
            },
            data: {
                status: "DELETED",
            },
        });
        return (0, send_response_1.sendResponse)(res, 200, "Delete category successfully", deleteCategory);
    }
    catch (error) {
        return (0, send_response_1.sendResponse)(res, 500, "[DELETE_CATEGORY_CATEGORY]: Internal Error", error);
    }
});
exports.deleteCategoryByIdController = deleteCategoryByIdController;
