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
exports.updateRoleByIdController = exports.getRoleByIdController = exports.deleteRoleByIdController = exports.getAllRoleController = exports.addRoleController = void 0;
const send_response_1 = require("../utils/send-response");
const db_1 = require("../lib/db");
const library_1 = require("@prisma/client/runtime/library");
const addRoleController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req === null || req === void 0 ? void 0 : req.body;
    try {
        const checkAbbreviation = yield db_1.db.role.findFirst({
            where: {
                roleName: body === null || body === void 0 ? void 0 : body.roleName,
            },
        });
        if (checkAbbreviation) {
            return (0, send_response_1.sendResponse)(res, 400, "Role Name is already exist");
        }
        const role = yield db_1.db.role.create({
            data: {
                displayName: body === null || body === void 0 ? void 0 : body.displayName,
                roleName: body === null || body === void 0 ? void 0 : body.roleName,
                description: body === null || body === void 0 ? void 0 : body.description,
                status: body === null || body === void 0 ? void 0 : body.status,
                permissions: {
                    create: body === null || body === void 0 ? void 0 : body.permissionIds.map((permissionId) => ({
                        permission: { connect: { id: permissionId } },
                    })),
                },
            },
        });
        return (0, send_response_1.sendResponse)(res, 200, "Create role successfully", role);
    }
    catch (error) {
        return (0, send_response_1.sendResponse)(res, 500, "[CREATE_ROLE]: Internal Error", error === null || error === void 0 ? void 0 : error.message);
    }
});
exports.addRoleController = addRoleController;
const getAllRoleController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const role = yield db_1.db.role.findMany({
            include: {
                permissions: {
                    include: {
                        permission: true,
                    },
                },
                users: true,
                roleMenus: true,
            },
            orderBy: {
                updatedAt: "desc",
            },
        });
        return (0, send_response_1.sendResponse)(res, 200, "Get all role successfully", role);
    }
    catch (error) {
        return (0, send_response_1.sendResponse)(res, 500, "[GET_ALL_ROLE]: Internal Error", error === null || error === void 0 ? void 0 : error.message);
    }
});
exports.getAllRoleController = getAllRoleController;
// const createBulkRolesController = async (req: Request, res: Response) => {
//   try {
//     const body = req?.body;
//     let roles = [];
//     for (const role of body?.roles) {
//       const newRole = await addRole(role);
//       roles.push(newRole);
//     }
//     return sendResponse(res, 200, "Create Bulk role successfully", roles);
//   } catch (error: any) {
//     return sendResponse(
//       res,
//       500,
//       "[CREATE_BULK_ROLE]: Internal Error",
//       error?.message
//     );
//   }
// };
// const addRole = async (data: ExcelRoleProps) => {
//   try {
//     const checkAbbreviation = await db.role.findFirst({
//       where: {
//         abbreviation: data?.abbreviation,
//       },
//     });
//     if (checkAbbreviation) {
//       return {
//         title: data.title,
//         status_upload: "Error",
//       };
//     }
//     const role = await db.role.create({
//       data: {
//         title: data?.title,
//         abbreviation: data?.abbreviation,
//       },
//     });
//     return {
//       title: role.title,
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
const deleteRoleByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req === null || req === void 0 ? void 0 : req.params;
    try {
        if (!params.id) {
            return (0, send_response_1.sendResponse)(res, 400, "Role Id not found");
        }
        const role = yield db_1.db.role.findFirst({
            where: {
                id: params.id,
            },
        });
        if (!role) {
            return (0, send_response_1.sendResponse)(res, 400, "Role not found");
        }
        const deleteRole = yield db_1.db.role.delete({
            where: {
                id: params.id,
            },
        });
        return (0, send_response_1.sendResponse)(res, 200, "Delete role successfully", deleteRole);
    }
    catch (error) {
        return (0, send_response_1.sendResponse)(res, 500, "[DELETE_ROLE]: Internal Error", error === null || error === void 0 ? void 0 : error.message);
    }
});
exports.deleteRoleByIdController = deleteRoleByIdController;
const getRoleByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req === null || req === void 0 ? void 0 : req.params;
    try {
        if (!params.id) {
            return (0, send_response_1.sendResponse)(res, 400, "Role Id not found");
        }
        const role = yield db_1.db.role.findFirst({
            where: {
                id: params.id,
            },
            include: {
                permissions: {
                    include: {
                        permission: true,
                    },
                },
                users: true,
                roleMenus: true,
            },
        });
        if (!role) {
            return (0, send_response_1.sendResponse)(res, 400, "Role not found");
        }
        return (0, send_response_1.sendResponse)(res, 200, "Get role by id successfully", role);
    }
    catch (error) {
        return (0, send_response_1.sendResponse)(res, 500, "[GET_ROLE_BY_ID]: Internal Error", error === null || error === void 0 ? void 0 : error.message);
    }
});
exports.getRoleByIdController = getRoleByIdController;
const updateRoleByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req === null || req === void 0 ? void 0 : req.params;
    const body = req === null || req === void 0 ? void 0 : req.body;
    try {
        if (!params.id) {
            return (0, send_response_1.sendResponse)(res, 400, "Role Id not found");
        }
        const existingRole = yield db_1.db.role.findFirst({
            where: {
                id: params.id,
            },
            include: { permissions: true },
        });
        if (!existingRole) {
            return (0, send_response_1.sendResponse)(res, 400, "Role not found");
        }
        if (existingRole.roleName !== (body === null || body === void 0 ? void 0 : body.roleName)) {
            const checkRoleName = yield db_1.db.role.findFirst({
                where: {
                    roleName: body === null || body === void 0 ? void 0 : body.roleName,
                },
            });
            if (checkRoleName) {
                return (0, send_response_1.sendResponse)(res, 400, "Role Name is already exist");
            }
        }
        // Remove existing RolePermission records
        const removeRole = yield db_1.db.rolePermission.deleteMany({
            where: {
                roleId: params === null || params === void 0 ? void 0 : params.id,
            },
        });
        // Create new RolePermission records
        yield Promise.all(body === null || body === void 0 ? void 0 : body.permissionIds.map((permissionId) => db_1.db.rolePermission.create({
            data: {
                roleId: params === null || params === void 0 ? void 0 : params.id,
                permissionId,
            },
        })));
        // Update the role without changing permissions directly
        const updatedRole = yield db_1.db.role.update({
            where: { id: params === null || params === void 0 ? void 0 : params.id },
            data: {
                displayName: body === null || body === void 0 ? void 0 : body.displayName,
                roleName: body === null || body === void 0 ? void 0 : body.roleName,
                description: body === null || body === void 0 ? void 0 : body.description,
                status: body === null || body === void 0 ? void 0 : body.status,
            },
        });
        return (0, send_response_1.sendResponse)(res, 200, "Update role by id successfully", removeRole);
    }
    catch (error) {
        if (error instanceof library_1.PrismaClientValidationError) {
            console.error("Prisma Client Validation Error:", error.message);
        }
        else {
            console.error("Unexpected Error:", error);
        }
        return (0, send_response_1.sendResponse)(res, 500, "[UPDATE_ROLE_BY_ID]: Internal Error", error.message);
    }
});
exports.updateRoleByIdController = updateRoleByIdController;
