"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.warehousesRoutes = void 0;
const express_1 = __importDefault(require("express"));
const warehouse_controller_1 = require("../controller/warehouse-controller");
const middleware_1 = require("../middleware");
const validation_request_schema_1 = require("../lib/validation-request-schema");
exports.warehousesRoutes = express_1.default.Router();
// create warehouse
exports.warehousesRoutes.post("/", (0, middleware_1.validate)(validation_request_schema_1.addWarehouseSchema), warehouse_controller_1.addWarehouseController);
// create bulk warehouse
exports.warehousesRoutes.post("/bulk", warehouse_controller_1.createBulkWarehousesController);
// get all warehouse
exports.warehousesRoutes.get("/", warehouse_controller_1.getAllWarehouseController);
// delete warehouse
exports.warehousesRoutes.delete("/:id", warehouse_controller_1.deleteWarehouseByIdController);
// get warehouse by id
exports.warehousesRoutes.get("/:id", warehouse_controller_1.getWarehouseByIdController);
// update warehouse by id
exports.warehousesRoutes.put("/:id", (0, middleware_1.validate)(validation_request_schema_1.updateWarehouseSchema), warehouse_controller_1.updateWarehouseByIdController);
