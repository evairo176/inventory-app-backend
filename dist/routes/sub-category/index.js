"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subCategoriesRoutes = void 0;
const express_1 = __importDefault(require("express"));
const controller_1 = require("../../controller");
const middleware_1 = require("../../middleware");
const form_schema_1 = require("../../form-schema");
exports.subCategoriesRoutes = express_1.default.Router();
// create category
exports.subCategoriesRoutes.post("/", (0, middleware_1.validate)(form_schema_1.addSubCategorySchema), controller_1.addSubCategoryController);
// create bulk category
exports.subCategoriesRoutes.post("/bulk", controller_1.createBulkSubCategoryController);
// get all category
exports.subCategoriesRoutes.get("/", controller_1.getAllSubCategoryController);
// delete category
exports.subCategoriesRoutes.delete("/:id", controller_1.deleteSubCategoryByIdController);
// get category by id
exports.subCategoriesRoutes.get("/:id", controller_1.getSubCategoryByIdController);
// update category by id
exports.subCategoriesRoutes.put("/:id", (0, middleware_1.validate)(form_schema_1.updateSubCategorySchema), controller_1.updateSubCategoryByIdController);
