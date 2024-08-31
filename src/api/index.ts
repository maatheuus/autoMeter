import axios from "axios";

const url = "http://localhost:3000/api/v1" as string;

export const uploadImage = async (data: object) => {
  try {
    const res = await axios.post(`${url}/upload`, data);

    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error(
      `Something wen wrong while upload the data: ${error.message}`
    );
  }
};

export const confirmedData = async (data: object) => {
  try {
    const res = await axios.patch(`${url}/confirm`, data);

    console.log("RES", res);
    return res;
  } catch (error) {
    console.log(error);
    throw new Error(
      `Something went wrong while confirm the data: ${error.message}`
    );
  }
};

export const getMeasuresList = async (
  customer_code: string,
  measure_type: string | undefined
) => {
  try {
    let query;

    if (measure_type !== undefined) {
      query = `${url}/${customer_code}/list?measure_type=${measure_type}`;
    } else {
      query = `${url}/${customer_code}/list`;
    }
    const res = await axios.get(query);

    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error(
      `Something went wrong while get the data: ${error.message}`
    );
  }
};
