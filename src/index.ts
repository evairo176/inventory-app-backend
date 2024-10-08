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
  permissionsRoutes,
  posRoutes,
  productRoutes,
  rolesRoutes,
  suppliersRoutes,
  unitsRoutes,
  usersRoutes,
  warehousesRoutes,
} from "./routes";
import { Logger } from "./utils";

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

// error handler
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  Logger.log(`[server]: Server is running at http://localhost:${port}`);
});
