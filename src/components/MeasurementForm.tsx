import React, { useState } from "react";

interface MeasurementFormProps {
  onSubmit: (data: {
    customer_code: string;
    measure_type: "WATER" | "GAS";
    measure_datetime: string;
  }) => void;
}

const MeasurementForm: React.FC<MeasurementFormProps> = ({ onSubmit }) => {
  const [customerCode, setCustomerCode] = useState<string>("");
  const [measureType, setMeasureType] = useState<"WATER" | "GAS">("WATER");
  const [measureDatetime, setMeasureDatetime] = useState<string>("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({
      customer_code: customerCode,
      measure_type: measureType,
      measure_datetime: measureDatetime,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="measurement-form">
      <div className="form-group">
        <label htmlFor="customer_code">Customer Code:</label>
        <input
          type="text"
          id="customer_code"
          value={customerCode}
          onChange={(e) => setCustomerCode(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="measure_type">Measure Type:</label>
        <select
          id="measure_type"
          value={measureType}
          onChange={(e) => setMeasureType(e.target.value as "WATER" | "GAS")}
          required
        >
          <option value="WATER">Water</option>
          <option value="GAS">Gas</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="measure_datetime">Measure Date and Time:</label>
        <input
          type="datetime-local"
          id="measure_datetime"
          value={measureDatetime}
          onChange={(e) => setMeasureDatetime(e.target.value)}
          required
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default MeasurementForm;
