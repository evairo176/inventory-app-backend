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
exports.deleteCustomerByIdController = exports.updateCustomerController = exports.createCustomerController = exports.getCustomerByIdController = exports.getAllCustomerController = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const lib_1 = require("../../lib");
const utils_1 = require("../../utils");
const bcrypt_1 = __importDefault(require("bcrypt"));
//----------------------------------------------
// get all customer controller
//----------------------------------------------
exports.getAllCustomerController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customer = yield lib_1.db.customer.findMany({
            orderBy: {
                updatedAt: "desc",
            },
            select: {
                id: true,
                additionalInfo: true,
                billingAddress: true,
                shippingAddress: true,
                user: {
                    select: {
                        id: true,
                        roleId: true,
                        firstName: true,
                        lastName: true,
                        name: true,
                        email: true,
                        phone: true,
                        createdAt: true,
                        updatedAt: true,
                        status: true,
                        imageUrl: true,
                        inviteSent: true,
                        role: true,
                    },
                },
            },
            where: {
                user: {
                    role: {
                        roleName: "customer",
                    },
                },
            },
        });
        if (!customer) {
            return (0, utils_1.sendResponse)(res, 400, "customer not found!");
        }
        return (0, utils_1.sendResponse)(res, 200, "Get all user successfully", customer);
    }
    catch (error) {
        return (0, utils_1.sendResponse)(res, 500, "[GET_ALL_USER]: Internal Error", error === null || error === void 0 ? void 0 : error.message);
    }
}));
//----------------------------------------------
// get customer BY ID controller
//----------------------------------------------
exports.getCustomerByIdController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req === null || req === void 0 ? void 0 : req.params;
    try {
        if (!params.id) {
            return (0, utils_1.sendResponse)(res, 400, "User Id not found");
        }
        const user = yield lib_1.db.customer.findFirst({
            where: {
                id: params.id,
            },
            select: {
                id: true,
                additionalInfo: true,
                billingAddress: true,
                shippingAddress: true,
                user: {
                    select: {
                        id: true,
                        roleId: true,
                        firstName: true,
                        lastName: true,
                        name: true,
                        email: true,
                        phone: true,
                        createdAt: true,
                        updatedAt: true,
                        status: true,
                        imageUrl: true,
                        inviteSent: true,
                        role: true,
                    },
                },
            },
        });
        if (!user) {
            return (0, utils_1.sendResponse)(res, 400, "User not found");
        }
        return (0, utils_1.sendResponse)(res, 200, "Get user by id successfully", user);
    }
    catch (error) {
        return (0, utils_1.sendResponse)(res, 500, "[GET_USER_BY_ID]: Internal Error", error === null || error === void 0 ? void 0 : error.message);
    }
}));
//----------------------------------------------
// create customer controller
//----------------------------------------------
exports.createCustomerController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, password, billingAddress, shippingAddress, additionalInfo, roleId, // Include roleId in the input
    phone, imageUrl, status, } = req === null || req === void 0 ? void 0 : req.body;
    try {
        const hashedPassword = yield bcrypt_1.default.hash(password, 10); // Hash the password
        const customerExisting = yield lib_1.db.customer.findFirst({
            where: {
                user: {
                    email: email,
                },
            },
            select: {
                id: true,
                user: true,
            },
        });
        if (!customerExisting) {
            return (0, utils_1.sendResponse)(res, 400, "Email already exist");
        }
        // Start a transaction to create both User and Customer
        const newUser = yield lib_1.db.user.create({
            data: {
                firstName,
                lastName,
                name: `${firstName} ${lastName}`,
                email,
                password: password,
                roleId, // Assign the role if provided
                phone,
                imageUrl: imageUrl,
                hashPassword: hashedPassword, // Save hashed password
                status,
                customer: {
                    create: {
                        billingAddress,
                        shippingAddress,
                        additionalInfo,
                    },
                },
            },
            include: {
                customer: true, // Include customers in the response
            },
        });
        return (0, utils_1.sendResponse)(res, 200, "Create user customer Successfully", {
            newUser,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error === null || error === void 0 ? void 0 : error.message,
        });
    }
}));
//----------------------------------------------
// update customer controller
//----------------------------------------------
exports.updateCustomerController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req === null || req === void 0 ? void 0 : req.params;
    const { firstName, lastName, email, billingAddress, shippingAddress, additionalInfo, phone, imageUrl, status, } = req === null || req === void 0 ? void 0 : req.body;
    try {
        if (!params.id) {
            return (0, utils_1.sendResponse)(res, 400, "User Id not found");
        }
        const customerExisting = yield lib_1.db.customer.findFirst({
            where: {
                id: params.id,
            },
            select: {
                id: true,
                user: true,
            },
        });
        if (!customerExisting) {
            return (0, utils_1.sendResponse)(res, 400, "User not found");
        }
        if (customerExisting.user.email !== email) {
            const checkEmail = yield lib_1.db.user.findFirst({
                where: {
                    email: email,
                },
            });
            if (checkEmail) {
                return (0, utils_1.sendResponse)(res, 400, "Email is already exist");
            }
        }
        // Start a transaction to update both User and Customer atomically
        const updatedUser = yield lib_1.db.$transaction((prisma) => __awaiter(void 0, void 0, void 0, function* () {
            // Update the User
            const userUpdate = yield prisma.user.update({
                where: {
                    id: customerExisting.user.id,
                },
                data: {
                    firstName,
                    lastName,
                    name: `${firstName} ${lastName}`, // Update the full name
                    email,
                    phone,
                    imageUrl,
                    status,
                },
            });
            // Update the associated Customer
            const customerUpdate = yield prisma.customer.update({
                where: {
                    id: customerExisting.id, // Assuming each user has one associated customer
                },
                data: {
                    billingAddress,
                    shippingAddress,
                    additionalInfo,
                },
            });
            return {
                user: userUpdate,
                customer: customerUpdate,
            };
        }));
        const customer = yield lib_1.db.customer.findFirst({
            where: {
                id: updatedUser.customer.id,
            },
        });
        return (0, utils_1.sendResponse)(res, 200, "Update user customer Successfully", {
            customer,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error === null || error === void 0 ? void 0 : error.message,
        });
    }
}));
//----------------------------------------------
// delete customer BY ID controller
//----------------------------------------------
exports.deleteCustomerByIdController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req === null || req === void 0 ? void 0 : req.params;
    try {
        if (!params.id) {
            return (0, utils_1.sendResponse)(res, 400, "User Id not found");
        }
        const customerExisting = yield lib_1.db.customer.findFirst({
            where: {
                id: params.id,
            },
            select: {
                id: true,
                additionalInfo: true,
                billingAddress: true,
                shippingAddress: true,
                user: {
                    select: {
                        id: true,
                        roleId: true,
                        firstName: true,
                        lastName: true,
                        name: true,
                        email: true,
                        phone: true,
                        createdAt: true,
                        updatedAt: true,
                        status: true,
                        imageUrl: true,
                        inviteSent: true,
                        role: true,
                    },
                },
            },
        });
        if (!customerExisting) {
            return (0, utils_1.sendResponse)(res, 400, "User not found");
        }
        yield lib_1.db.$transaction((prisma) => __awaiter(void 0, void 0, void 0, function* () {
            // First, delete the customer by id
            yield prisma.customer.delete({
                where: {
                    id: customerExisting.id,
                },
            });
            // Then, delete the associated user, assuming userId is stored in the customer model
            yield prisma.user.delete({
                where: {
                    id: customerExisting.user.id, // Replace `params.userId` with the correct field
                },
            });
        }));
        return (0, utils_1.sendResponse)(res, 200, "Delete User by id successfully", customerExisting);
    }
    catch (error) {
        return (0, utils_1.sendResponse)(res, 500, "[DELETE_CUSTOMER_BY_ID]: Internal Error", error === null || error === void 0 ? void 0 : error.message);
    }
}));
