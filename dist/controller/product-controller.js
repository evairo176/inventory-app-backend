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
exports.updateProductByIdController = exports.getProductByIdController = exports.deleteProductByIdController = exports.createBulkProductsController = exports.getAllProductController = exports.addProductController = void 0;
const send_response_1 = require("../utils/send-response");
const db_1 = require("../lib/db");
const generate_slug_1 = require("../utils/generate-slug");
const addProductController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req === null || req === void 0 ? void 0 : req.body;
    try {
        const slug = yield (0, generate_slug_1.generateSlug)(body === null || body === void 0 ? void 0 : body.name);
        const checkSlug = yield db_1.db.product.findFirst({
            where: {
                slug: slug,
            },
        });
        if (checkSlug) {
            return (0, send_response_1.sendResponse)(res, 400, "Slug is already exist");
        }
        const product = yield db_1.db.product.create({
            data: {
                name: body === null || body === void 0 ? void 0 : body.name,
                slug: slug,
                productCode: body === null || body === void 0 ? void 0 : body.productCode,
                stockQty: body === null || body === void 0 ? void 0 : body.stockQty,
                supplierId: body === null || body === void 0 ? void 0 : body.supplierId,
                warehouseId: body === null || body === void 0 ? void 0 : body.warehouseId,
                brandId: body === null || body === void 0 ? void 0 : body.brandId,
                categoryId: body === null || body === void 0 ? void 0 : body.categoryId,
                unitId: body === null || body === void 0 ? void 0 : body.unitId,
                productCost: body === null || body === void 0 ? void 0 : body.productCost,
                productPrice: body === null || body === void 0 ? void 0 : body.productPrice,
                alertQty: body === null || body === void 0 ? void 0 : body.alertQty,
                productTax: body === null || body === void 0 ? void 0 : body.productTax,
                taxMethod: body === null || body === void 0 ? void 0 : body.taxMethod,
                productImages: body === null || body === void 0 ? void 0 : body.productImages,
                productThumbnail: body === null || body === void 0 ? void 0 : body.productThumbnail,
                productDetails: body === null || body === void 0 ? void 0 : body.productDetails,
                status: body === null || body === void 0 ? void 0 : body.status,
            },
        });
        return (0, send_response_1.sendResponse)(res, 200, "Create product successfully", product);
    }
    catch (error) {
        return (0, send_response_1.sendResponse)(res, 500, "[CREATE_PRODUCT]: Internal Error", error === null || error === void 0 ? void 0 : error.message);
    }
});
exports.addProductController = addProductController;
const getAllProductController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield db_1.db.product.findMany({
            orderBy: {
                updatedAt: "desc",
            },
            where: {
                status: {
                    not: "DELETED",
                },
            },
        });
        if (!product) {
            return (0, send_response_1.sendResponse)(res, 400, "Product not found!");
        }
        return (0, send_response_1.sendResponse)(res, 200, "Get all product successfully", product);
    }
    catch (error) {
        return (0, send_response_1.sendResponse)(res, 500, "[GET_ALL_PRODUCT]: Internal Error", error === null || error === void 0 ? void 0 : error.message);
    }
});
exports.getAllProductController = getAllProductController;
const createBulkProductsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req === null || req === void 0 ? void 0 : req.body;
        console.log({ body });
        let products = [];
        for (const product of body === null || body === void 0 ? void 0 : body.products) {
            const newProduct = yield addProduct(product);
            products.push(newProduct);
        }
        return (0, send_response_1.sendResponse)(res, 200, "Create Bulk product successfully", products);
    }
    catch (error) {
        return (0, send_response_1.sendResponse)(res, 500, "[CREATE_BULK_PRODUCT]: Internal Error", error === null || error === void 0 ? void 0 : error.message);
    }
});
exports.createBulkProductsController = createBulkProductsController;
const addProduct = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const slug = yield (0, generate_slug_1.generateSlug)(data === null || data === void 0 ? void 0 : data.name);
        const checkSlug = yield db_1.db.product.findFirst({
            where: {
                slug: slug,
            },
        });
        if (checkSlug) {
            return {
                title: data.name,
                status_upload: "Error",
            };
        }
        const product = yield db_1.db.product.create({
            data: {
                name: data === null || data === void 0 ? void 0 : data.name,
                slug: slug,
                productCode: data === null || data === void 0 ? void 0 : data.productCode,
                stockQty: data === null || data === void 0 ? void 0 : data.stockQty,
                supplierId: data === null || data === void 0 ? void 0 : data.supplierId,
                warehouseId: data === null || data === void 0 ? void 0 : data.warehouseId,
                brandId: data === null || data === void 0 ? void 0 : data.brandId,
                categoryId: data === null || data === void 0 ? void 0 : data.categoryId,
                unitId: data === null || data === void 0 ? void 0 : data.unitId,
                productCost: data === null || data === void 0 ? void 0 : data.productCost,
                productPrice: data === null || data === void 0 ? void 0 : data.productPrice,
                alertQty: data === null || data === void 0 ? void 0 : data.alertQty,
                productTax: data === null || data === void 0 ? void 0 : data.productTax,
                taxMethod: data === null || data === void 0 ? void 0 : data.taxMethod,
                productImages: data === null || data === void 0 ? void 0 : data.productImages,
                productThumbnail: data === null || data === void 0 ? void 0 : data.productThumbnail,
                productDetails: data === null || data === void 0 ? void 0 : data.productDetails,
                status: data === null || data === void 0 ? void 0 : data.status,
            },
        });
        return {
            title: product.name,
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
const deleteProductByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req === null || req === void 0 ? void 0 : req.params;
    try {
        if (!params.id) {
            return (0, send_response_1.sendResponse)(res, 400, "Product Id not found");
        }
        const product = yield db_1.db.product.findFirst({
            where: {
                id: params.id,
            },
        });
        if (!product) {
            return (0, send_response_1.sendResponse)(res, 400, "Product not found");
        }
        const deleteProduct = yield db_1.db.product.delete({
            where: {
                id: params.id,
            },
        });
        return (0, send_response_1.sendResponse)(res, 200, "Delete product successfully", deleteProduct);
    }
    catch (error) {
        return (0, send_response_1.sendResponse)(res, 500, "[DELETE_PRODUCT]: Internal Error", error === null || error === void 0 ? void 0 : error.message);
    }
});
exports.deleteProductByIdController = deleteProductByIdController;
const getProductByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req === null || req === void 0 ? void 0 : req.params;
    try {
        if (!params.id) {
            return (0, send_response_1.sendResponse)(res, 400, "Product Id not found");
        }
        const product = yield db_1.db.product.findFirst({
            where: {
                id: params.id,
            },
        });
        if (!product) {
            return (0, send_response_1.sendResponse)(res, 400, "Product not found");
        }
        return (0, send_response_1.sendResponse)(res, 200, "Get product by id successfully", product);
    }
    catch (error) {
        return (0, send_response_1.sendResponse)(res, 500, "[GET_PRODUCT_BY_ID]: Internal Error", error === null || error === void 0 ? void 0 : error.message);
    }
});
exports.getProductByIdController = getProductByIdController;
const updateProductByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req === null || req === void 0 ? void 0 : req.params;
    const body = req === null || req === void 0 ? void 0 : req.body;
    try {
        if (!params.id) {
            return (0, send_response_1.sendResponse)(res, 400, "Product Id not found");
        }
        const product = yield db_1.db.product.findFirst({
            where: {
                id: params.id,
            },
        });
        if (!product) {
            return (0, send_response_1.sendResponse)(res, 400, "Product not found");
        }
        const slug = yield (0, generate_slug_1.generateSlug)(body === null || body === void 0 ? void 0 : body.name);
        const checkSlug = yield db_1.db.product.findFirst({
            where: {
                slug: slug,
                NOT: {
                    id: params.id, // Exclude the current product from the check
                },
            },
        });
        if (checkSlug) {
            return (0, send_response_1.sendResponse)(res, 400, "Slug is already exist");
        }
        const productUpdate = yield db_1.db.product.update({
            where: {
                id: params.id,
            },
            data: {
                name: body === null || body === void 0 ? void 0 : body.name,
                slug: slug,
                productCode: body === null || body === void 0 ? void 0 : body.productCode,
                stockQty: body === null || body === void 0 ? void 0 : body.stockQty,
                supplierId: body === null || body === void 0 ? void 0 : body.supplierId,
                warehouseId: body === null || body === void 0 ? void 0 : body.warehouseId,
                brandId: body === null || body === void 0 ? void 0 : body.brandId,
                categoryId: body === null || body === void 0 ? void 0 : body.categoryId,
                unitId: body === null || body === void 0 ? void 0 : body.unitId,
                productCost: body === null || body === void 0 ? void 0 : body.productCost,
                productPrice: body === null || body === void 0 ? void 0 : body.productPrice,
                alertQty: body === null || body === void 0 ? void 0 : body.alertQty,
                productTax: body === null || body === void 0 ? void 0 : body.productTax,
                taxMethod: body === null || body === void 0 ? void 0 : body.taxMethod,
                productImages: body === null || body === void 0 ? void 0 : body.productImages,
                productThumbnail: body === null || body === void 0 ? void 0 : body.productThumbnail,
                productDetails: body === null || body === void 0 ? void 0 : body.productDetails,
                status: body === null || body === void 0 ? void 0 : body.status,
            },
        });
        return (0, send_response_1.sendResponse)(res, 200, "Update product by id successfully", productUpdate);
    }
    catch (error) {
        return (0, send_response_1.sendResponse)(res, 500, "[UPDATE_PRODUCT_BY_ID]: Internal Error", error === null || error === void 0 ? void 0 : error.message);
    }
});
exports.updateProductByIdController = updateProductByIdController;
