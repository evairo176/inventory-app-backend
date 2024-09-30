"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.brandsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const middleware_1 = require("../../middleware");
const form_schema_1 = require("../../form-schema");
const controller_1 = require("../../controller");
exports.brandsRoutes = express_1.default.Router();
// create category
exports.brandsRoutes.post("/", (0, middleware_1.validate)(form_schema_1.addBrandSchema), controller_1.addBrandController);
// create bulk category
exports.brandsRoutes.post("/bulk", controller_1.createBulkBrandsController);
// get all category
exports.brandsRoutes.get("/", controller_1.getAllBrandController);
// delete category
exports.brandsRoutes.delete("/:id", controller_1.deleteBrandByIdController);
// get category by id
exports.brandsRoutes.get("/:id", controller_1.getBrandByIdController);
// update category by id
exports.brandsRoutes.put("/:id", (0, middleware_1.validate)(form_schema_1.updateBrandSchema), controller_1.updateBrandByIdController);
