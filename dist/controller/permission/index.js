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
exports.updatePermissionByIdController = exports.getPermissionByIdController = exports.deletePermissionByIdController = exports.getAllPermissionController = exports.addPermissionController = void 0;
const lib_1 = require("../../lib");
const utils_1 = require("../../utils");
const addPermissionController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req === null || req === void 0 ? void 0 : req.body;
    try {
        const checkPermissionName = yield lib_1.db.permission.findFirst({
            where: {
                permissionName: body === null || body === void 0 ? void 0 : body.permissionName,
            },
        });
        if (checkPermissionName) {
            return (0, utils_1.sendResponse)(res, 400, "Permission Name is already exist");
        }
        const permission = yield lib_1.db.permission.create({
            data: {
                displayName: body === null || body === void 0 ? void 0 : body.displayName,
                permissionName: body === null || body === void 0 ? void 0 : body.permissionName,
                description: body === null || body === void 0 ? void 0 : body.description,
                module: body === null || body === void 0 ? void 0 : body.module,
                status: body === null || body === void 0 ? void 0 : body.status,
            },
        });
        return (0, utils_1.sendResponse)(res, 200, "Create permission successfully", permission);
    }
    catch (error) {
        return (0, utils_1.sendResponse)(res, 500, "[CREATE_PERMISSION]: Internal Error", error === null || error === void 0 ? void 0 : error.message);
    }
});
exports.addPermissionController = addPermissionController;
const getAllPermissionController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req === null || req === void 0 ? void 0 : req.query;
    try {
        let permission = yield lib_1.db.permission.findMany({
            orderBy: {
                updatedAt: "desc",
            },
        });
        console.log({ query });
        if (query === null || query === void 0 ? void 0 : query.role) {
            permission = yield lib_1.db.permission.findMany({
                orderBy: {
                    displayName: "asc",
                },
            });
        }
        return (0, utils_1.sendResponse)(res, 200, "Get all permission successfully", permission);
    }
    catch (error) {
        return (0, utils_1.sendResponse)(res, 500, "[GET_ALL_PERMISSION]: Internal Error", error === null || error === void 0 ? void 0 : error.message);
    }
});
exports.getAllPermissionController = getAllPermissionController;
// const createBulkPermissionsController = async (req: Request, res: Response) => {
//   try {
//     const body = req?.body;
//     let permissions = [];
//     for (const permission of body?.permissions) {
//       const newPermission = await addPermission(permission);
//       permissions.push(newPermission);
//     }
//     return sendResponse(res, 200, "Create Bulk permission successfully", permissions);
//   } catch (error: any) {
//     return sendResponse(
//       res,
//       500,
//       "[CREATE_BULK_PERMISSION]: Internal Error",
//       error?.message
//     );
//   }
// };
// const addPermission = async (data: ExcelPermissionProps) => {
//   try {
//     const checkPermissionName = await db.permission.findFirst({
//       where: {
//         permissionname: data?.permissionname,
//       },
//     });
//     if (checkPermissionName) {
//       return {
//         title: data.title,
//         status_upload: "Error",
//       };
//     }
//     const permission = await db.permission.create({
//       data: {
//         title: data?.title,
//         permissionname: data?.permissionname,
//       },
//     });
//     return {
//       title: permission.title,
//       status_upload: "",
//     };
//   } catch (error: any) {
//     return {
//       title: "",
//       status_upload: "",
//       error: error?.message,
//       data: data,
//     };
//   }
// };
const deletePermissionByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req === null || req === void 0 ? void 0 : req.params;
    try {
        if (!params.id) {
            return (0, utils_1.sendResponse)(res, 400, "Permission Id not found");
        }
        const permission = yield lib_1.db.permission.findFirst({
            where: {
                id: params.id,
            },
        });
        if (!permission) {
            return (0, utils_1.sendResponse)(res, 400, "Permission not found");
        }
        const deletePermission = yield lib_1.db.permission.delete({
            where: {
                id: params.id,
            },
        });
        return (0, utils_1.sendResponse)(res, 200, "Delete permission successfully", deletePermission);
    }
    catch (error) {
        return (0, utils_1.sendResponse)(res, 500, "[DELETE_PERMISSION]: Internal Error", error === null || error === void 0 ? void 0 : error.message);
    }
});
exports.deletePermissionByIdController = deletePermissionByIdController;
const getPermissionByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req === null || req === void 0 ? void 0 : req.params;
    try {
        if (!params.id) {
            return (0, utils_1.sendResponse)(res, 400, "Permission Id not found");
        }
        const permission = yield lib_1.db.permission.findFirst({
            where: {
                id: params.id,
            },
        });
        if (!permission) {
            return (0, utils_1.sendResponse)(res, 400, "Permission not found");
        }
        return (0, utils_1.sendResponse)(res, 200, "Get permission by id successfully", permission);
    }
    catch (error) {
        return (0, utils_1.sendResponse)(res, 500, "[GET_PERMISSION_BY_ID]: Internal Error", error === null || error === void 0 ? void 0 : error.message);
    }
});
exports.getPermissionByIdController = getPermissionByIdController;
const updatePermissionByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req === null || req === void 0 ? void 0 : req.params;
    const body = req === null || req === void 0 ? void 0 : req.body;
    try {
        if (!params.id) {
            return (0, utils_1.sendResponse)(res, 400, "Permission Id not found");
        }
        const permission = yield lib_1.db.permission.findFirst({
            where: {
                id: params.id,
            },
        });
        if (!permission) {
            return (0, utils_1.sendResponse)(res, 400, "Permission not found");
        }
        if (permission.permissionName !== (body === null || body === void 0 ? void 0 : body.permissionName)) {
            const checkPermissionName = yield lib_1.db.permission.findFirst({
                where: {
                    permissionName: body === null || body === void 0 ? void 0 : body.permissionName,
                },
            });
            if (checkPermissionName) {
                return (0, utils_1.sendResponse)(res, 400, "Permission Name is already exist");
            }
        }
        const permissionUpdate = yield lib_1.db.permission.update({
            where: {
                id: params.id,
            },
            data: {
                displayName: body === null || body === void 0 ? void 0 : body.displayName,
                permissionName: body === null || body === void 0 ? void 0 : body.permissionName,
                description: body === null || body === void 0 ? void 0 : body.description,
                module: body === null || body === void 0 ? void 0 : body.module,
                status: body === null || body === void 0 ? void 0 : body.status,
            },
        });
        return (0, utils_1.sendResponse)(res, 200, "Update permission by id successfully", permissionUpdate);
    }
    catch (error) {
        return (0, utils_1.sendResponse)(res, 500, "[UPDATE_PERMISSION_BY_ID]: Internal Error", error);
    }
});
exports.updatePermissionByIdController = updatePermissionByIdController;
