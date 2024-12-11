"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainCategoriesRoutes = void 0;
const express_1 = __importDefault(require("express"));
const controller_1 = require("../../controller");
const middleware_1 = require("../../middleware");
const form_schema_1 = require("../../form-schema");
exports.mainCategoriesRoutes = express_1.default.Router();
// create category
exports.mainCategoriesRoutes.post("/", (0, middleware_1.validate)(form_schema_1.addMainCategorySchema), controller_1.addMainCategoryController);
// create bulk category
exports.mainCategoriesRoutes.post("/bulk", controller_1.createBulkMainCategoryController);
// get all category
exports.mainCategoriesRoutes.get("/", controller_1.getAllMainCategoryController);
// delete category
exports.mainCategoriesRoutes.delete("/:id", controller_1.deleteMainCategoryByIdController);
// get category by id
exports.mainCategoriesRoutes.get("/:id", controller_1.getMainCategoryByIdController);
// update category by id
exports.mainCategoriesRoutes.put("/:id", (0, middleware_1.validate)(form_schema_1.updateMainCategorySchema), controller_1.updateMainCategoryByIdController);
