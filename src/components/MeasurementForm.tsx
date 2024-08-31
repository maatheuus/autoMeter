import React, { useState } from "react";
import { MeasurementFormProps } from "../interfaces";

const MeasurementForm: React.FC<MeasurementFormProps> = ({
  onSubmit,
  handleFinalSubmit,
}) => {
  const [customerCode, setCustomerCode] = useState<string>("");
  const [measureType, setMeasureType] = useState<"WATER" | "GAS">("WATER");
  const [measureDatetime, setMeasureDatetime] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      customer_code: customerCode,
      measure_type: measureType,
      measure_datetime: measureDatetime,
    });
  };

  return (
    <div className="bg-white p-8 rounded shadow-md max-w-sm w-full mx-auto md:max-h-96">
      <h1 className="text-2xl font-bold mb-4">Envio de Dados</h1>
      <form onSubmit={handleSubmit} className="measurement-form">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Código do Usuário
          </label>
          <input
            type="text"
            value={customerCode}
            onChange={(e) => setCustomerCode(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Digite o código do usuário"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Tipo de Imagem
          </label>
          <select
            value={measureType}
            onChange={(e) => setMeasureType(e.target.value as "WATER" | "GAS")}
            required
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="all">All</option>
            <option value="WATER">Water</option>
            <option value="GAS">Gas</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Data</label>
          <input
            type="datetime"
            value={measureDatetime}
            onChange={(e) => setMeasureDatetime(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <button
          type="submit"
          onClick={handleFinalSubmit}
          className="w-full p-2  text-white font-bold rounded bg-blue-500 transition-all duration-300 hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default MeasurementForm;
