import axios from "axios";

const { hostname, protocol } = window.location;
const backendBaseURL = ["localhost", "127.0.0.1"].includes(hostname)
  ? `${protocol}//${hostname}:8000/`
  : `https://${hostname.replace("-5173.", "-8000.")}/`;

const BackendApi = axios.create({
  baseURL: backendBaseURL,
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
