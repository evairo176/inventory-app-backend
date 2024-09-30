"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.suppliersRoutes = void 0;
const express_1 = __importDefault(require("express"));
const controller_1 = require("../../controller");
const middleware_1 = require("../../middleware");
const form_schema_1 = require("../../form-schema");
exports.suppliersRoutes = express_1.default.Router();
// create supplier
exports.suppliersRoutes.post("/", (0, middleware_1.validate)(form_schema_1.addSupplierSchema), controller_1.addSupplierController);
// create bulk supplier
exports.suppliersRoutes.post("/bulk", controller_1.createBulkSuppliersController);
// get all supplier
exports.suppliersRoutes.get("/", controller_1.getAllSupplierController);
// delete supplier
exports.suppliersRoutes.delete("/:id", controller_1.deleteSupplierByIdController);
// get supplier by id
exports.suppliersRoutes.get("/:id", controller_1.getSupplierByIdController);
// update supplier by id
exports.suppliersRoutes.put("/:id", (0, middleware_1.validate)(form_schema_1.updateSupplierSchema), controller_1.updateSupplierByIdController);
