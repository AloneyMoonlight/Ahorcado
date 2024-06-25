import express from "express";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import indexRouter from "./frontend/routes/index.js";
import "dotenv/config";

let PORT = process.env.PORT || 3000;

const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));

app.set("views", join(__dirname, "frontend/views"));

app.set("view engine", "ejs");

app.use(express.static(join(__dirname, "frontend/public")));

app.use(indexRouter);

app.listen(PORT, () => {
  console.log("Server is running on port http://localhost:" + PORT);
});
