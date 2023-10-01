import express from "express";
import cors from "cors";
import morgan from "morgan";
import { router } from "./routes";
import { R4XX, R5XX } from "./API";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { MulterError } from "multer";
import "./configs/dbConfig";
// --------------------------------------------------->>
const app = express();
const __filename = fileURLToPath(import.meta.url);
// --------------------------------------------------->>
//Middle-wares
app.use(express.static(path.join(dirname(__filename), "../uploads")));
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    credentials: true,
  })
);

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/backend/api/", router);

app.use((error, req, res, next) => {
  R5XX(
    res,
    500,
    "INTERNAL-SERVER-ERROR",
    "Some unexpected error occurred on server-side.",
    { error: error?.message }
  );
});
// --------------------------------------------------->>
export default app;
