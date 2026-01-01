import axios, { AxiosError } from "axios";
import { refreshTokens } from "./auth";

const api = axios.create({
  baseURL: "https://salon-boking-system-be.vercel.app/api/v1",
  withCredentials: true,
});

const PUBLIC_ENDPOINTS = [
  "/user/login",
  "/user/register",
  "/user/refreshtoken",
  "/service",
  "/staff"
];

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  const isPublic = PUBLIC_ENDPOINTS.some(url =>
    config.url?.startsWith(url)
  );

  if (token && !isPublic) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest: any = error.config;

    const isPublic = PUBLIC_ENDPOINTS.some(url =>
      originalRequest?.url?.startsWith(url)
    );

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isPublic
    ) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(error);
      }

      try {
        const res = await refreshTokens(refreshToken);

        const newAccessToken = res.data?.accessToken;
        const newRefreshToken = res.data?.refreshToken;

        localStorage.setItem("accessToken", newAccessToken);
        if (newRefreshToken)
          localStorage.setItem("refreshToken", newRefreshToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch {
        localStorage.clear();
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
