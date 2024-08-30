import { Router } from "express";

import {
  uploadGeminiData,
  confirmMeasurementBody,
  getMeasureList,
} from "../controllers/geminiController";

export const router = Router();

// receiving the image from the user
router.post("/upload", uploadGeminiData);

// confirm the data
router.patch("/confirm", confirmMeasurementBody);

// get the data from the user
router.get("/:customer_code/list", getMeasureList);
