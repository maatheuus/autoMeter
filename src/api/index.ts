import axios from "axios";

const url = "http://localhost:3000/api/v1" as string;

export const uploadImage = async (data: object) => {
  try {
    const res = await axios.post(`${url}/upload`, data);

    console.log("RES", res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const confirmedData = async (data: object) => {
  try {
    const res = await axios.patch(`${url}/confirm`, data);

    console.log("RES", res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
