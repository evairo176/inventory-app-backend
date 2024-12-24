"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const middleware_1 = require("./middleware");
const routes_1 = require("./routes");
const utils_1 = require("./utils");
const customer_1 = require("./routes/customer");
const analytic_1 = require("./routes/analytic");
// const CryptoJS = require("crypto-js");
// const MD5 = require("crypto-js/md5");
// var ReverseMd5 = require("reverse-md5");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
// cookie
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, morgan_1.default)("tiny"));
// categories routes
app.use("/api/category", routes_1.categoriesRoutes);
// brands routes
app.use("/api/brand", routes_1.brandsRoutes);
// brands routes
app.use("/api/warehouse", routes_1.warehousesRoutes);
// suppliers routes
app.use("/api/supplier", routes_1.suppliersRoutes);
// units routes
app.use("/api/unit", routes_1.unitsRoutes);
// products routes
app.use("/api/product", routes_1.productRoutes);
// roles routes
app.use("/api/role", routes_1.rolesRoutes);
// permissions routes
app.use("/api/permission", routes_1.permissionsRoutes);
// user routes
app.use("/api/user", routes_1.usersRoutes);
// auth routes
app.use("/api/auth", routes_1.authRoutes);
// pos routes
app.use("/api/pos", routes_1.posRoutes);
// pos routes
app.use("/api/customer", customer_1.customersRoutes);
// analytic routes
app.use("/api/analytic", analytic_1.analyticRoutes);
// main category routes
app.use("/api/main-category", routes_1.mainCategoriesRoutes);
// sub category routes
app.use("/api/sub-category", routes_1.subCategoriesRoutes);
// advert routes
app.use("/api/advert", routes_1.advertRoutes);
// home routes
app.use("/api/home", routes_1.homeRoutes);
// error handler
app.use(middleware_1.notFound);
app.use(middleware_1.errorHandler);
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
    utils_1.Logger.log(`[server]: Server is running at http://localhost:${port}`);
});
