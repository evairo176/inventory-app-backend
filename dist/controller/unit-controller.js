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
exports.updateUnitByIdController = exports.getUnitByIdController = exports.deleteUnitByIdController = exports.createBulkUnitsController = exports.getAllUnitController = exports.addUnitController = void 0;
const send_response_1 = require("../utils/send-response");
const db_1 = require("../lib/db");
const addUnitController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req === null || req === void 0 ? void 0 : req.body;
    try {
        const checkAbbreviation = yield db_1.db.unit.findFirst({
            where: {
                abbreviation: body === null || body === void 0 ? void 0 : body.abbreviation,
            },
        });
        if (checkAbbreviation) {
            return (0, send_response_1.sendResponse)(res, 400, "Abbreviation is already exist");
        }
        const unit = yield db_1.db.unit.create({
            data: {
                title: body === null || body === void 0 ? void 0 : body.title,
                abbreviation: body === null || body === void 0 ? void 0 : body.abbreviation,
            },
        });
        return (0, send_response_1.sendResponse)(res, 200, "Create unit successfully", unit);
    }
    catch (error) {
        return (0, send_response_1.sendResponse)(res, 500, "[CREATE_UNIT]: Internal Error", error === null || error === void 0 ? void 0 : error.message);
    }
});
exports.addUnitController = addUnitController;
const getAllUnitController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const unit = yield db_1.db.unit.findMany({
            orderBy: {
                updatedAt: "desc",
            },
        });
        if (!unit) {
            return (0, send_response_1.sendResponse)(res, 400, "Unit not found!");
        }
        return (0, send_response_1.sendResponse)(res, 200, "Get all unit successfully", unit);
    }
    catch (error) {
        return (0, send_response_1.sendResponse)(res, 500, "[GET_ALL_UNIT]: Internal Error", error === null || error === void 0 ? void 0 : error.message);
    }
});
exports.getAllUnitController = getAllUnitController;
const createBulkUnitsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req === null || req === void 0 ? void 0 : req.body;
        let units = [];
        for (const unit of body === null || body === void 0 ? void 0 : body.units) {
            const newUnit = yield addUnit(unit);
            units.push(newUnit);
        }
        return (0, send_response_1.sendResponse)(res, 200, "Create Bulk unit successfully", units);
    }
    catch (error) {
        return (0, send_response_1.sendResponse)(res, 500, "[CREATE_BULK_UNIT]: Internal Error", error === null || error === void 0 ? void 0 : error.message);
    }
});
exports.createBulkUnitsController = createBulkUnitsController;
const addUnit = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const checkAbbreviation = yield db_1.db.unit.findFirst({
            where: {
                abbreviation: data === null || data === void 0 ? void 0 : data.abbreviation,
            },
        });
        if (checkAbbreviation) {
            return {
                title: data.title,
                status_upload: "Error",
            };
        }
        const unit = yield db_1.db.unit.create({
            data: {
                title: data === null || data === void 0 ? void 0 : data.title,
                abbreviation: data === null || data === void 0 ? void 0 : data.abbreviation,
            },
        });
        return unit;
    }
    catch (error) {
        return null;
    }
});
const deleteUnitByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req === null || req === void 0 ? void 0 : req.params;
    try {
        if (!params.id) {
            return (0, send_response_1.sendResponse)(res, 400, "Unit Id not found");
        }
        const unit = yield db_1.db.unit.findFirst({
            where: {
                id: params.id,
            },
        });
        if (!unit) {
            return (0, send_response_1.sendResponse)(res, 400, "Unit not found");
        }
        const deleteUnit = yield db_1.db.unit.delete({
            where: {
                id: params.id,
            },
        });
        return (0, send_response_1.sendResponse)(res, 200, "Delete unit successfully", deleteUnit);
    }
    catch (error) {
        return (0, send_response_1.sendResponse)(res, 500, "[DELETE_UNIT]: Internal Error", error === null || error === void 0 ? void 0 : error.message);
    }
});
exports.deleteUnitByIdController = deleteUnitByIdController;
const getUnitByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req === null || req === void 0 ? void 0 : req.params;
    try {
        if (!params.id) {
            return (0, send_response_1.sendResponse)(res, 400, "Unit Id not found");
        }
        const unit = yield db_1.db.unit.findFirst({
            where: {
                id: params.id,
            },
        });
        if (!unit) {
            return (0, send_response_1.sendResponse)(res, 400, "Unit not found");
        }
        return (0, send_response_1.sendResponse)(res, 200, "Get unit by id successfully", unit);
    }
    catch (error) {
        return (0, send_response_1.sendResponse)(res, 500, "[GET_UNIT_BY_ID]: Internal Error", error === null || error === void 0 ? void 0 : error.message);
    }
});
exports.getUnitByIdController = getUnitByIdController;
const updateUnitByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req === null || req === void 0 ? void 0 : req.params;
    const body = req === null || req === void 0 ? void 0 : req.body;
    try {
        if (!params.id) {
            return (0, send_response_1.sendResponse)(res, 400, "Unit Id not found");
        }
        const unit = yield db_1.db.unit.findFirst({
            where: {
                id: params.id,
            },
        });
        if (!unit) {
            return (0, send_response_1.sendResponse)(res, 400, "Unit not found");
        }
        const checkAbbreviation = yield db_1.db.unit.findFirst({
            where: {
                abbreviation: body === null || body === void 0 ? void 0 : body.abbreviation,
            },
        });
        if (checkAbbreviation) {
            return (0, send_response_1.sendResponse)(res, 400, "Abbreviation is already exist");
        }
        const unitUpdate = yield db_1.db.unit.update({
            where: {
                id: params.id,
            },
            data: {
                title: body === null || body === void 0 ? void 0 : body.title,
                abbreviation: body === null || body === void 0 ? void 0 : body.abbreviation,
            },
        });
        return (0, send_response_1.sendResponse)(res, 200, "Update unit by id successfully", unitUpdate);
    }
    catch (error) {
        return (0, send_response_1.sendResponse)(res, 500, "[UPDATE_UNIT_BY_ID]: Internal Error", error);
    }
});
exports.updateUnitByIdController = updateUnitByIdController;
