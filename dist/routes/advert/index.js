"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.advertRoutes = void 0;
const express_1 = __importDefault(require("express"));
const middleware_1 = require("../../middleware");
const form_schema_1 = require("../../form-schema");
const controller_1 = require("../../controller");
exports.advertRoutes = express_1.default.Router();
// create advert
exports.advertRoutes.post("/", (0, middleware_1.validate)(form_schema_1.addAdvertSchema), controller_1.addAdvertController);
// create bulk advert
exports.advertRoutes.post("/bulk", controller_1.createBulkCategoriesController);
// get all advert
exports.advertRoutes.get("/", controller_1.getAllAdvertController);
// delete advert
exports.advertRoutes.delete("/:id", controller_1.deleteAdvertByIdController);
// get advert by id
exports.advertRoutes.get("/:id", controller_1.getAdvertByIdController);
// update advert by id
exports.advertRoutes.put("/:id", (0, middleware_1.validate)(form_schema_1.updateAdvertSchema), controller_1.updateAdvertByIdController);
