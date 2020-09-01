import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000",
});

// intercepting request to check auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("userToken");

  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

export default api;
