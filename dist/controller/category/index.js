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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCategoryByIdController = exports.getCategoryByIdController = exports.deleteCategoryByIdController = exports.createBulkCategoriesController = exports.getAllCategoryController = exports.addCategoryController = void 0;
const utils_1 = require("../../utils");
const lib_1 = require("../../lib");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
//----------------------------------------------
// add category
//----------------------------------------------
const addCategoryController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req === null || req === void 0 ? void 0 : req.body;
    try {
        const slug = yield (0, utils_1.generateSlug)(body === null || body === void 0 ? void 0 : body.title);
        const checkSlug = yield lib_1.db.category.findFirst({
            where: {
                slug: slug,
            },
        });
        if (checkSlug) {
            return (0, utils_1.sendResponse)(res, 400, "Slug is already exist");
        }
        const category = yield lib_1.db.category.create({
            data: {
                mainCategoryId: body === null || body === void 0 ? void 0 : body.mainCategoryId,
                title: body === null || body === void 0 ? void 0 : body.title,
                description: body === null || body === void 0 ? void 0 : body.description,
                status: body === null || body === void 0 ? void 0 : body.status,
                slug: slug,
                imageUrl: body === null || body === void 0 ? void 0 : body.imageUrl,
            },
        });
        return (0, utils_1.sendResponse)(res, 200, "Create category successfully", category);
    }
    catch (error) {
        return (0, utils_1.sendResponse)(res, 500, "[CREATE_CATEGORY]: Internal Error", error === null || error === void 0 ? void 0 : error.message);
    }
}));
exports.addCategoryController = addCategoryController;
//----------------------------------------------
// get all category by id
//----------------------------------------------
const getAllCategoryController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield lib_1.db.category.findMany({
            orderBy: {
                updatedAt: "desc",
            },
            where: {
                status: {
                    not: "DELETED",
                },
            },
            include: {
                mainCategory: true,
            },
        });
        if (!category) {
            return (0, utils_1.sendResponse)(res, 400, "Category not found!");
        }
        return (0, utils_1.sendResponse)(res, 200, "Get all category successfully", category);
    }
    catch (error) {
        return (0, utils_1.sendResponse)(res, 500, "[GET_ALL_CATEGORY]: Internal Error", error === null || error === void 0 ? void 0 : error.message);
    }
}));
exports.getAllCategoryController = getAllCategoryController;
//----------------------------------------------
// add bulk category
//----------------------------------------------
const createBulkCategoriesController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req === null || req === void 0 ? void 0 : req.body;
        console.log({ body });
        let categories = [];
        for (const category of body === null || body === void 0 ? void 0 : body.categories) {
            const newCategory = yield addCategory(category);
            categories.push(newCategory);
        }
        return (0, utils_1.sendResponse)(res, 200, "Create Bulk category successfully", categories);
    }
    catch (error) {
        return (0, utils_1.sendResponse)(res, 500, "[CREATE_BULK_CATEGORY]: Internal Error", error === null || error === void 0 ? void 0 : error.message);
    }
}));
exports.createBulkCategoriesController = createBulkCategoriesController;
const addCategory = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const slug = yield (0, utils_1.generateSlug)(data === null || data === void 0 ? void 0 : data.title);
        const checkSlug = yield lib_1.db.category.findFirst({
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
        const category = yield lib_1.db.category.create({
            data: {
                mainCategoryId: data === null || data === void 0 ? void 0 : data.mainCategoryId,
                title: data === null || data === void 0 ? void 0 : data.title,
                slug: slug,
                imageUrl: data === null || data === void 0 ? void 0 : data.imageUrl,
                status: "ACTIVE",
            },
        });
        return {
            title: category.title,
            status_upload: "",
        };
    }
    catch (error) {
        return {
            title: "",
            status_upload: "",
            error: error === null || error === void 0 ? void 0 : error.message,
            data: data,
        };
    }
});
//----------------------------------------------
// delete category by id
//----------------------------------------------
const deleteCategoryByIdController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req === null || req === void 0 ? void 0 : req.params;
    try {
        if (!params.id) {
            return (0, utils_1.sendResponse)(res, 400, "Category Id not found");
        }
        const category = yield lib_1.db.category.findFirst({
            where: {
                id: params.id,
            },
        });
        if (!category) {
            return (0, utils_1.sendResponse)(res, 400, "Category not found");
        }
        const deleteCategory = yield lib_1.db.category.delete({
            where: {
                id: params.id,
            },
        });
        return (0, utils_1.sendResponse)(res, 200, "Delete category successfully", deleteCategory);
    }
    catch (error) {
        return (0, utils_1.sendResponse)(res, 500, "[DELETE_CATEGORY]: Internal Error", error === null || error === void 0 ? void 0 : error.message);
    }
}));
exports.deleteCategoryByIdController = deleteCategoryByIdController;
//----------------------------------------------
// get category by id
//----------------------------------------------
const getCategoryByIdController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req === null || req === void 0 ? void 0 : req.params;
    try {
        if (!params.id) {
            return (0, utils_1.sendResponse)(res, 400, "Category Id not found");
        }
        const category = yield lib_1.db.category.findFirst({
            where: {
                id: params.id,
            },
        });
        if (!category) {
            return (0, utils_1.sendResponse)(res, 400, "Category not found");
        }
        return (0, utils_1.sendResponse)(res, 200, "Get category by id successfully", category);
    }
    catch (error) {
        return (0, utils_1.sendResponse)(res, 500, "[GET_CATEGORY_BY_ID]: Internal Error", error === null || error === void 0 ? void 0 : error.message);
    }
}));
exports.getCategoryByIdController = getCategoryByIdController;
//----------------------------------------------
// update category by id
//----------------------------------------------
const updateCategoryByIdController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req === null || req === void 0 ? void 0 : req.params;
    const body = req === null || req === void 0 ? void 0 : req.body;
    try {
        if (!params.id) {
            return (0, utils_1.sendResponse)(res, 400, "Category Id not found");
        }
        const category = yield lib_1.db.category.findFirst({
            where: {
                id: params.id,
            },
        });
        if (!category) {
            return (0, utils_1.sendResponse)(res, 400, "Category not found");
        }
        const slug = yield (0, utils_1.generateSlug)(body === null || body === void 0 ? void 0 : body.title);
        const checkSlug = yield lib_1.db.category.findFirst({
            where: {
                slug: slug,
                NOT: {
                    id: params.id, // Exclude the current category from the check
                },
            },
        });
        if (checkSlug) {
            return (0, utils_1.sendResponse)(res, 400, "Slug is already exist");
        }
        const categoryUpdate = yield lib_1.db.category.update({
            where: {
                id: params.id,
            },
            data: {
                title: body === null || body === void 0 ? void 0 : body.title,
                description: body === null || body === void 0 ? void 0 : body.description,
                slug: slug,
                imageUrl: body === null || body === void 0 ? void 0 : body.imageUrl,
                status: body === null || body === void 0 ? void 0 : body.status,
                mainCategoryId: body === null || body === void 0 ? void 0 : body.mainCategoryId,
            },
        });
        return (0, utils_1.sendResponse)(res, 200, "Update category by id successfully", categoryUpdate);
    }
    catch (error) {
        return (0, utils_1.sendResponse)(res, 500, "[UPDATE_CATEGORY_BY_ID]: Internal Error", error === null || error === void 0 ? void 0 : error.message);
    }
}));
exports.updateCategoryByIdController = updateCategoryByIdController;
