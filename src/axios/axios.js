import axios from "axios";
const baseUrl = process.env.REACT_APP_BASE_LOCAL_URL;
const prodURL = process.env.REACT_APP_BASE_PROD_URL

export const axiosInstance = axios.create({
  // baseURL: `${baseUrl}/api/v1`,
  baseURL: `${prodURL}/api/v1`,
});
