export interface Measure {
  measure_uuid: string;
  measure_datetime: string;
  measure_type: "WATER" | "GAS";
  measure_value: number;
  image_url: string;
  has_confirmed: boolean;
}

export interface MeasuresData {
  customer_code: string;
  measures: Measure[];
}

export interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface ConfirmData {
  measure_uuid: string;
  confirmed_value: number;
  customer_code: string;
}

export interface MeasurementData {
  customer_code: string;
  measure_type: "WATER" | "GAS";
  measure_datetime: string;
}

export interface ImageData {
  image: string;
  format: string;
}

export interface ImageDataEncoder {
  inlineData: {
    data: string;
    mimeType: string;
  };
}

export interface ImageEncoderProps {
  onImageDataReady: (data: ImageDataEncoder) => void;
  onSubmit: (data: MeasurementData) => void;
  handleFinalSubmit: (data: object) => void;
}

export interface MeasurementFormProps {
  onSubmit: (data: MeasurementData) => void;
  handleFinalSubmit: () => void;
}
