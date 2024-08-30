import React, { useState } from "react";
import { fileToGenerativePart, getBase64 } from "../utils";

interface ImageData {
  inlineData: {
    data: string;
    mimeType: string;
  };
}

interface ImageEncoderProps {
  onImageDataReady: (data: ImageData) => void;
}

const ImageEncoder: React.FC<ImageEncoderProps> = ({ onImageDataReady }) => {
  // const [imageData, setImageData] = useState<ImageData | object>({});
  const [image, setImage] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      getBase64(file)
        .then((result) => {
          setImage(result as string);
        })
        .catch((e) => console.log(e));

      fileToGenerativePart(file).then((data) => {
        onImageDataReady(data);
      });
    }
  };

  // useEffect(() => {
  //   const isEmpty = (obj: object) =>
  //     Object.entries(obj).length === 0 && obj.constructor === Object;

  //   if (!isEmpty(imageData)) uploadImage(imageData);
  // }, [imageData]);

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {image && (
        <div>
          <div>
            <p>Image Preview:</p>
            <img src={image} alt="Preview" width={400} height={400} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageEncoder;
