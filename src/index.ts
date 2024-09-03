import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { errorHandler, notFound } from "./middleware";
import { brandsRoutes } from "./routes/brand-routes";
import { categoriesRoutes } from "./routes/category-routes";
import { warehousesRoutes } from "./routes/warehouse-routes";
import { suppliersRoutes } from "./routes/supplier-routes";
import { unitsRoutes } from "./routes/unit-routes";
import { productRoutes } from "./routes/product-routes";
import Logger from "./utils/logger";
import { rolesRoutes } from "./routes/role-routes";
import { permissionsRoutes } from "./routes/permission-routes";
import { usersRoutes } from "./routes/user-routes";
import { authRoutes } from "./routes/auth-routes";

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

// error handler
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  Logger.log(`[server]: Server is running at http://localhost:${port}`);
});
