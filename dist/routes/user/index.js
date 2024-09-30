"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRoutes = void 0;
const express_1 = __importDefault(require("express"));
const middleware_1 = require("../../middleware");
const form_schema_1 = require("../../form-schema");
const controller_1 = require("../../controller");
exports.usersRoutes = express_1.default.Router();
// create category
exports.usersRoutes.post("/", (0, middleware_1.validate)(form_schema_1.addUserSchema), controller_1.addUserController);
// create bulk category
exports.usersRoutes.post("/bulk", controller_1.createBulkUsersController);
// get all category
exports.usersRoutes.get("/", controller_1.getAllUserController);
// delete category
exports.usersRoutes.delete("/:id", controller_1.deleteUserByIdController);
// get category by id
exports.usersRoutes.get("/:id", controller_1.getUserByIdController);
// update category by id
exports.usersRoutes.put("/:id", (0, middleware_1.validate)(form_schema_1.updateUserSchema), controller_1.updateUserByIdController);
// update invite sent
exports.usersRoutes.put("/invite/email-sent", (0, middleware_1.validate)(form_schema_1.updateInviteSentSchema), controller_1.updateInviteSentUserController);
