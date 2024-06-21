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
exports.updateSupplierByIdController = exports.getSupplierByIdController = exports.deleteSupplierByIdController = exports.createBulkSuppliersController = exports.getAllSupplierController = exports.addSupplierController = void 0;
const send_response_1 = require("../utils/send-response");
const db_1 = require("../lib/db");
const addSupplierController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req === null || req === void 0 ? void 0 : req.body;
    try {
        const checkSupplierExist = yield db_1.db.supplier.findFirst({
            where: {
                email: body === null || body === void 0 ? void 0 : body.email,
            },
        });
        if (checkSupplierExist) {
            return (0, send_response_1.sendResponse)(res, 400, "Email is already exist");
        }
        const supplier = yield db_1.db.supplier.create({
            data: {
                name: body === null || body === void 0 ? void 0 : body.name,
                companyName: body === null || body === void 0 ? void 0 : body.companyName,
                vatNumber: body === null || body === void 0 ? void 0 : body.vatNumber,
                imageUrl: body === null || body === void 0 ? void 0 : body.imageUrl,
                address: body === null || body === void 0 ? void 0 : body.address,
                email: body === null || body === void 0 ? void 0 : body.email,
                phone: body === null || body === void 0 ? void 0 : body.phone,
                country: body === null || body === void 0 ? void 0 : body.country,
                state: body === null || body === void 0 ? void 0 : body.state,
                city: body === null || body === void 0 ? void 0 : body.city,
                postalCode: body === null || body === void 0 ? void 0 : body.postalCode,
                status: body === null || body === void 0 ? void 0 : body.status,
            },
        });
        return (0, send_response_1.sendResponse)(res, 200, "Create supplier successfully", supplier);
    }
    catch (error) {
        return (0, send_response_1.sendResponse)(res, 500, "[CREATE_SUPPLIER]: Internal Error", error === null || error === void 0 ? void 0 : error.message);
    }
});
exports.addSupplierController = addSupplierController;
const getAllSupplierController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const supplier = yield db_1.db.supplier.findMany({
            orderBy: {
                updatedAt: "desc",
            },
            // where: {
            //   status: {
            //     not: "DELETED",
            //   },
            // },
        });
        if (!supplier) {
            return (0, send_response_1.sendResponse)(res, 400, "Supplier not found!");
        }
        return (0, send_response_1.sendResponse)(res, 200, "Get all supplier successfully", supplier);
    }
    catch (error) {
        return (0, send_response_1.sendResponse)(res, 500, "[GET_ALL_SUPPLIER]: Internal Error", error === null || error === void 0 ? void 0 : error.message);
    }
});
exports.getAllSupplierController = getAllSupplierController;
const createBulkSuppliersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req === null || req === void 0 ? void 0 : req.body;
        let suppliers = [];
        for (const supplier of body === null || body === void 0 ? void 0 : body.suppliers) {
            const newSupplier = yield addSupplier(supplier);
            suppliers.push(newSupplier);
        }
        return (0, send_response_1.sendResponse)(res, 200, "Create Bulk supplier successfully", suppliers);
    }
    catch (error) {
        return (0, send_response_1.sendResponse)(res, 500, "[CREATE_BULK_SUPPLIER]: Internal Error", error === null || error === void 0 ? void 0 : error.message);
    }
});
exports.createBulkSuppliersController = createBulkSuppliersController;
const addSupplier = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const checkSupplierExist = yield db_1.db.supplier.findFirst({
            where: {
                email: data === null || data === void 0 ? void 0 : data.email,
            },
        });
        if (checkSupplierExist) {
            return {
                name: data.name,
                status_upload: "Error",
            };
        }
        const supplier = yield db_1.db.supplier.create({
            data: {
                name: data === null || data === void 0 ? void 0 : data.name,
                companyName: data === null || data === void 0 ? void 0 : data.companyName,
                vatNumber: data === null || data === void 0 ? void 0 : data.vatNumber,
                imageUrl: data === null || data === void 0 ? void 0 : data.imageUrl,
                address: data === null || data === void 0 ? void 0 : data.address,
                email: data === null || data === void 0 ? void 0 : data.email,
                phone: data === null || data === void 0 ? void 0 : data.phone,
                country: data === null || data === void 0 ? void 0 : data.country,
                state: data === null || data === void 0 ? void 0 : data.state,
                city: data === null || data === void 0 ? void 0 : data.city,
                postalCode: data === null || data === void 0 ? void 0 : data.postalCode,
                status: data === null || data === void 0 ? void 0 : data.status,
            },
        });
        return {
            title: supplier.name,
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
const deleteSupplierByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req === null || req === void 0 ? void 0 : req.params;
    try {
        if (!params.id) {
            return (0, send_response_1.sendResponse)(res, 400, "Supplier Id not found");
        }
        const supplier = yield db_1.db.supplier.findFirst({
            where: {
                id: params.id,
            },
        });
        if (!supplier) {
            return (0, send_response_1.sendResponse)(res, 400, "Supplier not found");
        }
        const deleteSupplier = yield db_1.db.supplier.delete({
            where: {
                id: params.id,
            },
        });
        return (0, send_response_1.sendResponse)(res, 200, "Delete supplier successfully", deleteSupplier);
    }
    catch (error) {
        return (0, send_response_1.sendResponse)(res, 500, "[DELETE_SUPPLIER]: Internal Error", error === null || error === void 0 ? void 0 : error.message);
    }
});
exports.deleteSupplierByIdController = deleteSupplierByIdController;
const getSupplierByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req === null || req === void 0 ? void 0 : req.params;
    try {
        if (!params.id) {
            return (0, send_response_1.sendResponse)(res, 400, "Supplier Id not found");
        }
        const supplier = yield db_1.db.supplier.findFirst({
            where: {
                id: params.id,
            },
        });
        if (!supplier) {
            return (0, send_response_1.sendResponse)(res, 400, "Supplier not found");
        }
        return (0, send_response_1.sendResponse)(res, 200, "Get supplier by id successfully", supplier);
    }
    catch (error) {
        return (0, send_response_1.sendResponse)(res, 500, "[GET_SUPPLIER_BY_ID]: Internal Error", error === null || error === void 0 ? void 0 : error.message);
    }
});
exports.getSupplierByIdController = getSupplierByIdController;
const updateSupplierByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req === null || req === void 0 ? void 0 : req.params;
    const body = req === null || req === void 0 ? void 0 : req.body;
    try {
        if (!params.id) {
            return (0, send_response_1.sendResponse)(res, 400, "Supplier Id not found");
        }
        const supplier = yield db_1.db.supplier.findFirst({
            where: {
                id: params.id,
            },
        });
        if (!supplier) {
            return (0, send_response_1.sendResponse)(res, 400, "Supplier not found");
        }
        const checkSupplierExist = yield db_1.db.supplier.findFirst({
            where: {
                email: body === null || body === void 0 ? void 0 : body.email,
                NOT: {
                    id: params.id, // Exclude the current supplier from the check
                },
            },
        });
        if (checkSupplierExist) {
            return (0, send_response_1.sendResponse)(res, 400, "Slug is already exist");
        }
        const supplierUpdate = yield db_1.db.supplier.update({
            where: {
                id: params.id,
            },
            data: {
                name: body === null || body === void 0 ? void 0 : body.name,
                companyName: body === null || body === void 0 ? void 0 : body.companyName,
                vatNumber: body === null || body === void 0 ? void 0 : body.vatNumber,
                imageUrl: body === null || body === void 0 ? void 0 : body.imageUrl,
                address: body === null || body === void 0 ? void 0 : body.address,
                email: body === null || body === void 0 ? void 0 : body.email,
                phone: body === null || body === void 0 ? void 0 : body.phone,
                country: body === null || body === void 0 ? void 0 : body.country,
                state: body === null || body === void 0 ? void 0 : body.state,
                city: body === null || body === void 0 ? void 0 : body.city,
                postalCode: body === null || body === void 0 ? void 0 : body.postalCode,
                status: body === null || body === void 0 ? void 0 : body.status,
            },
        });
        return (0, send_response_1.sendResponse)(res, 200, "Update supplier by id successfully", supplierUpdate);
    }
    catch (error) {
        return (0, send_response_1.sendResponse)(res, 500, "[UPDATE_SUPPLIER_BY_ID]: Internal Error", error === null || error === void 0 ? void 0 : error.message);
    }
});
exports.updateSupplierByIdController = updateSupplierByIdController;
