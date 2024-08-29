import { generateContentFunc } from "../service/geminiService";
// import multer, { StorageEngine, FileFilterCallback } from "multer";
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import Customer from "../models/customerModel";

/*
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
*/

/** UPLOAD THE DATA */

export const uploadGeminiData = async (req: Request, res: Response) => {
  const data = req.body;
  const measure_uuid = uuidv4();
  if (!data) {
    return res.status(400).json({
      error_description: "Enter a valid input",
    });
  }
  try {
    const string = await generateContentFunc(data.image);
    const regex: RegExp = /\d+(?:,\d+)?/g;
    const convert: RegExpMatchArray | null = string.match(regex);
    const valor: number | null = convert
      ? parseFloat(convert?.join("."))
      : null;

    const customer = await Customer.findOne({
      "customer.customer_code": data.customer_code,
    });

    const measure = {
      measure_uuid,
      measure_datetime: data.measure_datetime,
      measure_type: data.measure_type,
      measure_value: valor,
    };

    if (!customer) {
      await Customer.create({
        "customer.customer_code": data.customer_code,
        measures: [measure],
      });
    } else {
      await Customer.updateOne(
        { "customer.customer_code": data.customer_code },
        { $push: { measures: [measure] } }
      );
    }

    res.status(200).json({
      message: "Operação realizada com sucesso",
      data: {
        // image_url: value,
        measure_value: valor,
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

/** CONFIRM THE DATA */

interface ConfirmMeasurementBody {
  measure_uuid: string;
  confirmed_value: number;
  customer_code: string | number;
}

export const confirmMeasurementBody = async (req: Request, res: Response) => {
  const {
    measure_uuid,
    confirmed_value,
    customer_code,
  }: ConfirmMeasurementBody = req.body;

  try {
    if (typeof confirmed_value !== "number" || isNaN(confirmed_value)) {
      return res.status(400).json({
        error_code: "INVALID_DATA",
        error_description: "confirmed_value must be a valid number.",
      });
    }

    const customer = await Customer.findOne({
      "customer.customer_code": customer_code,
    });

    if (customer) {
      const measure = customer.measures.find(
        (measure) => measure.measure_uuid === measure_uuid
      );

      if (!measure) {
        return res.status(404).json({
          error_code: "INVALID_DATA",
          error_description: "Leitura não encontrada",
        });
      }

      if (measure?.has_confirmed) {
        return res.status(409).json({
          error_code: "INVALID_DATA",
          error_description: "Leitura do mês já confirmada",
        });
      }

      if (measure && confirmed_value) {
        await Customer.updateMany(
          { "measures.measure_uuid": measure.measure_uuid },
          {
            $set: {
              "measures.$[elem].has_confirmed": true,
              "measures.$[elem].measure_value": confirmed_value,
            },
          },
          { arrayFilters: [{ "elem.measure_uuid": measure.measure_uuid }] }
        );
        return res.status(200).json({ success: true });
      }
    } else {
      return res.status(404).json({
        error_code: "INVALID_DATA",
        error_description: "Usuário não encontrado",
      });
    }
  } catch (error) {
    console.log("error confirm", error);
    return res.status(500).json({
      error_code: "INTERNAL_SERVER_ERROR",
      error_description: "An unexpected error occurred.",
      error_message: error,
    });
  }
};

export const getMeasureList = async (req: Request, res: Response) => {
  const { customer_code } = req.params;
  const measure_type = req.query?.measure_type as string;
  const upperMeasureType = measure_type?.toUpperCase();

  try {
    const customer = await Customer.findOne({
      "customer.customer_code": customer_code,
    });

    if (!customer) {
      return res.status(404).json({
        error_code: "INVALID_TYPE",
        error_description: "Nenhum customer foi encontrado",
      });
    }

    const data = {
      customer_code,
      measures: customer.measures,
    };

    if (measure_type) {
      if (upperMeasureType !== "WATER" && upperMeasureType !== "GAS") {
        return res.status(400).json({
          error_code: "INVALID_TYPE",
          error_description: "Tipo de medição não permitida",
        });
      } else {
        const data = customer.measures.filter(
          (type) => type.measure_type === upperMeasureType
        );
        return res.status(200).json({ success: true, data });
      }
    }

    if (customer.measures.length === 0) {
      return res.status(404).json({
        error_code: "MEASURES_NOT_FOUND",
        error_description: "Nenhuma leitura encontrada",
      });
    }

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.log("measure list error", error);
  }
};
