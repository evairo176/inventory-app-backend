"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoriesRoute = void 0;
const express_1 = __importDefault(require("express"));
const category_controller_1 = require("../controller/category-controller");
exports.categoriesRoute = express_1.default.Router();
// fetch category by slug
exports.categoriesRoute.post("/", category_controller_1.createCategory);
exports.categoriesRoute.get("/", category_controller_1.getAllCategory);
