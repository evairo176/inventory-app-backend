"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.errorHandler = exports.notFound = void 0;
const send_response_1 = require("../utils/send-response");
// not found
const notFound = (req, res, next) => {
    const error = new Error(`Not Found: ${req.originalUrl}`);
    res.status(404);
    next(error);
};
exports.notFound = notFound;
// error handling
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    (0, send_response_1.sendResponse)(res, statusCode, err === null || err === void 0 ? void 0 : err.message, process.env.NODE_ENV === "production" ? null : err.stack);
};
exports.errorHandler = errorHandler;
// validate request
const validate = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    }
    catch (err) {
        return (0, send_response_1.sendResponse)(res, 400, "Invalid request", err.errors);
    }
};
exports.validate = validate;
