import { publicRequest } from "./axios_helper.js";

export const getStockInfoAsync = async (pathname) => {
  try {
    console.log(pathname);
    const response = await publicRequest.get(pathname);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
