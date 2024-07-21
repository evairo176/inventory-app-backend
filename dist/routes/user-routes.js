"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRoutes = void 0;
const express_1 = __importDefault(require("express"));
const middleware_1 = require("../middleware");
const validation_request_schema_1 = require("../lib/validation-request-schema");
const user_controller_1 = require("../controller/user-controller");
exports.usersRoutes = express_1.default.Router();
// create category
exports.usersRoutes.post("/", (0, middleware_1.validate)(validation_request_schema_1.addUserSchema), user_controller_1.addUserController);
// create bulk category
exports.usersRoutes.post("/bulk", user_controller_1.createBulkUsersController);
// get all category
exports.usersRoutes.get("/", user_controller_1.getAllUserController);
// delete category
exports.usersRoutes.delete("/:id", user_controller_1.deleteUserByIdController);
// get category by id
exports.usersRoutes.get("/:id", user_controller_1.getUserByIdController);
// update category by id
exports.usersRoutes.put("/:id", (0, middleware_1.validate)(validation_request_schema_1.updateUserSchema), user_controller_1.updateUserByIdController);
