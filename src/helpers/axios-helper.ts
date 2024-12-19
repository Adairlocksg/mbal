import { API_BASE_URL } from "@/api/api";
import axios from "axios";

export const setDefaultHeaders = (token: string) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const setBaseUrl = () => {
  axios.defaults.baseURL = API_BASE_URL;
};
