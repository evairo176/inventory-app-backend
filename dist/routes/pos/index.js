"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.posRoutes = void 0;
const express_1 = __importDefault(require("express"));
const controller_1 = require("../../controller");
const middleware_1 = require("../../middleware");
const form_schema_1 = require("../../form-schema");
exports.posRoutes = express_1.default.Router();
// pos create line order
exports.posRoutes.post("/create-line-order", (0, middleware_1.validate)(form_schema_1.createLineOrderSchema), controller_1.createLineOrderController);
// get orders
exports.posRoutes.get("/orders", controller_1.getOrderController);
