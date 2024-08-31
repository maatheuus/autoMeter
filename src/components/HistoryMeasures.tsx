import { formatDate } from "date-fns";
import React, { useRef, useState } from "react";
import { getMeasuresList } from "../api";
import ConfirmModal from "./ConfirmModal";

const HistoryMeasures: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [measuresData, setMeasuresData] = useState<[]>([]);
  const [measureType, setMeasureType] = useState<undefined | string>(undefined);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const customerCode = useRef<HTMLInputElement>(null);

  // const fieldTest = Array.from({ length: 1 });

  function handleOpenModal() {
    setIsModalOpen(true);
  }

  function handleSubmitCode(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setIsLoading(true);
    getMeasuresList(customerCode.current?.value as string, measureType)
      .then((res) => {
        setMeasuresData(res?.data);
        setIsLoading(false);
      })
      .catch((error) => {
        alert(`Algo deu errado: ${error}`);
        setIsLoading(false);
      });
  }

  let listMeasures;

  if (measuresData?.customer_code) {
    listMeasures = measuresData?.measures;
  } else listMeasures = measuresData;

  return (
    <div className="p-8 ">
      <div className="max-w-md rounded shadow-md  w-full mx-auto p-8">
        <form onSubmit={handleSubmitCode}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Digite seu Código
            </label>
            <input
              type="text"
              ref={customerCode}
              required
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Digite o seu código"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Tipo de Imagem (opcional)
            </label>
            <select
              value={measureType}
              onChange={(e) =>
                setMeasureType(e.target.value as "WATER" | "GAS")
              }
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="all">All</option>
              <option value="WATER">Water</option>
              <option value="GAS">Gas</option>
            </select>
          </div>

          <button className="w-full p-2  text-white font-bold rounded bg-blue-500 transition-all duration-300 hover:bg-blue-700">
            Verificar Histórico
          </button>
        </form>
      </div>

      {isLoading && (
        <p className="text-xl font-bold mt-12">Carregando os seus dados...</p>
      )}

      {!isLoading && listMeasures?.length === 0 && (
        <p className="text-xl font-bold mt-12">Nenhuma medição no momento</p>
      )}
      {!isLoading && listMeasures?.length > 0 && (
        <>
          <h1 className="text-2xl font-bold my-6">Histórico de Medições</h1>

          <ul className="flex flex-wrap gap-8">
            {listMeasures?.map((measure, index) => {
              return (
                <li className="mb-2" key={measure.measure_uuid}>
                  <div className="bg-blue-600/30 w-60 rounded-2xl overflow-hidden">
                    <div className="border-b px-4 py-2">
                      <p>
                        <strong>Data Medição:</strong>{" "}
                        {formatDate(measure.measure_datetime, "MM/dd/yyyy")}
                      </p>
                    </div>

                    <div className="p-4">
                      <p>
                        <strong>Customer Code:</strong>{" "}
                        <span className="font-semibold">
                          {measuresData.customer_code}
                        </span>
                      </p>
                      <p>
                        <strong>Tipo de Imagem:</strong>
                        <span className="font-semibold">
                          {" "}
                          {measure.measure_type}
                        </span>
                      </p>
                      <p>
                        <strong>Código uuid:</strong>
                        <span className="block font-semibold">
                          {measure.measure_uuid}
                        </span>
                      </p>
                      <p>
                        <strong>Valor medição:</strong>{" "}
                        <span className="font-semibold">
                          R$ {measure.measure_value}
                        </span>
                      </p>
                      <p>
                        <strong>Image URL:</strong>
                        <a
                          href={measure.image_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline block hyphens-auto"
                        >
                          {measure.image_url}
                        </a>
                      </p>
                    </div>

                    <div className="border-t py-2 px-3 flex justify-end">
                      {measure.has_confirmed ? (
                        <p className="text-sm">✅ Valor confirmado</p>
                      ) : (
                        <button type="button" onClick={handleOpenModal}>
                          <p className="text-sm ">❌ Confirme aqui</p>
                        </button>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </>
      )}

      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default HistoryMeasures;
