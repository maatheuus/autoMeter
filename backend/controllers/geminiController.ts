// import { generateContentFunc } from "../service/geminiService";
import multer, { StorageEngine, FileFilterCallback } from "multer";
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

const multerStorage: StorageEngine = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
  ) => {
    cb(null, "public/");
  },
  filename: (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
  ) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `image-${Date.now()}.${ext}`);
  },
});

const multerFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Not an image! Please upload only images.", false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

export const uploadUserPhoto = upload.single("image");

export const uploadGeminiData = async (req: Request, res: Response) => {
  const data = req.body;
  const measure_uuid = uuidv4();
  console.log(data);

  if (!data) {
    return res.status(400).json({
      error_description: "Enter a valid input",
    });
  }
  try {
    // const value = await generateContentFunc(`analyze this image and return the total amount to be paid, which is usually labeled as 'Total a Pagar' or 'TOTAL A PAGAR'. return just a numeric value, nothing more`, data);
    res.status(200).json({
      message: "Operação realizada com sucesso",
      data: {
        // image_url: value,
        measure_value: "",
        measure_uuid,
      },
    });
  } catch (error) {
    console.log("error", error);
    res.status(400).json({
      message: "Os dados fornecidos no corpo da requisição são inválidos",
      data: {
        error_code: "INVALID_DATA",
        error_description: "Verifique os dados enviados",
      },
    });
  }
};
