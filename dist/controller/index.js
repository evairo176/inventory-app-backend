"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllWarehouseController = exports.addWarehouseController = exports.updateInviteSentUserController = exports.updateUserByIdController = exports.getUserByIdController = exports.deleteUserByIdController = exports.createBulkUsersController = exports.getAllUserController = exports.addUserController = exports.updateUnitByIdController = exports.getUnitByIdController = exports.deleteUnitByIdController = exports.createBulkUnitsController = exports.getAllUnitController = exports.addUnitController = exports.updateSupplierByIdController = exports.getSupplierByIdController = exports.deleteSupplierByIdController = exports.createBulkSuppliersController = exports.getAllSupplierController = exports.addSupplierController = exports.updateRoleByIdController = exports.getRoleByIdController = exports.deleteRoleByIdController = exports.getAllRoleController = exports.addRoleController = exports.updateProductByIdController = exports.getProductByIdController = exports.deleteProductByIdController = exports.createBulkProductsController = exports.getAllProductController = exports.addProductController = exports.updatePermissionByIdController = exports.getPermissionByIdController = exports.deletePermissionByIdController = exports.getAllPermissionController = exports.addPermissionController = exports.updateCategoryByIdController = exports.getCategoryByIdController = exports.deleteCategoryByIdController = exports.createBulkCategoriesController = exports.getAllCategoryController = exports.addCategoryController = exports.updateBrandByIdController = exports.getBrandByIdController = exports.deleteBrandByIdController = exports.createBulkBrandsController = exports.getAllBrandController = exports.addBrandController = exports.loginController = void 0;
exports.getAllHomeAdvertController = exports.getAllHomeBannerController = exports.updateAdvertByIdController = exports.getAdvertByIdController = exports.deleteAdvertByIdController = exports.createBulkAdvertController = exports.getAllAdvertController = exports.addAdvertController = exports.updateSubCategoryByIdController = exports.getSubCategoryByIdController = exports.deleteSubCategoryByIdController = exports.createBulkSubCategoryController = exports.getAllSubCategoryController = exports.addSubCategoryController = exports.updateMainCategoryByIdController = exports.getMainCategoryByIdController = exports.deleteMainCategoryByIdController = exports.createBulkMainCategoryController = exports.getAllMainCategoryController = exports.addMainCategoryController = exports.getAnalyticController = exports.getAllCustomerController = exports.createCustomerController = exports.getOrderController = exports.createLineOrderController = exports.updateWarehouseByIdController = exports.getWarehouseByIdController = exports.deleteWarehouseByIdController = exports.createBulkWarehousesController = void 0;
const analytic_1 = require("./analytic");
Object.defineProperty(exports, "getAnalyticController", { enumerable: true, get: function () { return analytic_1.getAnalyticController; } });
const auth_1 = require("./auth");
Object.defineProperty(exports, "loginController", { enumerable: true, get: function () { return auth_1.loginController; } });
const advert_1 = require("./advert");
Object.defineProperty(exports, "addAdvertController", { enumerable: true, get: function () { return advert_1.addAdvertController; } });
Object.defineProperty(exports, "createBulkAdvertController", { enumerable: true, get: function () { return advert_1.createBulkAdvertController; } });
Object.defineProperty(exports, "deleteAdvertByIdController", { enumerable: true, get: function () { return advert_1.deleteAdvertByIdController; } });
Object.defineProperty(exports, "getAllAdvertController", { enumerable: true, get: function () { return advert_1.getAllAdvertController; } });
Object.defineProperty(exports, "getAdvertByIdController", { enumerable: true, get: function () { return advert_1.getAdvertByIdController; } });
Object.defineProperty(exports, "updateAdvertByIdController", { enumerable: true, get: function () { return advert_1.updateAdvertByIdController; } });
const brand_1 = require("./brand");
Object.defineProperty(exports, "addBrandController", { enumerable: true, get: function () { return brand_1.addBrandController; } });
Object.defineProperty(exports, "getAllBrandController", { enumerable: true, get: function () { return brand_1.getAllBrandController; } });
Object.defineProperty(exports, "createBulkBrandsController", { enumerable: true, get: function () { return brand_1.createBulkBrandsController; } });
Object.defineProperty(exports, "deleteBrandByIdController", { enumerable: true, get: function () { return brand_1.deleteBrandByIdController; } });
Object.defineProperty(exports, "getBrandByIdController", { enumerable: true, get: function () { return brand_1.getBrandByIdController; } });
Object.defineProperty(exports, "updateBrandByIdController", { enumerable: true, get: function () { return brand_1.updateBrandByIdController; } });
const category_1 = require("./category");
Object.defineProperty(exports, "addCategoryController", { enumerable: true, get: function () { return category_1.addCategoryController; } });
Object.defineProperty(exports, "getAllCategoryController", { enumerable: true, get: function () { return category_1.getAllCategoryController; } });
Object.defineProperty(exports, "createBulkCategoriesController", { enumerable: true, get: function () { return category_1.createBulkCategoriesController; } });
Object.defineProperty(exports, "deleteCategoryByIdController", { enumerable: true, get: function () { return category_1.deleteCategoryByIdController; } });
Object.defineProperty(exports, "getCategoryByIdController", { enumerable: true, get: function () { return category_1.getCategoryByIdController; } });
Object.defineProperty(exports, "updateCategoryByIdController", { enumerable: true, get: function () { return category_1.updateCategoryByIdController; } });
const customer_1 = require("./customer");
Object.defineProperty(exports, "createCustomerController", { enumerable: true, get: function () { return customer_1.createCustomerController; } });
Object.defineProperty(exports, "getAllCustomerController", { enumerable: true, get: function () { return customer_1.getAllCustomerController; } });
const main_category_1 = require("./main-category");
Object.defineProperty(exports, "addMainCategoryController", { enumerable: true, get: function () { return main_category_1.addMainCategoryController; } });
Object.defineProperty(exports, "createBulkMainCategoryController", { enumerable: true, get: function () { return main_category_1.createBulkMainCategoryController; } });
Object.defineProperty(exports, "deleteMainCategoryByIdController", { enumerable: true, get: function () { return main_category_1.deleteMainCategoryByIdController; } });
Object.defineProperty(exports, "getAllMainCategoryController", { enumerable: true, get: function () { return main_category_1.getAllMainCategoryController; } });
Object.defineProperty(exports, "getMainCategoryByIdController", { enumerable: true, get: function () { return main_category_1.getMainCategoryByIdController; } });
Object.defineProperty(exports, "updateMainCategoryByIdController", { enumerable: true, get: function () { return main_category_1.updateMainCategoryByIdController; } });
const permission_1 = require("./permission");
Object.defineProperty(exports, "addPermissionController", { enumerable: true, get: function () { return permission_1.addPermissionController; } });
Object.defineProperty(exports, "getAllPermissionController", { enumerable: true, get: function () { return permission_1.getAllPermissionController; } });
Object.defineProperty(exports, "deletePermissionByIdController", { enumerable: true, get: function () { return permission_1.deletePermissionByIdController; } });
Object.defineProperty(exports, "getPermissionByIdController", { enumerable: true, get: function () { return permission_1.getPermissionByIdController; } });
Object.defineProperty(exports, "updatePermissionByIdController", { enumerable: true, get: function () { return permission_1.updatePermissionByIdController; } });
const pos_1 = require("./pos");
Object.defineProperty(exports, "createLineOrderController", { enumerable: true, get: function () { return pos_1.createLineOrderController; } });
Object.defineProperty(exports, "getOrderController", { enumerable: true, get: function () { return pos_1.getOrderController; } });
const product_1 = require("./product");
Object.defineProperty(exports, "addProductController", { enumerable: true, get: function () { return product_1.addProductController; } });
Object.defineProperty(exports, "getAllProductController", { enumerable: true, get: function () { return product_1.getAllProductController; } });
Object.defineProperty(exports, "createBulkProductsController", { enumerable: true, get: function () { return product_1.createBulkProductsController; } });
Object.defineProperty(exports, "deleteProductByIdController", { enumerable: true, get: function () { return product_1.deleteProductByIdController; } });
Object.defineProperty(exports, "getProductByIdController", { enumerable: true, get: function () { return product_1.getProductByIdController; } });
Object.defineProperty(exports, "updateProductByIdController", { enumerable: true, get: function () { return product_1.updateProductByIdController; } });
const role_1 = require("./role");
Object.defineProperty(exports, "addRoleController", { enumerable: true, get: function () { return role_1.addRoleController; } });
Object.defineProperty(exports, "getAllRoleController", { enumerable: true, get: function () { return role_1.getAllRoleController; } });
Object.defineProperty(exports, "deleteRoleByIdController", { enumerable: true, get: function () { return role_1.deleteRoleByIdController; } });
Object.defineProperty(exports, "getRoleByIdController", { enumerable: true, get: function () { return role_1.getRoleByIdController; } });
Object.defineProperty(exports, "updateRoleByIdController", { enumerable: true, get: function () { return role_1.updateRoleByIdController; } });
const sub_category_1 = require("./sub-category");
Object.defineProperty(exports, "addSubCategoryController", { enumerable: true, get: function () { return sub_category_1.addSubCategoryController; } });
Object.defineProperty(exports, "createBulkSubCategoryController", { enumerable: true, get: function () { return sub_category_1.createBulkSubCategoryController; } });
Object.defineProperty(exports, "deleteSubCategoryByIdController", { enumerable: true, get: function () { return sub_category_1.deleteSubCategoryByIdController; } });
Object.defineProperty(exports, "getAllSubCategoryController", { enumerable: true, get: function () { return sub_category_1.getAllSubCategoryController; } });
Object.defineProperty(exports, "getSubCategoryByIdController", { enumerable: true, get: function () { return sub_category_1.getSubCategoryByIdController; } });
Object.defineProperty(exports, "updateSubCategoryByIdController", { enumerable: true, get: function () { return sub_category_1.updateSubCategoryByIdController; } });
const supplier_1 = require("./supplier");
Object.defineProperty(exports, "addSupplierController", { enumerable: true, get: function () { return supplier_1.addSupplierController; } });
Object.defineProperty(exports, "getAllSupplierController", { enumerable: true, get: function () { return supplier_1.getAllSupplierController; } });
Object.defineProperty(exports, "createBulkSuppliersController", { enumerable: true, get: function () { return supplier_1.createBulkSuppliersController; } });
Object.defineProperty(exports, "deleteSupplierByIdController", { enumerable: true, get: function () { return supplier_1.deleteSupplierByIdController; } });
Object.defineProperty(exports, "getSupplierByIdController", { enumerable: true, get: function () { return supplier_1.getSupplierByIdController; } });
Object.defineProperty(exports, "updateSupplierByIdController", { enumerable: true, get: function () { return supplier_1.updateSupplierByIdController; } });
const unit_1 = require("./unit");
Object.defineProperty(exports, "addUnitController", { enumerable: true, get: function () { return unit_1.addUnitController; } });
Object.defineProperty(exports, "getAllUnitController", { enumerable: true, get: function () { return unit_1.getAllUnitController; } });
Object.defineProperty(exports, "createBulkUnitsController", { enumerable: true, get: function () { return unit_1.createBulkUnitsController; } });
Object.defineProperty(exports, "deleteUnitByIdController", { enumerable: true, get: function () { return unit_1.deleteUnitByIdController; } });
Object.defineProperty(exports, "getUnitByIdController", { enumerable: true, get: function () { return unit_1.getUnitByIdController; } });
Object.defineProperty(exports, "updateUnitByIdController", { enumerable: true, get: function () { return unit_1.updateUnitByIdController; } });
const user_1 = require("./user");
Object.defineProperty(exports, "addUserController", { enumerable: true, get: function () { return user_1.addUserController; } });
Object.defineProperty(exports, "getAllUserController", { enumerable: true, get: function () { return user_1.getAllUserController; } });
Object.defineProperty(exports, "createBulkUsersController", { enumerable: true, get: function () { return user_1.createBulkUsersController; } });
Object.defineProperty(exports, "deleteUserByIdController", { enumerable: true, get: function () { return user_1.deleteUserByIdController; } });
Object.defineProperty(exports, "getUserByIdController", { enumerable: true, get: function () { return user_1.getUserByIdController; } });
Object.defineProperty(exports, "updateUserByIdController", { enumerable: true, get: function () { return user_1.updateUserByIdController; } });
Object.defineProperty(exports, "updateInviteSentUserController", { enumerable: true, get: function () { return user_1.updateInviteSentUserController; } });
const warehouse_1 = require("./warehouse");
Object.defineProperty(exports, "addWarehouseController", { enumerable: true, get: function () { return warehouse_1.addWarehouseController; } });
Object.defineProperty(exports, "getAllWarehouseController", { enumerable: true, get: function () { return warehouse_1.getAllWarehouseController; } });
Object.defineProperty(exports, "createBulkWarehousesController", { enumerable: true, get: function () { return warehouse_1.createBulkWarehousesController; } });
Object.defineProperty(exports, "deleteWarehouseByIdController", { enumerable: true, get: function () { return warehouse_1.deleteWarehouseByIdController; } });
Object.defineProperty(exports, "getWarehouseByIdController", { enumerable: true, get: function () { return warehouse_1.getWarehouseByIdController; } });
Object.defineProperty(exports, "updateWarehouseByIdController", { enumerable: true, get: function () { return warehouse_1.updateWarehouseByIdController; } });
const home_1 = require("./home");
Object.defineProperty(exports, "getAllHomeAdvertController", { enumerable: true, get: function () { return home_1.getAllHomeAdvertController; } });
Object.defineProperty(exports, "getAllHomeBannerController", { enumerable: true, get: function () { return home_1.getAllHomeBannerController; } });
