import { Schema, model } from "mongoose";

const customerSchema = new Schema({
  customer: {
    customer_code: {
      type: String || Number,
      required: true,
    },
  },
  measures: [
    {
      measure_uuid: { type: String, required: true, unique: true },
      measure_type: String,
      image: String,
      measure_value: { type: Number },
      has_confirmed: { type: Boolean, required: true, default: false },
      measure_datetime: {
        type: Date,
        immutable: true,
        default: () => Date.now(),
      },
    },
  ],
});

const Customer = model("Customer", customerSchema);
export default Customer;
