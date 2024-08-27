import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });

import cors from "cors";
import express from "express";
import bodyParser from "body-parser";

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

export default app;
