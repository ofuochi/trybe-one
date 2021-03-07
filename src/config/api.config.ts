import axios from "axios";
import { toast, ToastOptions } from "react-toastify";
import { setup } from "axios-cache-adapter";

import { authService, localStoreService } from "../services";
import { envConfig } from "./env.config";

const api = setup({
  baseURL: envConfig.apiBaseUrl,
  cache: { maxAge: 15 * 60 * 1000 },
});
api.interceptors.request.use(
  (config) => {
    config.headers.ApiKey = envConfig.apiKey;
    if (
      process.env.NODE_ENV === "production" &&
      !envConfig.apiBaseUrl?.toLowerCase().startsWith("https")
    ) {
      config.baseURL = config.baseURL?.replace("http", "https");
    }
    const token = localStoreService.getAuthToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  (err) => Promise.reject(err)
);

api.interceptors.response.use(undefined, (err) => {
  const opt: ToastOptions = { position: "top-center", delay: 0 };
  if (!err.response) {
    toast.error("Network Error", opt);
    return Promise.reject(err);
  }
  const status = err.response.status;
  const data = err.response.data;

  if (status >= 400 && status < 500) {
    if (status === 401)
      authService
        .logout()
        .then(() => toast.warn(data?.message || "Invalid login details", opt));
    else toast.warn(data?.message || "You are doing something wrong", opt);
  }

  if (err.response.status === 500)
    toast.error(data?.message || "An error has occurred", opt);

  return Promise.reject(err);
});

export default api;
