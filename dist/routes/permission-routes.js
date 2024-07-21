"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.permissionsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const middleware_1 = require("../middleware");
const permission_controller_1 = require("../controller/permission-controller");
const validation_request_schema_1 = require("../lib/validation-request-schema");
exports.permissionsRoutes = express_1.default.Router();
// create permission
exports.permissionsRoutes.post("/", (0, middleware_1.validate)(validation_request_schema_1.addPermissionSchema), permission_controller_1.addPermissionController);
// create bulk permission
// permissionsRoutes.post("/bulk", createBulkPermissionsController);
// get all permission
exports.permissionsRoutes.get("/", permission_controller_1.getAllPermissionController);
// delete permission
exports.permissionsRoutes.delete("/:id", permission_controller_1.deletePermissionByIdController);
// get permission by id
exports.permissionsRoutes.get("/:id", permission_controller_1.getPermissionByIdController);
// update permission by id
exports.permissionsRoutes.put("/:id", (0, middleware_1.validate)(validation_request_schema_1.updatePermissionSchema), permission_controller_1.updatePermissionByIdController);
