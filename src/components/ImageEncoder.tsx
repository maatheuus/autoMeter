import React, { useState } from "react";
import { fileToGenerativePart, getBase64 } from "../utils";
import MeasurementForm from "./MeasurementForm";
import { ImageEncoderProps } from "../interfaces";

const ImageEncoder: React.FC<ImageEncoderProps> = ({
  onImageDataReady,
  onSubmit,
  handleFinalSubmit,
}) => {
  const [image, setImage] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      getBase64(file)
        .then((result) => {
          setImage(result as string);
        })
        .catch((e) => alert(`Algo deu errado: ${e}`));

      fileToGenerativePart(file).then((data) => {
        onImageDataReady(data);
      });
    }
  };

  return (
    <div className="flex flex-col gap-y-6">
      <div className="grid w-full max-w-xs items-center gap-1.5">
        <label className="text-sm text-gray-400 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Picture
        </label>
        <input
          type="file"
          id="picture"
          accept="image/*"
          onChange={handleFileChange}
          className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm text-gray-400 file:border-0 file:bg-transparent file:text-gray-600 file:text-sm file:font-medium"
        />
      </div>

      <div className="flex flex-col md:flex-row px-8 gap-x-12">
        <MeasurementForm
          onSubmit={onSubmit}
          handleFinalSubmit={handleFinalSubmit}
        />
        {image && (
          <div>
            <p className="text-lg mt-8 mb-5 md:mt-0 md:mb-0">Image Preview:</p>
            <div className="flex justify-center max-w-96 bg-blue-600/40 rounded-3xl p-10">
              <img
                src={image}
                className="rounded-lg w-80 h-full object-fill"
                alt="Preview"
                width={400}
                height={400}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageEncoder;
