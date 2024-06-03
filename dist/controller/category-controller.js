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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCategory = void 0;
const send_response_1 = require("../utils/send-response");
const db_1 = require("../lib/db");
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req === null || req === void 0 ? void 0 : req.body;
    console.log(body);
    try {
        const checkSlug = yield db_1.db.category.findFirst({
            where: {
                slug: body === null || body === void 0 ? void 0 : body.slug,
            },
        });
        if (checkSlug) {
            return (0, send_response_1.sendResponse)(res, 400, "Slug is already exist");
        }
        const category = yield db_1.db.category.create({
            data: {
                title: body === null || body === void 0 ? void 0 : body.title,
                description: body === null || body === void 0 ? void 0 : body.description,
                status: body === null || body === void 0 ? void 0 : body.status,
                slug: body === null || body === void 0 ? void 0 : body.slug,
                imageUrl: body === null || body === void 0 ? void 0 : body.imageUrl,
            },
        });
        return (0, send_response_1.sendResponse)(res, 200, "Create category successfully", {
            data: category,
        });
    }
    catch (error) {
        return (0, send_response_1.sendResponse)(res, 500, "INTERNAL ERROR", error);
    }
});
exports.createCategory = createCategory;
