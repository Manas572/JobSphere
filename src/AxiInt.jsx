import axios from "axios";
const BackendApi = axios.create({
  baseURL: "http://127.0.0.1:8000/", 
  //  baseURL: "https://35hzb7z7-8000.inc1.devtunnels.ms/",
  timeout: 5000,
  withCredentials: true,
});

BackendApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const isAuthRequest = originalRequest?.url?.includes("/api/token/");
    if (error.response?.status === 401 && !originalRequest?._retry && !isAuthRequest) {
      originalRequest._retry = true;

      try {
        await BackendApi.post("/api/token/refresh/", {});
        return BackendApi(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default BackendApi;
