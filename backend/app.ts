import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });

import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import { router as routerGemini } from "./routes/geminiRoutes";

const app = express();

// Middlewares
app.use(cors());
// app.use(bodyParser.json());

// Body parser, reading data from body into req.body
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Routes
app.use("/api/v1/", routerGemini);

export default app;
