"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.homeRoutes = void 0;
const express_1 = __importDefault(require("express"));
const controller_1 = require("../../controller");
exports.homeRoutes = express_1.default.Router();
// get all home banner
exports.homeRoutes.get("/banner", controller_1.getAllHomeBannerController);
// get all home advert
exports.homeRoutes.get("/advert", controller_1.getAllHomeAdvertController);
// get populate main category
exports.homeRoutes.get("/populate-main-category", controller_1.getPopulateMainCategoryController);
