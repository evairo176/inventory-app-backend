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
exports.getPopulateMainCategoryController = exports.getAllHomeAdvertController = exports.getAllHomeBannerController = void 0;
const utils_1 = require("../../utils");
const lib_1 = require("../../lib");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
//----------------------------------------------
// get all banner
//----------------------------------------------
const getAllHomeBannerController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const banner = yield lib_1.db.advert.findMany({
            where: {
                type: "BANNER",
                status: true,
            },
            orderBy: {
                updatedAt: "desc",
            },
            take: 6,
        });
        if (!banner) {
            return (0, utils_1.sendResponse)(res, 400, "Banner not found!");
        }
        return (0, utils_1.sendResponse)(res, 200, "Get all banner successfully", banner);
    }
    catch (error) {
        return (0, utils_1.sendResponse)(res, 500, "[GET_ALL_HOME_BANNER: Internal Error", error === null || error === void 0 ? void 0 : error.message);
    }
}));
exports.getAllHomeBannerController = getAllHomeBannerController;
//----------------------------------------------
// get all advert
//----------------------------------------------
const getAllHomeAdvertController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const advert = yield lib_1.db.advert.findMany({
            where: {
                type: "ADVERT",
                status: true,
            },
            orderBy: {
                updatedAt: "desc",
            },
            take: 4,
        });
        if (!advert) {
            return (0, utils_1.sendResponse)(res, 400, "Advert not found!");
        }
        return (0, utils_1.sendResponse)(res, 200, "Get all advert successfully", advert);
    }
    catch (error) {
        return (0, utils_1.sendResponse)(res, 500, "[GET_ALL_HOME_ADVERT: Internal Error", error === null || error === void 0 ? void 0 : error.message);
    }
}));
exports.getAllHomeAdvertController = getAllHomeAdvertController;
//----------------------------------------------
// get populate main category
//----------------------------------------------
const getPopulateMainCategoryController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mainCategory = yield lib_1.db.mainCategory.findMany({
            orderBy: {
                updatedAt: "desc",
            },
            include: {
                categories: {
                    include: {
                        subCategories: true,
                    },
                },
            },
        });
        if (!mainCategory) {
            return (0, utils_1.sendResponse)(res, 400, "Main Categories not found!");
        }
        return (0, utils_1.sendResponse)(res, 200, "Get all main categories successfully", mainCategory);
    }
    catch (error) {
        return (0, utils_1.sendResponse)(res, 500, "[GET_POPULATE_MAIN_CATEGORIES]: Internal Error", error === null || error === void 0 ? void 0 : error.message);
    }
}));
exports.getPopulateMainCategoryController = getPopulateMainCategoryController;
