"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.customersRoutes = void 0;
const express_1 = __importDefault(require("express"));
const middleware_1 = require("../../middleware");
const form_schema_1 = require("../../form-schema");
const controller_1 = require("../../controller");
const customer_1 = require("../../controller/customer");
exports.customersRoutes = express_1.default.Router();
// get all customer
exports.customersRoutes.get("/", controller_1.getAllCustomerController);
// get customer by id
exports.customersRoutes.get("/:id", customer_1.getCustomerByIdController);
// create customer
exports.customersRoutes.post("/", (0, middleware_1.validate)(form_schema_1.createCustomersSchema), controller_1.createCustomerController);
// update customer by id
exports.customersRoutes.put("/:id", (0, middleware_1.validate)(form_schema_1.updateCustomerSchema), customer_1.updateCustomerController);
// delete customer by id
exports.customersRoutes.delete("/:id", customer_1.deleteCustomerByIdController);
