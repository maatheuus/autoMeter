import { useState } from "react";
import ImageEncoder from "./ImageEncoder";
import { uploadImage } from "../api";
import { useNavigate } from "react-router-dom";
import { ImageData, MeasurementData } from "../interfaces";

function FormData() {
  const [imageData, setImageData] = useState<ImageData | null>(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [measurementData, setMeasurementData] =
    useState<MeasurementData | null>(null);

  const handleImageDataReady = (data: ImageData) => {
    setImageData(data);
  };

  const handleMeasurementSubmit = (data: MeasurementData) => {
    setMeasurementData(data);
  };

  const handleFinalSubmit = () => {
    if (imageData && measurementData) {
      setIsLoading(true);
      uploadImage({ image: imageData, ...measurementData }).then(() => {
        setIsLoading(false);
        navigate("/list");
      });
    } else {
      alert("Insira todos os dados corretamente, por favor!");
    }
  };

  if (isLoading) {
    return <p className="text-xl my-5 font-bold">Enviando seus dados...</p>;
  }
  return (
    <div>
      <ImageEncoder
        onImageDataReady={handleImageDataReady}
        onSubmit={handleMeasurementSubmit}
        handleFinalSubmit={handleFinalSubmit}
      />
      {isLoading && (
        <p className="text-xl my-5 font-bold" role="status">
          Enviando dados...
        </p>
      )}
    </div>
  );
}

export default FormData;
