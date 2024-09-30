"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = void 0;
const sendResponse = (res, statusCode, message, data = null) => {
    res.status(statusCode).json({
        status: statusCode,
        message: message,
        data: data,
    });
};
exports.sendResponse = sendResponse;
