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
exports.getOrderController = exports.createLineOrderController = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const lib_1 = require("../../lib");
const utils_1 = require("../../utils");
exports.createLineOrderController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const orderItems = (_a = req.body) === null || _a === void 0 ? void 0 : _a.orderItems;
        const customerData = (_b = req.body) === null || _b === void 0 ? void 0 : _b.customerData;
        const orderType = "Sale";
        const subTotal = orderItems.reduce((total, item) => total + item.price * item.qty, 0);
        const taxPercent = 10;
        const tax = (taxPercent * subTotal) / 100;
        const totalSum = subTotal + tax;
        const orderAmount = totalSum;
        const customerExisting = yield lib_1.db.customer.findFirst({
            where: {
                id: customerData.customerId,
            },
            include: {
                user: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
            },
        });
        if (!customerExisting) {
            return (0, utils_1.sendResponse)(res, 404, "Customer not found");
        }
        const response = yield lib_1.db.$transaction((transaction) => __awaiter(void 0, void 0, void 0, function* () {
            var _c;
            // create line order
            const lineOrder = yield transaction.lineOrder.create({
                data: {
                    customerId: customerExisting === null || customerExisting === void 0 ? void 0 : customerExisting.id,
                    customerName: customerExisting === null || customerExisting === void 0 ? void 0 : customerExisting.user.name,
                    customerEmail: customerExisting === null || customerExisting === void 0 ? void 0 : customerExisting.user.email,
                    orderNumber: (0, utils_1.generateOrderNumber)(),
                    orderAmount,
                    orderType,
                },
            });
            for (const item of orderItems) {
                // Cek stock qty dari produk
                const product = yield transaction.product.findUnique({
                    where: {
                        id: item.id,
                    },
                    select: {
                        stockQty: true,
                    },
                });
                // Jika stok kosong atau kurang dari qty yang dipesan, kembalikan error
                if (!product || product.stockQty < item.qty) {
                    throw new Error(`Insufficient stock for product: ${item.name}. Available: ${(_c = product === null || product === void 0 ? void 0 : product.stockQty) !== null && _c !== void 0 ? _c : 0}, requested: ${item.qty}`);
                }
                // update product stock qty
                yield transaction.product.update({
                    where: {
                        id: item.id,
                    },
                    data: {
                        stockQty: {
                            decrement: item.qty,
                        },
                    },
                });
                // create line order item
                yield transaction.lineOrderItem.create({
                    data: {
                        orderId: lineOrder.id,
                        productId: item.id,
                        name: item.name,
                        price: item.price,
                        qty: item.qty,
                        productThumbnail: item.productThumbnail,
                    },
                });
                // create sale
                yield transaction.sale.create({
                    data: {
                        orderId: lineOrder.id,
                        productId: item.id,
                        qty: item.qty,
                        salePrice: item.price,
                        productName: item.name,
                        productImage: item.productThumbnail,
                        customerName: customerExisting.user.name,
                        customerEmail: customerExisting.user.email,
                    },
                });
            }
            return lineOrder;
        }));
        return (0, utils_1.sendResponse)(res, 200, "Create Line Order Successfully", {
            lineOrder: response,
        });
    }
    catch (error) {
        return (0, utils_1.sendResponse)(res, 500, "Internal Server Error", {
            error: error === null || error === void 0 ? void 0 : error.message,
        });
    }
}));
//----------------------------------------------
// get orders controller
//----------------------------------------------
exports.getOrderController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield lib_1.db.lineOrder.findMany({
            orderBy: {
                createdAt: "desc",
            },
            take: 3,
        });
        return (0, utils_1.sendResponse)(res, 200, "get Line Order Successfully", {
            lineOrder: orders,
        });
    }
    catch (error) {
        return (0, utils_1.sendResponse)(res, 500, "Internal Server Error", {
            error: error === null || error === void 0 ? void 0 : error.message,
        });
    }
}));
