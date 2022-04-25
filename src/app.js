import express from "express";
import dotenv from "dotenv";
import routes from "./routes/index.routes.js";

dotenv.config();

const app = express();
const router = express.Router();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes(router));

export default app;
