import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });

import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai";

interface GenerativeModelOptions {
  model: string;
}

const geminiApiKey: string = process.env.GEMINI_API_KEY || "";
console.log("geminiApiKey", geminiApiKey);

if (!geminiApiKey) {
  throw new Error("API_KEY environment variable is required.");
}

const genAI = new GoogleGenerativeAI(geminiApiKey);

const modelOptions: GenerativeModelOptions = { model: "gemini-1.5-flash" };

const model = genAI.getGenerativeModel(modelOptions) as GenerativeModel;

async function run() {
  const prompt = "Write a story about an AI and magic";

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
}

run();
