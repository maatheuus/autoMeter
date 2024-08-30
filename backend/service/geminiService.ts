import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });

import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai";

interface GenerativeModelOptions {
  model: string;
}

const geminiApiKey: string = process.env.GEMINI_API_KEY || "";

if (!geminiApiKey) {
  throw new Error("API_KEY environment variable is required.");
}

const genAI = new GoogleGenerativeAI(geminiApiKey);

const modelOptions: GenerativeModelOptions = { model: "gemini-1.5-flash" };

const model = genAI.getGenerativeModel(modelOptions) as GenerativeModel;

export async function generateContentFunc(imageData: string) {
  const prompt =
    "analyze this image and return the total amount to be paid, which is usually labeled as 'Total a Pagar' or 'TOTAL A PAGAR'. return the numeric number with the float, nothing more";

  const result = await model.generateContent([prompt, imageData]);
  const response = result.response;
  const text = response.text();
  return text;
}
