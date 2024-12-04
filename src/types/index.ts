import {
  Role as PrismaRole,
  User as PrismaUser,
  Customer as PrismaCustomer,
  Permission as PrismaPermission,
  RolePermission as PrismaRolePermission,
  RoleMenu as PrismaRoleMenu,
} from "@prisma/client";

export type ExcelCategoryProps = {
  imageUrl: string;
  title: string;
};

export type ExcelBrandProps = {
  imageUrl: string;
  title: string;
};

export type ExcelUnitProps = {
  title: string;
  abbreviation: string;
};

export type ExcelWarehouseProps = {
  name: string;
  slug: string;
  state: string;
  country: string;
  city: string;
  phone: string;
  contactPerson: string;
  email: string;
  zipCode: string;
  status: string;
  imageUrl: string;
};

export type ExcelSupplierProps = {
  name: string;
  imageUrl: string;
  companyName: string;
  vatNumber: string;
  email: string;
  phone: string;
  address: string;
  country: string;
  state: string;
  city: string;
  postalCode: string;
  status: string;
};

export type ExcelProductProps = {
  name: string;
  slug: string;
  productCode: string;
  stockQty: number;
  supplierId: string;
  brandId: string;
  categoryId: string;
  unitId: string;
  productCost: number;
  productPrice: number;
  alertQty: number;
  productTax: number;
  taxMethod: string;
  productImages: string[];
  productThumbnail: string;
  productDetails: string;
  status: string;
};

// Define the Role type with related fields
export type Role = PrismaRole & {
  permissions: RolePermission[];
  users: User[];
  roleMenus: RoleMenu[];
};

// Define the Permissions type with related fields
export type Permissions = PrismaPermission & {
  permissions: RolePermission[];
};

// Define the RolePermission type
export type RolePermission = PrismaRolePermission & {
  role: Role;
};

// Define the User type
export type User = PrismaUser & {
  role: Role;
};

// Define the customer type
export type Customer = PrismaCustomer & {
  user: User;
};

// Define the RoleMenu type
export type RoleMenu = PrismaRoleMenu & {
  role: Role;
  menu: Menu;
};

// Define the Menu type (you'll need to define the Menu model similarly)
export type Menu = {
  id: string;
  name: string;
  path: string;
  icon?: string;
  parentId?: string;
  parent?: Menu;
  children?: Menu[];
  roles?: RoleMenu[];
};
