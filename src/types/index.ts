export type ExcelCategoryProps = {
  imageurl: string;
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
