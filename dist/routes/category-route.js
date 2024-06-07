"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoriesRoute = void 0;
const express_1 = __importDefault(require("express"));
const category_controller_1 = require("../controller/category-controller");
const middleware_1 = require("../middleware");
const validation_request_schema_1 = require("../lib/validation-request-schema");
exports.categoriesRoute = express_1.default.Router();
// fetch category by slug
exports.categoriesRoute.post("/", (0, middleware_1.validate)(validation_request_schema_1.addCategorySchema), category_controller_1.addCategoryController);
exports.categoriesRoute.post("/bulk", category_controller_1.createBulkCategories);
exports.categoriesRoute.get("/", category_controller_1.getAllCategoryController);
