import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { errorHandler, notFound } from "./middleware";
import {
  authRoutes,
  brandsRoutes,
  categoriesRoutes,
  mainCategoriesRoutes,
  permissionsRoutes,
  posRoutes,
  productRoutes,
  rolesRoutes,
  subCategoriesRoutes,
  suppliersRoutes,
  unitsRoutes,
  usersRoutes,
  warehousesRoutes,
} from "./routes";
import { Logger } from "./utils";
import { customersRoutes } from "./routes/customer";
import { analyticRoutes } from "./routes/analytic";
import { decrypt, decryptAES128CBC, encrypt } from "./utils/crypto-js";
// const CryptoJS = require("crypto-js");
// const MD5 = require("crypto-js/md5");
// var ReverseMd5 = require("reverse-md5");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
// cookie
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

// categories routes
app.use("/api/category", categoriesRoutes);

// brands routes
app.use("/api/brand", brandsRoutes);

// brands routes
app.use("/api/warehouse", warehousesRoutes);

// suppliers routes
app.use("/api/supplier", suppliersRoutes);

// units routes
app.use("/api/unit", unitsRoutes);

// products routes
app.use("/api/product", productRoutes);

// roles routes
app.use("/api/role", rolesRoutes);

// permissions routes
app.use("/api/permission", permissionsRoutes);

// user routes
app.use("/api/user", usersRoutes);

// auth routes
app.use("/api/auth", authRoutes);

// pos routes
app.use("/api/pos", posRoutes);

// pos routes
app.use("/api/customer", customersRoutes);

// analytic routes
app.use("/api/analytic", analyticRoutes);

// main category routes
app.use("/api/main-category", mainCategoriesRoutes);

// sub category routes
app.use("/api/sub-category", subCategoriesRoutes);

// error handler
app.use(notFound);
app.use(errorHandler);

// var chiperText =
//   "FLLqEqBzM/x8MUej3WFSLZuAxNgLSUG6WPFvUJ2Pdn1XbhMHq03DtXgXWKGzGWar";
// var key = "y0uc@nts3eMe!...";
// var iv = "";

// key = CryptoJS.enc.Utf8.parse(key);
// iv = CryptoJS.enc.Utf8.parse(iv);

// var decrypted = CryptoJS.AES.decrypt(chiperText, key, {
//   iv: iv,
//   mode: CryptoJS.mode.CBC,
//   padding: CryptoJS.pad.Pkcs7,
// }).toString(CryptoJS.enc.Utf8);

// console.log(decrypted); // TEST50

app.listen(port, () => {
  Logger.log(`[server]: Server is running at http://localhost:${port}`);
});
