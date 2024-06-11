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
exports.updateWarehouseByIdController = exports.getWarehouseByIdController = exports.deleteWarehouseByIdController = exports.createBulkWarehousesController = exports.getAllWarehouseController = exports.addWarehouseController = void 0;
const send_response_1 = require("../utils/send-response");
const db_1 = require("../lib/db");
const generate_slug_1 = require("../utils/generate-slug");
const addWarehouseController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req === null || req === void 0 ? void 0 : req.body;
    try {
        const slug = (0, generate_slug_1.generateSlug)(body === null || body === void 0 ? void 0 : body.name);
        const checkSlug = yield db_1.db.warehouse.findFirst({
            where: {
                slug: slug,
            },
        });
        if (checkSlug) {
            return (0, send_response_1.sendResponse)(res, 400, "Slug is already exist");
        }
        const warehouse = yield db_1.db.warehouse.create({
            data: {
                name: body === null || body === void 0 ? void 0 : body.name,
                slug: slug,
                email: body === null || body === void 0 ? void 0 : body.email,
                phone: body === null || body === void 0 ? void 0 : body.phone,
                contactPerson: body === null || body === void 0 ? void 0 : body.contactPerson,
                country: body === null || body === void 0 ? void 0 : body.country,
                city: body === null || body === void 0 ? void 0 : body.city,
                zipCode: body === null || body === void 0 ? void 0 : body.zipCode,
                status: body === null || body === void 0 ? void 0 : body.status,
                imageUrl: body === null || body === void 0 ? void 0 : body.imageUrl,
            },
        });
        return (0, send_response_1.sendResponse)(res, 200, "Create warehouse successfully", warehouse);
    }
    catch (error) {
        return (0, send_response_1.sendResponse)(res, 500, "[CREATE_WAREHOUSE]: Internal Error", error === null || error === void 0 ? void 0 : error.message);
    }
});
exports.addWarehouseController = addWarehouseController;
const getAllWarehouseController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const warehouse = yield db_1.db.warehouse.findMany({
            orderBy: {
                updatedAt: "desc",
            },
            where: {
                status: {
                    not: "DELETED",
                },
            },
        });
        if (!warehouse) {
            return (0, send_response_1.sendResponse)(res, 400, "Warehouse not found!");
        }
        return (0, send_response_1.sendResponse)(res, 200, "Get all warehouse successfully", warehouse);
    }
    catch (error) {
        return (0, send_response_1.sendResponse)(res, 500, "[GET_ALL_WAREHOUSE]: Internal Error", error === null || error === void 0 ? void 0 : error.message);
    }
});
exports.getAllWarehouseController = getAllWarehouseController;
const createBulkWarehousesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req === null || req === void 0 ? void 0 : req.body;
        let warehouses = [];
        for (const warehouse of body === null || body === void 0 ? void 0 : body.warehouses) {
            const newWarehouse = yield addWarehouse(warehouse);
            warehouses.push(newWarehouse);
        }
        return (0, send_response_1.sendResponse)(res, 200, "Create Bulk warehouse successfully", warehouses);
    }
    catch (error) {
        return (0, send_response_1.sendResponse)(res, 500, "[CREATE_BULK_WAREHOUSE]: Internal Error", error === null || error === void 0 ? void 0 : error.message);
    }
});
exports.createBulkWarehousesController = createBulkWarehousesController;
const addWarehouse = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const slug = (0, generate_slug_1.generateSlug)(data === null || data === void 0 ? void 0 : data.name);
        const checkSlug = yield db_1.db.warehouse.findFirst({
            where: {
                slug: slug,
            },
        });
        if (checkSlug) {
            return {
                name: data.name,
                status_upload: "Error",
            };
        }
        const warehouse = yield db_1.db.warehouse.create({
            data: {
                name: data === null || data === void 0 ? void 0 : data.name,
                email: data === null || data === void 0 ? void 0 : data.email,
                phone: data === null || data === void 0 ? void 0 : data.phone,
                contactPerson: data === null || data === void 0 ? void 0 : data.contactPerson,
                country: data === null || data === void 0 ? void 0 : data.country,
                city: data === null || data === void 0 ? void 0 : data.city,
                zipCode: data === null || data === void 0 ? void 0 : data.zipCode,
                slug: slug,
                imageUrl: data === null || data === void 0 ? void 0 : data.imageUrl,
                status: "ACTIVE",
            },
        });
        return warehouse;
    }
    catch (error) {
        return null;
    }
});
const deleteWarehouseByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req === null || req === void 0 ? void 0 : req.params;
    try {
        if (!params.id) {
            return (0, send_response_1.sendResponse)(res, 400, "Warehouse Id not found");
        }
        const warehouse = yield db_1.db.warehouse.findFirst({
            where: {
                id: params.id,
            },
        });
        if (!warehouse) {
            return (0, send_response_1.sendResponse)(res, 400, "Warehouse not found");
        }
        const deleteWarehouse = yield db_1.db.warehouse.delete({
            where: {
                id: params.id,
            },
        });
        return (0, send_response_1.sendResponse)(res, 200, "Delete warehouse successfully", deleteWarehouse);
    }
    catch (error) {
        return (0, send_response_1.sendResponse)(res, 500, "[DELETE_WAREHOUSE]: Internal Error", error === null || error === void 0 ? void 0 : error.message);
    }
});
exports.deleteWarehouseByIdController = deleteWarehouseByIdController;
const getWarehouseByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req === null || req === void 0 ? void 0 : req.params;
    try {
        if (!params.id) {
            return (0, send_response_1.sendResponse)(res, 400, "Warehouse Id not found");
        }
        const warehouse = yield db_1.db.warehouse.findFirst({
            where: {
                id: params.id,
            },
        });
        if (!warehouse) {
            return (0, send_response_1.sendResponse)(res, 400, "Warehouse not found");
        }
        return (0, send_response_1.sendResponse)(res, 200, "Get warehouse by id successfully", warehouse);
    }
    catch (error) {
        return (0, send_response_1.sendResponse)(res, 500, "[GET_WAREHOUSE_BY_ID]: Internal Error", error === null || error === void 0 ? void 0 : error.message);
    }
});
exports.getWarehouseByIdController = getWarehouseByIdController;
const updateWarehouseByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req === null || req === void 0 ? void 0 : req.params;
    const body = req === null || req === void 0 ? void 0 : req.body;
    try {
        if (!params.id) {
            return (0, send_response_1.sendResponse)(res, 400, "Warehouse Id not found");
        }
        const warehouse = yield db_1.db.warehouse.findFirst({
            where: {
                id: params.id,
            },
        });
        if (!warehouse) {
            return (0, send_response_1.sendResponse)(res, 400, "Warehouse not found");
        }
        const slug = (0, generate_slug_1.generateSlug)(body === null || body === void 0 ? void 0 : body.name);
        const checkSlug = yield db_1.db.warehouse.findFirst({
            where: {
                slug: slug,
                NOT: {
                    id: params.id, // Exclude the current warehouse from the check
                },
            },
        });
        if (checkSlug) {
            return (0, send_response_1.sendResponse)(res, 400, "Slug is already exist");
        }
        const warehouseUpdate = yield db_1.db.warehouse.update({
            where: {
                id: params.id,
            },
            data: {
                name: body === null || body === void 0 ? void 0 : body.name,
                email: body === null || body === void 0 ? void 0 : body.email,
                phone: body === null || body === void 0 ? void 0 : body.phone,
                contactPerson: body === null || body === void 0 ? void 0 : body.contactPerson,
                country: body === null || body === void 0 ? void 0 : body.country,
                city: body === null || body === void 0 ? void 0 : body.city,
                zipCode: body === null || body === void 0 ? void 0 : body.zipCode,
                slug: slug,
                imageUrl: body === null || body === void 0 ? void 0 : body.imageUrl,
                status: body === null || body === void 0 ? void 0 : body.status,
            },
        });
        return (0, send_response_1.sendResponse)(res, 200, "Update warehouse by id successfully", warehouseUpdate);
    }
    catch (error) {
        return (0, send_response_1.sendResponse)(res, 500, "[UPDATE_WAREHOUSE_BY_ID]: Internal Error", error === null || error === void 0 ? void 0 : error.message);
    }
});
exports.updateWarehouseByIdController = updateWarehouseByIdController;
