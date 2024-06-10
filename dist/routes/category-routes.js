"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoriesRoutes = void 0;
const express_1 = __importDefault(require("express"));
const category_controller_1 = require("../controller/category-controller");
const middleware_1 = require("../middleware");
const validation_request_schema_1 = require("../lib/validation-request-schema");
exports.categoriesRoutes = express_1.default.Router();
// create category
exports.categoriesRoutes.post("/", (0, middleware_1.validate)(validation_request_schema_1.addCategorySchema), category_controller_1.addCategoryController);
// create bulk category
exports.categoriesRoutes.post("/bulk", category_controller_1.createBulkCategoriesController);
// get all category
exports.categoriesRoutes.get("/", category_controller_1.getAllCategoryController);
// delete category
exports.categoriesRoutes.delete("/:id", category_controller_1.deleteCategoryByIdController);
// get category by id
exports.categoriesRoutes.get("/:id", category_controller_1.getCategoryByIdController);
// update category by id
exports.categoriesRoutes.put("/:id", (0, middleware_1.validate)(validation_request_schema_1.updateCategorySchema), category_controller_1.updateCategoryByIdController);
