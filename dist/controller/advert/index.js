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
exports.updateAdvertByIdController = exports.getAdvertByIdController = exports.deleteAdvertByIdController = exports.createBulkAdvertController = exports.getAllAdvertController = exports.addAdvertController = void 0;
const utils_1 = require("../../utils");
const lib_1 = require("../../lib");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
//----------------------------------------------
// add advert
//----------------------------------------------
const addAdvertController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req === null || req === void 0 ? void 0 : req.body;
    console.log({ body });
    try {
        const advert = yield lib_1.db.advert.create({
            data: Object.assign(Object.assign({}, body), { status: (body === null || body === void 0 ? void 0 : body.status) === "ACTIVE" ? true : false, type: body === null || body === void 0 ? void 0 : body.type, size: body === null || body === void 0 ? void 0 : body.size }),
        });
        return (0, utils_1.sendResponse)(res, 200, "Create advert successfully", advert);
    }
    catch (error) {
        console.log(error);
        return (0, utils_1.sendResponse)(res, 500, "[CREATE_ADVERT]: Internal Error", error === null || error === void 0 ? void 0 : error.message);
    }
}));
exports.addAdvertController = addAdvertController;
//----------------------------------------------
// get all advert by id
//----------------------------------------------
const getAllAdvertController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const advert = yield lib_1.db.advert.findMany({
            orderBy: {
                updatedAt: "desc",
            },
        });
        if (!advert) {
            return (0, utils_1.sendResponse)(res, 400, "Advert not found!");
        }
        return (0, utils_1.sendResponse)(res, 200, "Get all advert successfully", advert);
    }
    catch (error) {
        return (0, utils_1.sendResponse)(res, 500, "[GET_ALL_ADVERT: Internal Error", error === null || error === void 0 ? void 0 : error.message);
    }
}));
exports.getAllAdvertController = getAllAdvertController;
//----------------------------------------------
// add bulk advert
//----------------------------------------------
const createBulkAdvertController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req === null || req === void 0 ? void 0 : req.body;
        let adverts = [];
        for (const advert of body === null || body === void 0 ? void 0 : body.adverts) {
            const newAdvert = yield addAdvert(advert);
            adverts.push(newAdvert);
        }
        return (0, utils_1.sendResponse)(res, 200, "Create Bulk advert successfully", adverts);
    }
    catch (error) {
        return (0, utils_1.sendResponse)(res, 500, "[CREATE_BULK_ADVERT]: Internal Error", error === null || error === void 0 ? void 0 : error.message);
    }
}));
exports.createBulkAdvertController = createBulkAdvertController;
const addAdvert = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const status = data === null || data === void 0 ? void 0 : data.status;
        const advert = yield lib_1.db.advert.create({
            data: Object.assign(Object.assign({}, data), { status: status === "ACTIVE" ? true : false }),
        });
        return {
            title: advert.title,
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
// delete advert by id
//----------------------------------------------
const deleteAdvertByIdController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req === null || req === void 0 ? void 0 : req.params;
    try {
        if (!params.id) {
            return (0, utils_1.sendResponse)(res, 400, "Advert Id not found");
        }
        const advert = yield lib_1.db.advert.findFirst({
            where: {
                id: params.id,
            },
        });
        if (!advert) {
            return (0, utils_1.sendResponse)(res, 400, "Advert not found");
        }
        const deleteAdvert = yield lib_1.db.advert.delete({
            where: {
                id: params.id,
            },
        });
        return (0, utils_1.sendResponse)(res, 200, "Delete advert successfully", deleteAdvert);
    }
    catch (error) {
        return (0, utils_1.sendResponse)(res, 500, "[DELETE_ADVERT]: Internal Error", error === null || error === void 0 ? void 0 : error.message);
    }
}));
exports.deleteAdvertByIdController = deleteAdvertByIdController;
//----------------------------------------------
// get advert by id
//----------------------------------------------
const getAdvertByIdController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req === null || req === void 0 ? void 0 : req.params;
    try {
        if (!params.id) {
            return (0, utils_1.sendResponse)(res, 400, "Advert Id not found");
        }
        const advert = yield lib_1.db.advert.findFirst({
            where: {
                id: params.id,
            },
        });
        if (!advert) {
            return (0, utils_1.sendResponse)(res, 400, "Advert not found");
        }
        return (0, utils_1.sendResponse)(res, 200, "Get advert by id successfully", advert);
    }
    catch (error) {
        return (0, utils_1.sendResponse)(res, 500, "[GET_ADVERT_BY_ID]: Internal Error", error === null || error === void 0 ? void 0 : error.message);
    }
}));
exports.getAdvertByIdController = getAdvertByIdController;
//----------------------------------------------
// update advert by id
//----------------------------------------------
const updateAdvertByIdController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req === null || req === void 0 ? void 0 : req.params;
    const body = req === null || req === void 0 ? void 0 : req.body;
    try {
        if (!params.id) {
            return (0, utils_1.sendResponse)(res, 400, "Advert Id not found");
        }
        const advert = yield lib_1.db.advert.findFirst({
            where: {
                id: params.id,
            },
        });
        if (!advert) {
            return (0, utils_1.sendResponse)(res, 400, "Advert not found");
        }
        const advertUpdate = yield lib_1.db.advert.update({
            where: {
                id: params.id,
            },
            data: Object.assign(Object.assign({}, body), { status: (body === null || body === void 0 ? void 0 : body.status) === "ACTIVE" ? true : false }),
        });
        return (0, utils_1.sendResponse)(res, 200, "Update advert by id successfully", advertUpdate);
    }
    catch (error) {
        return (0, utils_1.sendResponse)(res, 500, "[UPDATE_ADVERT_BY_ID]: Internal Error", error === null || error === void 0 ? void 0 : error.message);
    }
}));
exports.updateAdvertByIdController = updateAdvertByIdController;
