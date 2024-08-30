import { useState } from "react";
import { uploadImage } from "../api";
import ImageEncoder from "./ImageEncoder";
import MeasurementForm from "./MeasurementForm";

function FormData() {
  const [imageData, setImageData] = useState<ImageData | null>(null);
  const [measurementData, setMeasurementData] = useState<{
    customer_code: string;
    measure_type: "WATER" | "GAS";
    measure_datetime: string;
  } | null>(null);

  const handleImageDataReady = (data: ImageData) => {
    setImageData(data);
  };

  const handleMeasurementSubmit = (data: {
    customer_code: string;
    measure_type: "WATER" | "GAS";
    measure_datetime: string;
  }) => {
    setMeasurementData(data);
  };

  const handleFinalSubmit = () => {
    // console.log("imagedata", imageData);
    // console.log("measurementdata", measurementData);

    if (imageData && measurementData) {
      uploadImage({ image: imageData, ...measurementData });
    }
  };

  return (
    <div className="bg-red-500">
      <h1>Upload Image and Submit Measurement</h1>
      <ImageEncoder onImageDataReady={handleImageDataReady} />
      <MeasurementForm onSubmit={handleMeasurementSubmit} />
      <button onClick={handleFinalSubmit}>Submit All</button>
    </div>
  );
}

export default FormData;
