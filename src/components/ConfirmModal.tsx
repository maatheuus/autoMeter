import React, { useRef, useState } from "react";
import { confirmedData } from "../api";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ConfirmData {
  measure_uuid: string;
  confirmed_value: number;
  customer_code: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ isOpen, onClose }) => {
  const confirmedValue = useRef<HTMLInputElement>(null);
  const uuidCode = useRef<HTMLInputElement>(null);
  const userCode = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const uuidValue = uuidCode.current?.value;
    const confirmedValueInt = confirmedValue.current?.value as string;
    const userCodeValue = userCode.current?.value as string;

    // Verifica se o valor inserido é um número
    const numberRegex = /^-?\d+(\.\d+)?$/;
    // Verifica se o valor inserido é um código UUID válido
    const uuidRegex =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

    // Verifica se o valor inserido não está vazio
    const customerRegex = /^\s*$/;

    if (
      !uuidRegex.test(uuidValue as string) ||
      !numberRegex.test(confirmedValueInt) ||
      customerRegex.test(userCodeValue)
    ) {
      alert("Insira os dados corretamente");
    } else {
      const data: ConfirmData = {
        measure_uuid: uuidValue as string,
        confirmed_value: parseFloat(confirmedValueInt),
        customer_code: userCodeValue,
      };
      setIsLoading(true);
      confirmedData(data)
        .then(() => {
          alert("Dados confirmado com sucesso!");
          onClose();
          setIsLoading(false);
        })
        .catch((error) => {
          alert(`Algo deu errado: ${error}`);
          setIsLoading(false);
        });
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-xl font-semibold mb-4">Editar Medição</h2>

        <form onSubmit={handleSave}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Código usuário
            </label>
            <input
              type="text"
              ref={userCode}
              required
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Digite o seu código"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Código UUID
            </label>
            <input
              type="text"
              ref={uuidCode}
              required
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Digite o código UUID"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Confirme o valor
            </label>
            <input
              type="text"
              ref={confirmedValue}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mt-4 flex justify-end space-x-2">
            <button
              onClick={onClose}
              type="button"
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button className="px-4 py-2 text-white rounded bg-blue-500 transition-all duration-300 hover:bg-blue-700">
              {isLoading ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConfirmModal;
