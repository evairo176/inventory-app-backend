"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rolesRoutes = void 0;
const express_1 = __importDefault(require("express"));
const middleware_1 = require("../../middleware");
const form_schema_1 = require("../../form-schema");
const controller_1 = require("../../controller");
exports.rolesRoutes = express_1.default.Router();
// create role
exports.rolesRoutes.post("/", (0, middleware_1.validate)(form_schema_1.addRoleSchema), controller_1.addRoleController);
// create bulk role
// rolesRoutes.post("/bulk", createBulkRolesController);
// get all role
exports.rolesRoutes.get("/", controller_1.getAllRoleController);
// delete role
exports.rolesRoutes.delete("/:id", controller_1.deleteRoleByIdController);
// get role by id
exports.rolesRoutes.get("/:id", controller_1.getRoleByIdController);
// update role by id
exports.rolesRoutes.put("/:id", (0, middleware_1.validate)(form_schema_1.updateRoleSchema), controller_1.updateRoleByIdController);
