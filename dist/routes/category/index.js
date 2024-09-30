"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoriesRoutes = void 0;
const express_1 = __importDefault(require("express"));
const controller_1 = require("../../controller");
const middleware_1 = require("../../middleware");
const form_schema_1 = require("../../form-schema");
exports.categoriesRoutes = express_1.default.Router();
// create category
exports.categoriesRoutes.post("/", (0, middleware_1.validate)(form_schema_1.addCategorySchema), controller_1.addCategoryController);
// create bulk category
exports.categoriesRoutes.post("/bulk", controller_1.createBulkCategoriesController);
// get all category
exports.categoriesRoutes.get("/", controller_1.getAllCategoryController);
// delete category
exports.categoriesRoutes.delete("/:id", controller_1.deleteCategoryByIdController);
// get category by id
exports.categoriesRoutes.get("/:id", controller_1.getCategoryByIdController);
// update category by id
exports.categoriesRoutes.put("/:id", (0, middleware_1.validate)(form_schema_1.updateCategorySchema), controller_1.updateCategoryByIdController);
