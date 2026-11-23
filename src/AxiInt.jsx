import axios from "axios";

const { hostname } = window.location;
const isLocal = ["localhost", "127.0.0.1"].includes(hostname);

const backendBaseURL = isLocal
  ? "/backend/"
  : import.meta.env.VITE_API_URL || "https://next-hire-backend-oaeq.onrender.com/";

const BackendApi = axios.create({
  baseURL: backendBaseURL,
  timeout: 30000, 
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
