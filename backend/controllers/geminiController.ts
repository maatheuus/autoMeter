import { generateContentFunc } from "../service/geminiService";
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { ConfirmMeasurementBody, Measure } from "../service/types";
import Customer from "../models/customerModel";

/** UPLOAD THE DATA */

export const uploadGeminiData = async (
  req: Request,
  res: Response
): Promise<void> => {
  const data = req.body;

  if (!data) {
    res.status(400).json({
      error_description: "Enter a valid input",
    });
    return;
  }

  try {
    const measure_uuid = uuidv4();
    const generatedString = await generateContentFunc(data.image);
    const regex: RegExp = /\d+(?:,\d+)?/g;
    const matches: RegExpMatchArray | null = generatedString.match(regex);
    const measureValue: number | null = matches
      ? parseFloat(matches?.join("."))
      : null;

    const measure: Measure = {
      measure_uuid,
      measure_datetime: data.measure_datetime,
      measure_type: data.measure_type,
      measure_value: measureValue,
    };

    const customer = await Customer.findOne({
      "customer.customer_code": data.customer_code,
    });

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
        measure_value: measureValue,
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

export const confirmMeasurementBody = async (
  req: Request,
  res: Response
): Promise<void> => {
  const {
    measure_uuid,
    confirmed_value,
    customer_code,
  }: ConfirmMeasurementBody = req.body;

  if (typeof confirmed_value !== "number" || isNaN(confirmed_value)) {
    res.status(400).json({
      error_code: "INVALID_DATA",
      error_description: "confirmed_value must be a valid number.",
    });
    return;
  }

  try {
    const customer = await Customer.findOne({
      "customer.customer_code": customer_code,
    });

    if (!customer) {
      res.status(404).json({
        error_code: "INVALID_DATA",
        error_description: "Usuário não encontrado",
      });
      return;
    }

    const measure = customer?.measures?.find(
      (m) => m.measure_uuid === measure_uuid
    );

    if (!measure) {
      res.status(404).json({
        error_code: "INVALID_DATA",
        error_description: "Leitura não encontrada",
      });
      return;
    }

    if (measure?.has_confirmed) {
      res.status(409).json({
        error_code: "INVALID_DATA",
        error_description: "Leitura do mês já confirmada",
      });
      return;
    }

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

    res.status(200).json({ success: true });
  } catch (error) {
    console.log("error confirm", error);
    res.status(500).json({
      error_code: "INTERNAL_SERVER_ERROR",
      error_description: "An unexpected error occurred.",
      error_message: error,
    });
  }
};

export const getMeasureList = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { customer_code } = req.params;
  const measure_type = req.query?.measure_type as string;
  const upperMeasureType = measure_type?.toUpperCase();

  try {
    const customer = await Customer.findOne({
      "customer.customer_code": customer_code,
    });

    if (!customer) {
      res.status(404).json({
        error_code: "INVALID_TYPE",
        error_description: "Nenhum customer foi encontrado",
      });
      return;
    }

    if (measure_type) {
      if (upperMeasureType !== "WATER" && upperMeasureType !== "GAS") {
        res.status(400).json({
          error_code: "INVALID_TYPE",
          error_description: "Tipo de medição não permitida",
        });
        return;
      }
      const filteredMeasures = customer.measures.filter(
        (m) => m.measure_type === upperMeasureType
      );
      res.status(200).json({ success: true, data: filteredMeasures });
      return;
    }

    if (customer.measures.length === 0) {
      res.status(404).json({
        error_code: "MEASURES_NOT_FOUND",
        error_description: "Nenhuma leitura encontrada",
      });
      return;
    }

    const data = {
      customer_code,
      measures: customer.measures,
    };

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.log("measure list error", error);
    res.status(500).json({
      error_code: "INTERNAL_SERVER_ERROR",
      error_description: "An unexpected error occurred.",
      error_message: error.message,
    });
  }
};
