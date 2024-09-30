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
exports.logout = exports.authMiddleware = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const lib_1 = require("../../lib");
const jwt = require("jsonwebtoken");
let tokenBlacklist = []; // Example in-memory storage for blacklisted tokens
exports.authMiddleware = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    let token;
    if ((_b = (_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
        try {
            if (token) {
                // Check if the token is blacklisted
                if (tokenBlacklist.includes(token)) {
                    return res.status(401).send({
                        message: "Token is blacklisted. Please login again.",
                    });
                }
                const decoded = jwt.verify(token, process.env.JWT_KEY);
                const { id, iat, exp } = decoded;
                const user = yield lib_1.db.user.findUnique({
                    where: {
                        id,
                    },
                });
                // attach the user to the request object
                // console.log(user);
                req.user = user;
                req.token_detail = { iat, exp };
                next();
            }
        }
        catch (error) {
            return res.status(401).send({
                message: "Authorization error",
            });
        }
    }
    else {
        throw new Error("There is no token attached to the header");
    }
}));
// Logout function (blacklist the token)
const logout = (req, res) => {
    var _a, _b;
    const token = (_b = (_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.split(" ")[1];
    if (token) {
        // Add token to blacklist
        tokenBlacklist.push(token);
        return res.status(200).send({
            message: "Successfully logged out",
        });
    }
    else {
        return res.status(400).send({
            message: "No token provided",
        });
    }
};
exports.logout = logout;
