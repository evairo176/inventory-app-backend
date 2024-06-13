"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.suppliersRoutes = void 0;
const express_1 = __importDefault(require("express"));
const supplier_controller_1 = require("../controller/supplier-controller");
const middleware_1 = require("../middleware");
const validation_request_schema_1 = require("../lib/validation-request-schema");
exports.suppliersRoutes = express_1.default.Router();
// create supplier
exports.suppliersRoutes.post("/", (0, middleware_1.validate)(validation_request_schema_1.addSupplierSchema), supplier_controller_1.addSupplierController);
// create bulk supplier
exports.suppliersRoutes.post("/bulk", supplier_controller_1.createBulkSuppliersController);
// get all supplier
exports.suppliersRoutes.get("/", supplier_controller_1.getAllSupplierController);
// delete supplier
exports.suppliersRoutes.delete("/:id", supplier_controller_1.deleteSupplierByIdController);
// get supplier by id
exports.suppliersRoutes.get("/:id", supplier_controller_1.getSupplierByIdController);
// update supplier by id
exports.suppliersRoutes.put("/:id", (0, middleware_1.validate)(validation_request_schema_1.updateSupplierSchema), supplier_controller_1.updateSupplierByIdController);
