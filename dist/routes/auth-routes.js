"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controller/auth-controller");
exports.authRoutes = express_1.default.Router();
// login auth
exports.authRoutes.post("/login", auth_controller_1.loginController);
