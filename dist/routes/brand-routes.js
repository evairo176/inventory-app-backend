"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.brandsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const middleware_1 = require("../middleware");
const validation_request_schema_1 = require("../lib/validation-request-schema");
const brand_controller_1 = require("../controller/brand-controller");
exports.brandsRoutes = express_1.default.Router();
// create category
exports.brandsRoutes.post("/", (0, middleware_1.validate)(validation_request_schema_1.addBrandSchema), brand_controller_1.addBrandController);
// create bulk category
exports.brandsRoutes.post("/bulk", brand_controller_1.createBulkBrandsController);
// get all category
exports.brandsRoutes.get("/", brand_controller_1.getAllBrandController);
// delete category
exports.brandsRoutes.delete("/:id", brand_controller_1.deleteBrandByIdController);
// get category by id
exports.brandsRoutes.get("/:id", brand_controller_1.getBrandByIdController);
// update category by id
exports.brandsRoutes.put("/:id", (0, middleware_1.validate)(validation_request_schema_1.updateBrandSchema), brand_controller_1.updateBrandByIdController);
