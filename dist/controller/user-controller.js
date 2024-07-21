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
exports.updateUserByIdController = exports.getUserByIdController = exports.deleteUserByIdController = exports.createBulkUsersController = exports.getAllUserController = exports.addUserController = void 0;
const send_response_1 = require("../utils/send-response");
const db_1 = require("../lib/db");
const bcrypt_1 = __importDefault(require("bcrypt"));
const addUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req === null || req === void 0 ? void 0 : req.body;
    try {
        const checkEmail = yield db_1.db.user.findFirst({
            where: {
                email: body === null || body === void 0 ? void 0 : body.email,
            },
        });
        if (checkEmail) {
            return (0, send_response_1.sendResponse)(res, 400, "Email is already exist");
        }
        const password = yield bcrypt_1.default.hash(body === null || body === void 0 ? void 0 : body.password, 12);
        const user = yield db_1.db.user.create({
            data: {
                firstName: body === null || body === void 0 ? void 0 : body.firstName,
                lastName: body === null || body === void 0 ? void 0 : body.lastName,
                name: `${body.firstName} ${body.lastName}`,
                email: body === null || body === void 0 ? void 0 : body.email,
                phone: body === null || body === void 0 ? void 0 : body.phone,
                password: body === null || body === void 0 ? void 0 : body.password,
                hashPassword: password,
                roleId: body === null || body === void 0 ? void 0 : body.roleId,
                status: body === null || body === void 0 ? void 0 : body.status,
            },
        });
        return (0, send_response_1.sendResponse)(res, 200, "Create user successfully", user);
    }
    catch (error) {
        return (0, send_response_1.sendResponse)(res, 500, "[CREATE_USER]: Internal Error", error === null || error === void 0 ? void 0 : error.message);
    }
});
exports.addUserController = addUserController;
const getAllUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield db_1.db.user.findMany({
            orderBy: {
                updatedAt: "desc",
            },
            select: {
                id: true,
                role: true,
                roleId: true,
                firstName: true,
                lastName: true,
                name: true,
                email: true,
                phone: true,
                createdAt: true,
                updatedAt: true,
                status: true,
                // Exclude the password field
            },
        });
        if (!user) {
            return (0, send_response_1.sendResponse)(res, 400, "User not found!");
        }
        return (0, send_response_1.sendResponse)(res, 200, "Get all user successfully", user);
    }
    catch (error) {
        return (0, send_response_1.sendResponse)(res, 500, "[GET_ALL_USER]: Internal Error", error === null || error === void 0 ? void 0 : error.message);
    }
});
exports.getAllUserController = getAllUserController;
const createBulkUsersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req === null || req === void 0 ? void 0 : req.body;
        let users = [];
        for (const user of body === null || body === void 0 ? void 0 : body.users) {
            const newUser = yield addUser(user);
            users.push(newUser);
        }
        return (0, send_response_1.sendResponse)(res, 200, "Create Bulk user successfully", users);
    }
    catch (error) {
        return (0, send_response_1.sendResponse)(res, 500, "[CREATE_BULK_USER]: Internal Error", error === null || error === void 0 ? void 0 : error.message);
    }
});
exports.createBulkUsersController = createBulkUsersController;
const addUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const checkEmail = yield db_1.db.user.findFirst({
            where: {
                email: data === null || data === void 0 ? void 0 : data.email,
            },
        });
        if (checkEmail) {
            return {
                title: `${data.firstName} ${data.lastName}`,
                status_upload: "Error",
            };
        }
        const password = yield bcrypt_1.default.hash(data === null || data === void 0 ? void 0 : data.password, 12);
        const user = yield db_1.db.user.create({
            data: {
                firstName: data.firstName,
                lastName: data.lastName,
                name: `${data.firstName} ${data.lastName}`,
                email: data.email,
                phone: data.phone,
                password: data === null || data === void 0 ? void 0 : data.password,
                hashPassword: password,
                roleId: data === null || data === void 0 ? void 0 : data.roleId,
            },
        });
        return {
            title: `${data.firstName} ${data.lastName}`,
            status_upload: "",
        };
    }
    catch (error) {
        return {
            title: "",
            status_upload: "",
            error: error === null || error === void 0 ? void 0 : error.message,
            data: data,
        };
    }
});
const deleteUserByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req === null || req === void 0 ? void 0 : req.params;
    try {
        if (!params.id) {
            return (0, send_response_1.sendResponse)(res, 400, "User Id not found");
        }
        const user = yield db_1.db.user.findFirst({
            where: {
                id: params.id,
            },
        });
        if (!user) {
            return (0, send_response_1.sendResponse)(res, 400, "User not found");
        }
        const deleteUser = yield db_1.db.user.delete({
            where: {
                id: params.id,
            },
        });
        return (0, send_response_1.sendResponse)(res, 200, "Delete user successfully", deleteUser);
    }
    catch (error) {
        return (0, send_response_1.sendResponse)(res, 500, "[DELETE_USER]: Internal Error", error === null || error === void 0 ? void 0 : error.message);
    }
});
exports.deleteUserByIdController = deleteUserByIdController;
const getUserByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req === null || req === void 0 ? void 0 : req.params;
    try {
        if (!params.id) {
            return (0, send_response_1.sendResponse)(res, 400, "User Id not found");
        }
        const user = yield db_1.db.user.findFirst({
            where: {
                id: params.id,
            },
            select: {
                id: true,
                role: true,
                roleId: true,
                firstName: true,
                lastName: true,
                name: true,
                email: true,
                phone: true,
                createdAt: true,
                updatedAt: true,
                status: true,
                password: true,
                // Exclude the password field
            },
        });
        if (!user) {
            return (0, send_response_1.sendResponse)(res, 400, "User not found");
        }
        return (0, send_response_1.sendResponse)(res, 200, "Get user by id successfully", user);
    }
    catch (error) {
        return (0, send_response_1.sendResponse)(res, 500, "[GET_USER_BY_ID]: Internal Error", error === null || error === void 0 ? void 0 : error.message);
    }
});
exports.getUserByIdController = getUserByIdController;
const updateUserByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req === null || req === void 0 ? void 0 : req.params;
    const body = req === null || req === void 0 ? void 0 : req.body;
    try {
        if (!params.id) {
            return (0, send_response_1.sendResponse)(res, 400, "User Id not found");
        }
        const user = yield db_1.db.user.findFirst({
            where: {
                id: params.id,
            },
        });
        if (!user) {
            return (0, send_response_1.sendResponse)(res, 400, "User not found");
        }
        if (user.email !== (body === null || body === void 0 ? void 0 : body.email)) {
            const checkEmail = yield db_1.db.user.findFirst({
                where: {
                    email: body === null || body === void 0 ? void 0 : body.email,
                },
            });
            if (checkEmail) {
                return (0, send_response_1.sendResponse)(res, 400, "Email is already exist");
            }
        }
        const password = yield bcrypt_1.default.hash(body === null || body === void 0 ? void 0 : body.password, 12);
        const userUpdate = yield db_1.db.user.update({
            where: {
                id: params.id,
            },
            data: {
                firstName: body === null || body === void 0 ? void 0 : body.firstName,
                lastName: body === null || body === void 0 ? void 0 : body.lastName,
                name: `${body.firstName} ${body.lastName}`,
                email: body === null || body === void 0 ? void 0 : body.email,
                password: body === null || body === void 0 ? void 0 : body.password,
                hashPassword: password,
                phone: body === null || body === void 0 ? void 0 : body.phone,
                roleId: body === null || body === void 0 ? void 0 : body.roleId,
                status: body === null || body === void 0 ? void 0 : body.status,
            },
        });
        return (0, send_response_1.sendResponse)(res, 200, "Update user by id successfully", userUpdate);
    }
    catch (error) {
        return (0, send_response_1.sendResponse)(res, 500, "[UPDATE_USER_BY_ID]: Internal Error", error);
    }
});
exports.updateUserByIdController = updateUserByIdController;
