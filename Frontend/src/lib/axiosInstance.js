import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://writeit-kgeb.onrender.com/api/",
  withCredentials: true,
});
