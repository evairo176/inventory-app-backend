"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unitsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const middleware_1 = require("../middleware");
const validation_request_schema_1 = require("../lib/validation-request-schema");
const unit_controller_1 = require("../controller/unit-controller");
exports.unitsRoutes = express_1.default.Router();
// create category
exports.unitsRoutes.post("/", (0, middleware_1.validate)(validation_request_schema_1.addUnitSchema), unit_controller_1.addUnitController);
// create bulk category
exports.unitsRoutes.post("/bulk", unit_controller_1.createBulkUnitsController);
// get all category
exports.unitsRoutes.get("/", unit_controller_1.getAllUnitController);
// delete category
exports.unitsRoutes.delete("/:id", unit_controller_1.deleteUnitByIdController);
// get category by id
exports.unitsRoutes.get("/:id", unit_controller_1.getUnitByIdController);
// update category by id
exports.unitsRoutes.put("/:id", (0, middleware_1.validate)(validation_request_schema_1.updateUnitSchema), unit_controller_1.updateUnitByIdController);
