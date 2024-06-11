import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { errorHandler, notFound } from "./middleware";
import { brandsRoutes } from "./routes/brand-routes";
import { categoriesRoutes } from "./routes/category-routes";
import { warehousesRoutes } from "./routes/warehouse-routes";

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

// error handler
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
