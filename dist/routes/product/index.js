"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoutes = void 0;
const express_1 = __importDefault(require("express"));
const controller_1 = require("../../controller");
const middleware_1 = require("../../middleware");
const form_schema_1 = require("../../form-schema");
exports.productRoutes = express_1.default.Router();
// create product
exports.productRoutes.post("/", (0, middleware_1.validate)(form_schema_1.addProductSchema), controller_1.addProductController);
// create bulk product
exports.productRoutes.post("/bulk", controller_1.createBulkProductsController);
// get all product
exports.productRoutes.get("/", controller_1.getAllProductController);
// delete product
exports.productRoutes.delete("/:id", controller_1.deleteProductByIdController);
// get product by id
exports.productRoutes.get("/:id", controller_1.getProductByIdController);
// update product by id
exports.productRoutes.put("/:id", (0, middleware_1.validate)(form_schema_1.updateProductSchema), controller_1.updateProductByIdController);
