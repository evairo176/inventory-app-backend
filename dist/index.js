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
const brand_routes_1 = require("./routes/brand-routes");
const category_routes_1 = require("./routes/category-routes");
const warehouse_routes_1 = require("./routes/warehouse-routes");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
// cookie
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, morgan_1.default)("tiny"));
// categories routes
app.use("/api/category", category_routes_1.categoriesRoutes);
// brands routes
app.use("/api/brand", brand_routes_1.brandsRoutes);
// brands routes
app.use("/api/warehouse", warehouse_routes_1.warehousesRoutes);
// error handler
app.use(middleware_1.notFound);
app.use(middleware_1.errorHandler);
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
