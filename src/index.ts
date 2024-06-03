import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { categoriesRoute } from "./routes/category-route";

dotenv.config();

const app = express();
const port = process.env.PORT;
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
// show image

// categories routes
app.use("/api/category", categoriesRoute);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
