export interface ConfirmMeasurementBody {
  measure_uuid: string;
  confirmed_value: number;
  customer_code: string | number;
}

export interface Measure {
  measure_uuid: string;
  measure_datetime: Date;
  measure_type: string;
  measure_value: number | null;
  has_confirmed?: boolean;
}

export interface Customer {
  customer_code: string | number;
  measures: Measure[];
}
