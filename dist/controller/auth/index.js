"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginController = void 0;
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const lib_1 = require("../../lib");
const utils_1 = require("../../utils");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
//----------------------------------------------
// login controller
//----------------------------------------------
exports.loginController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const checkUser = yield lib_1.db.user.findFirst({
            where: {
                email: email,
            },
        });
        if (!checkUser) {
            return (0, utils_1.sendResponse)(res, 404, "User not exist");
        }
        const hashPassword = checkUser.hashPassword;
        const isPasswordMatched = yield (0, bcrypt_1.compare)(password, hashPassword);
        if (!isPasswordMatched) {
            return (0, utils_1.sendResponse)(res, 400, "Password not matched");
        }
        const token = (0, lib_1.generateToken)(checkUser === null || checkUser === void 0 ? void 0 : checkUser.id);
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY);
        const user = yield lib_1.db.user.findUnique({
            where: {
                id: checkUser.id,
            },
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                status: true,
                inviteSent: true,
                imageUrl: true,
                role: true,
            },
        });
        return (0, utils_1.sendResponse)(res, 200, "Login Successfully", {
            user: user,
            token: token,
            expired_token: decoded === null || decoded === void 0 ? void 0 : decoded.exp,
        });
    }
    catch (error) {
        // await sequelize.close(); // Ensure the connection is closed
        return res.status(401).json({
            message: "Invalid login credentials",
            error: error === null || error === void 0 ? void 0 : error.message,
        });
    }
}));
