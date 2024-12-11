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
exports.getAnalyticController = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const lib_1 = require("../../lib");
const utils_1 = require("../../utils");
const date_fns_1 = require("date-fns");
//----------------------------------------------
// get analytic controller
//----------------------------------------------
// Helper to format dates
const today = new Date();
const yesterday = (0, date_fns_1.subDays)(today, 1);
exports.getAnalyticController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Orders and sales for today
        const todayOrders = yield lib_1.db.lineOrder.count({
            where: {
                createdAt: {
                    gte: (0, date_fns_1.startOfDay)(today),
                    lte: (0, date_fns_1.endOfDay)(today),
                },
            },
        });
        const todaySales = yield lib_1.db.sale.aggregate({
            _sum: {
                salePrice: true,
            },
            where: {
                createdAt: {
                    gte: (0, date_fns_1.startOfDay)(today),
                    lte: (0, date_fns_1.endOfDay)(today),
                },
            },
        });
        // Orders and sales for yesterday
        const yesterdayOrders = yield lib_1.db.lineOrder.count({
            where: {
                createdAt: {
                    gte: (0, date_fns_1.startOfDay)(yesterday),
                    lte: (0, date_fns_1.endOfDay)(yesterday),
                },
            },
        });
        const yesterdaySales = yield lib_1.db.sale.aggregate({
            _sum: {
                salePrice: true,
            },
            where: {
                createdAt: {
                    gte: (0, date_fns_1.startOfDay)(yesterday),
                    lte: (0, date_fns_1.endOfDay)(yesterday),
                },
            },
        });
        // Orders and sales for this month
        const thisMonthOrders = yield lib_1.db.lineOrder.count({
            where: {
                createdAt: {
                    gte: (0, date_fns_1.startOfMonth)(today),
                    lte: (0, date_fns_1.endOfMonth)(today),
                },
            },
        });
        const thisMonthSales = yield lib_1.db.sale.aggregate({
            _sum: {
                salePrice: true,
            },
            where: {
                createdAt: {
                    gte: (0, date_fns_1.startOfMonth)(today),
                    lte: (0, date_fns_1.endOfMonth)(today),
                },
            },
        });
        // Orders and sales for last month
        const lastMonthOrders = yield lib_1.db.lineOrder.count({
            where: {
                createdAt: {
                    gte: (0, date_fns_1.startOfMonth)((0, date_fns_1.subMonths)(today, 1)),
                    lte: (0, date_fns_1.endOfMonth)((0, date_fns_1.subMonths)(today, 1)),
                },
            },
        });
        const lastMonthSales = yield lib_1.db.sale.aggregate({
            _sum: {
                salePrice: true,
            },
            where: {
                createdAt: {
                    gte: (0, date_fns_1.startOfMonth)((0, date_fns_1.subMonths)(today, 1)),
                    lte: (0, date_fns_1.endOfMonth)((0, date_fns_1.subMonths)(today, 1)),
                },
            },
        });
        // All-time metrics
        const totalOrders = yield lib_1.db.lineOrder.count();
        const totalSales = yield lib_1.db.sale.aggregate({
            _sum: {
                salePrice: true,
            },
        });
        // Orders by status
        const orderPending = yield lib_1.db.lineOrder.count({
            where: { status: "PENDING" },
        });
        const orderProcessing = yield lib_1.db.lineOrder.count({
            where: { status: "PROCESSING" },
        });
        const orderDelivered = yield lib_1.db.lineOrder.count({
            where: { status: "DELIVERED" },
        });
        const orderFailed = yield lib_1.db.lineOrder.count({
            where: { status: "FAILED" },
        });
        const salesSummary = {
            // todayOrders,
            // yesterdayOrders,
            // thisMonthOrders,
            // lastMonthOrders,
            totalOrders,
            orderPending,
            orderProcessing,
            orderDelivered,
            orderFailed,
        };
        return (0, utils_1.sendResponse)(res, 200, "Get analytic sales Successfully", {
            salesSummary,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error === null || error === void 0 ? void 0 : error.message,
        });
    }
}));
