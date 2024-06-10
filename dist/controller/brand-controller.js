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
exports.updateBrandByIdController = exports.getBrandByIdController = exports.deleteBrandByIdController = exports.createBulkBrandsController = exports.getAllBrandController = exports.addBrandController = void 0;
const send_response_1 = require("../utils/send-response");
const db_1 = require("../lib/db");
const generate_slug_1 = require("../utils/generate-slug");
const addBrandController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const brand = yield db_1.db.brand.create({
            data: {
                title: body === null || body === void 0 ? void 0 : body.title,
                status: body === null || body === void 0 ? void 0 : body.status,
                slug: slug,
                imageUrl: body === null || body === void 0 ? void 0 : body.imageUrl,
            },
        });
        return (0, send_response_1.sendResponse)(res, 200, "Create brand successfully", brand);
    }
    catch (error) {
        return (0, send_response_1.sendResponse)(res, 500, "[CREATE_BRAND]: Internal Error", error);
    }
});
exports.addBrandController = addBrandController;
const getAllBrandController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const brand = yield db_1.db.brand.findMany({
            orderBy: {
                updatedAt: "desc",
            },
            where: {
                status: {
                    not: "DELETED",
                },
            },
        });
        if (!brand) {
            return (0, send_response_1.sendResponse)(res, 400, "Brand not found!");
        }
        return (0, send_response_1.sendResponse)(res, 200, "Get all category successfully", brand);
    }
    catch (error) {
        return (0, send_response_1.sendResponse)(res, 500, "[GET_ALL_BRAND]: Internal Error", error);
    }
});
exports.getAllBrandController = getAllBrandController;
const createBulkBrandsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req === null || req === void 0 ? void 0 : req.body;
        console.log({ body });
        let brands = [];
        for (const brand of body === null || body === void 0 ? void 0 : body.brands) {
            const newBrand = yield addBrand(brand);
            brands.push(newBrand);
        }
        return (0, send_response_1.sendResponse)(res, 200, "Create Bulk brand successfully", brands);
    }
    catch (error) {
        return (0, send_response_1.sendResponse)(res, 500, "[CREATE_BULK_BRAND]: Internal Error", error);
    }
});
exports.createBulkBrandsController = createBulkBrandsController;
const addBrand = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const slug = (0, generate_slug_1.generateSlug)(data === null || data === void 0 ? void 0 : data.title);
        const checkSlug = yield db_1.db.brand.findFirst({
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
        const brand = yield db_1.db.brand.create({
            data: {
                title: data === null || data === void 0 ? void 0 : data.title,
                slug: slug,
                imageUrl: data === null || data === void 0 ? void 0 : data.image,
                status: "ACTIVE",
            },
        });
        return brand;
    }
    catch (error) {
        return null;
    }
});
const deleteBrandByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req === null || req === void 0 ? void 0 : req.params;
    try {
        if (!params.id) {
            return (0, send_response_1.sendResponse)(res, 400, "Brand Id not found");
        }
        const brand = yield db_1.db.brand.findFirst({
            where: {
                id: params.id,
            },
        });
        if (!brand) {
            return (0, send_response_1.sendResponse)(res, 400, "Brand not found");
        }
        const deleteBrand = yield db_1.db.brand.update({
            where: {
                id: params.id,
            },
            data: {
                status: "DELETED",
            },
        });
        return (0, send_response_1.sendResponse)(res, 200, "Delete brand successfully", deleteBrand);
    }
    catch (error) {
        return (0, send_response_1.sendResponse)(res, 500, "[DELETE_BRAND]: Internal Error", error);
    }
});
exports.deleteBrandByIdController = deleteBrandByIdController;
const getBrandByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req === null || req === void 0 ? void 0 : req.params;
    try {
        if (!params.id) {
            return (0, send_response_1.sendResponse)(res, 400, "Brand Id not found");
        }
        const brand = yield db_1.db.brand.findFirst({
            where: {
                id: params.id,
            },
        });
        if (!brand) {
            return (0, send_response_1.sendResponse)(res, 400, "Brand not found");
        }
        return (0, send_response_1.sendResponse)(res, 200, "Get brand by id successfully", brand);
    }
    catch (error) {
        return (0, send_response_1.sendResponse)(res, 500, "[GET_BRAND_BY_ID]: Internal Error", error);
    }
});
exports.getBrandByIdController = getBrandByIdController;
const updateBrandByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req === null || req === void 0 ? void 0 : req.params;
    const body = req === null || req === void 0 ? void 0 : req.body;
    try {
        if (!params.id) {
            return (0, send_response_1.sendResponse)(res, 400, "Brand Id not found");
        }
        const brand = yield db_1.db.brand.findFirst({
            where: {
                id: params.id,
            },
        });
        if (!brand) {
            return (0, send_response_1.sendResponse)(res, 400, "Brand not found");
        }
        const slug = (0, generate_slug_1.generateSlug)(body === null || body === void 0 ? void 0 : body.title);
        const checkSlug = yield db_1.db.brand.findFirst({
            where: {
                slug: slug,
                NOT: {
                    id: params.id, // Exclude the current category from the check
                },
            },
        });
        if (checkSlug) {
            return (0, send_response_1.sendResponse)(res, 400, "Slug is already exist");
        }
        const brandUpdate = yield db_1.db.brand.update({
            where: {
                id: params.id,
            },
            data: {
                title: body === null || body === void 0 ? void 0 : body.title,
                slug: slug,
                imageUrl: body === null || body === void 0 ? void 0 : body.imageUrl,
                status: body === null || body === void 0 ? void 0 : body.status,
            },
        });
        return (0, send_response_1.sendResponse)(res, 200, "Update brand by id successfully", brandUpdate);
    }
    catch (error) {
        return (0, send_response_1.sendResponse)(res, 500, "[UPDATE_BRAND_BY_ID]: Internal Error", error);
    }
});
exports.updateBrandByIdController = updateBrandByIdController;
