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
exports.updateMainCategoryByIdController = exports.getMainCategoryByIdController = exports.deleteMainCategoryByIdController = exports.createBulkMainCategoryController = exports.getAllMainCategoryController = exports.addMainCategoryController = void 0;
const utils_1 = require("../../utils");
const lib_1 = require("../../lib");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
//----------------------------------------------
// add main category
//----------------------------------------------
const addMainCategoryController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req === null || req === void 0 ? void 0 : req.body;
    try {
        const slug = yield (0, utils_1.generateSlug)(body === null || body === void 0 ? void 0 : body.title);
        const checkSlug = yield lib_1.db.mainCategory.findFirst({
            where: {
                slug: slug,
            },
        });
        if (checkSlug) {
            return (0, utils_1.sendResponse)(res, 400, "Slug is already exist");
        }
        const category = yield lib_1.db.mainCategory.create({
            data: {
                title: body === null || body === void 0 ? void 0 : body.title,
                slug: slug,
            },
        });
        return (0, utils_1.sendResponse)(res, 200, "Create Main Categories successfully", category);
    }
    catch (error) {
        return (0, utils_1.sendResponse)(res, 500, "[CREATE_MAIN_CATEGORIES]: Internal Error", error === null || error === void 0 ? void 0 : error.message);
    }
}));
exports.addMainCategoryController = addMainCategoryController;
//----------------------------------------------
// get all main category
//----------------------------------------------
const getAllMainCategoryController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mainCategory = yield lib_1.db.mainCategory.findMany({
            orderBy: {
                updatedAt: "desc",
            },
        });
        if (!mainCategory) {
            return (0, utils_1.sendResponse)(res, 400, "Main Categories not found!");
        }
        return (0, utils_1.sendResponse)(res, 200, "Get all main categories successfully", mainCategory);
    }
    catch (error) {
        return (0, utils_1.sendResponse)(res, 500, "[GET_ALL_MAIN_CATEGORIES]: Internal Error", error === null || error === void 0 ? void 0 : error.message);
    }
}));
exports.getAllMainCategoryController = getAllMainCategoryController;
//----------------------------------------------
// create bulk main category
//----------------------------------------------
const createBulkMainCategoryController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req === null || req === void 0 ? void 0 : req.body;
        let categories = [];
        for (const category of body === null || body === void 0 ? void 0 : body.categories) {
            const newCategory = yield addCategory(category);
            categories.push(newCategory);
        }
        return (0, utils_1.sendResponse)(res, 200, "Create Bulk main category successfully", categories);
    }
    catch (error) {
        return (0, utils_1.sendResponse)(res, 500, "[CREATE_BULK_MAIN_CATEGORY]: Internal Error", error === null || error === void 0 ? void 0 : error.message);
    }
}));
exports.createBulkMainCategoryController = createBulkMainCategoryController;
const addCategory = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const slug = yield (0, utils_1.generateSlug)(data === null || data === void 0 ? void 0 : data.title);
        const checkSlug = yield lib_1.db.mainCategory.findFirst({
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
        const category = yield lib_1.db.mainCategory.create({
            data: {
                title: data === null || data === void 0 ? void 0 : data.title,
                slug: slug,
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
// delete main category by id
//----------------------------------------------
const deleteMainCategoryByIdController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req === null || req === void 0 ? void 0 : req.params;
    try {
        if (!params.id) {
            return (0, utils_1.sendResponse)(res, 400, "Category Id not found");
        }
        const category = yield lib_1.db.mainCategory.findFirst({
            where: {
                id: params.id,
            },
        });
        if (!category) {
            return (0, utils_1.sendResponse)(res, 400, "Main Category not found");
        }
        const deleteCategory = yield lib_1.db.mainCategory.delete({
            where: {
                id: params.id,
            },
        });
        return (0, utils_1.sendResponse)(res, 200, "Delete main category successfully", deleteCategory);
    }
    catch (error) {
        return (0, utils_1.sendResponse)(res, 500, "[DELETE_MAIN_CATEGORY]: Internal Error", error === null || error === void 0 ? void 0 : error.message);
    }
}));
exports.deleteMainCategoryByIdController = deleteMainCategoryByIdController;
//----------------------------------------------
// get main category by id
//----------------------------------------------
const getMainCategoryByIdController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req === null || req === void 0 ? void 0 : req.params;
    try {
        if (!params.id) {
            return (0, utils_1.sendResponse)(res, 400, "Main Category Id not found");
        }
        const category = yield lib_1.db.mainCategory.findFirst({
            where: {
                id: params.id,
            },
        });
        if (!category) {
            return (0, utils_1.sendResponse)(res, 400, "Main Category not found");
        }
        return (0, utils_1.sendResponse)(res, 200, "Get main category by id successfully", category);
    }
    catch (error) {
        return (0, utils_1.sendResponse)(res, 500, "[GET_MAIN_CATEGORY_BY_ID]: Internal Error", error === null || error === void 0 ? void 0 : error.message);
    }
}));
exports.getMainCategoryByIdController = getMainCategoryByIdController;
//----------------------------------------------
// update main category by id
//----------------------------------------------
const updateMainCategoryByIdController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req === null || req === void 0 ? void 0 : req.params;
    const body = req === null || req === void 0 ? void 0 : req.body;
    try {
        if (!params.id) {
            return (0, utils_1.sendResponse)(res, 400, "Main Category Id not found");
        }
        const category = yield lib_1.db.mainCategory.findFirst({
            where: {
                id: params.id,
            },
        });
        if (!category) {
            return (0, utils_1.sendResponse)(res, 400, "Main Category not found");
        }
        const slug = yield (0, utils_1.generateSlug)(body === null || body === void 0 ? void 0 : body.title);
        const checkSlug = yield lib_1.db.mainCategory.findFirst({
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
        const categoryUpdate = yield lib_1.db.mainCategory.update({
            where: {
                id: params.id,
            },
            data: {
                title: body === null || body === void 0 ? void 0 : body.title,
                slug: slug,
            },
        });
        return (0, utils_1.sendResponse)(res, 200, "Update main category by id successfully", categoryUpdate);
    }
    catch (error) {
        return (0, utils_1.sendResponse)(res, 500, "[UPDATE_MAIN_CATEGORY_BY_ID]: Internal Error", error === null || error === void 0 ? void 0 : error.message);
    }
}));
exports.updateMainCategoryByIdController = updateMainCategoryByIdController;
