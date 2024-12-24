import { getAnalyticController } from "./analytic";
import { loginController } from "./auth";
import {
  addAdvertController,
  createBulkAdvertController,
  deleteAdvertByIdController,
  getAllAdvertController,
  getAdvertByIdController,
  updateAdvertByIdController,
} from "./advert";
import {
  addBrandController,
  getAllBrandController,
  createBulkBrandsController,
  deleteBrandByIdController,
  getBrandByIdController,
  updateBrandByIdController,
} from "./brand";
import {
  addCategoryController,
  getAllCategoryController,
  createBulkCategoriesController,
  deleteCategoryByIdController,
  getCategoryByIdController,
  updateCategoryByIdController,
} from "./category";
import { createCustomerController, getAllCustomerController } from "./customer";
import {
  addMainCategoryController,
  createBulkMainCategoryController,
  deleteMainCategoryByIdController,
  getAllMainCategoryController,
  getMainCategoryByIdController,
  updateMainCategoryByIdController,
} from "./main-category";
import {
  addPermissionController,
  getAllPermissionController,
  deletePermissionByIdController,
  getPermissionByIdController,
  updatePermissionByIdController,
} from "./permission";
import { createLineOrderController, getOrderController } from "./pos";
import {
  addProductController,
  getAllProductController,
  createBulkProductsController,
  deleteProductByIdController,
  getProductByIdController,
  updateProductByIdController,
} from "./product";
import {
  addRoleController,
  getAllRoleController,
  deleteRoleByIdController,
  getRoleByIdController,
  updateRoleByIdController,
} from "./role";
import {
  addSubCategoryController,
  createBulkSubCategoryController,
  deleteSubCategoryByIdController,
  getAllSubCategoryController,
  getSubCategoryByIdController,
  updateSubCategoryByIdController,
} from "./sub-category";
import {
  addSupplierController,
  getAllSupplierController,
  createBulkSuppliersController,
  deleteSupplierByIdController,
  getSupplierByIdController,
  updateSupplierByIdController,
} from "./supplier";
import {
  addUnitController,
  getAllUnitController,
  createBulkUnitsController,
  deleteUnitByIdController,
  getUnitByIdController,
  updateUnitByIdController,
} from "./unit";
import {
  addUserController,
  getAllUserController,
  createBulkUsersController,
  deleteUserByIdController,
  getUserByIdController,
  updateUserByIdController,
  updateInviteSentUserController,
} from "./user";
import {
  addWarehouseController,
  getAllWarehouseController,
  createBulkWarehousesController,
  deleteWarehouseByIdController,
  getWarehouseByIdController,
  updateWarehouseByIdController,
} from "./warehouse";
import { getAllHomeAdvertController, getAllHomeBannerController } from "./home";

export {
  // start auth
  loginController,
  // start brand
  addBrandController,
  getAllBrandController,
  createBulkBrandsController,
  deleteBrandByIdController,
  getBrandByIdController,
  updateBrandByIdController,
  // start category
  addCategoryController,
  getAllCategoryController,
  createBulkCategoriesController,
  deleteCategoryByIdController,
  getCategoryByIdController,
  updateCategoryByIdController,
  // start permission
  addPermissionController,
  getAllPermissionController,
  deletePermissionByIdController,
  getPermissionByIdController,
  updatePermissionByIdController,
  // start product
  addProductController,
  getAllProductController,
  createBulkProductsController,
  deleteProductByIdController,
  getProductByIdController,
  updateProductByIdController,
  // start role
  addRoleController,
  getAllRoleController,
  deleteRoleByIdController,
  getRoleByIdController,
  updateRoleByIdController,
  // start supplier
  addSupplierController,
  getAllSupplierController,
  createBulkSuppliersController,
  deleteSupplierByIdController,
  getSupplierByIdController,
  updateSupplierByIdController,
  // start unit
  addUnitController,
  getAllUnitController,
  createBulkUnitsController,
  deleteUnitByIdController,
  getUnitByIdController,
  updateUnitByIdController,
  // start user
  addUserController,
  getAllUserController,
  createBulkUsersController,
  deleteUserByIdController,
  getUserByIdController,
  updateUserByIdController,
  updateInviteSentUserController,
  // start warehouse
  addWarehouseController,
  getAllWarehouseController,
  createBulkWarehousesController,
  deleteWarehouseByIdController,
  getWarehouseByIdController,
  updateWarehouseByIdController,

  //pos
  createLineOrderController,
  getOrderController,

  //customer
  createCustomerController,
  getAllCustomerController,

  //analytic
  getAnalyticController,

  //main category
  addMainCategoryController,
  getAllMainCategoryController,
  createBulkMainCategoryController,
  deleteMainCategoryByIdController,
  getMainCategoryByIdController,
  updateMainCategoryByIdController,

  // sub category
  addSubCategoryController,
  getAllSubCategoryController,
  createBulkSubCategoryController,
  deleteSubCategoryByIdController,
  getSubCategoryByIdController,
  updateSubCategoryByIdController,

  // advert
  addAdvertController,
  getAllAdvertController,
  createBulkAdvertController,
  deleteAdvertByIdController,
  getAdvertByIdController,
  updateAdvertByIdController,

  // home
  getAllHomeBannerController,
  getAllHomeAdvertController,
};
