import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { getFromLocalStorage, setToLocalStorage } from '@/utils/localStorage';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

interface AxiosRequestConfigCustom extends InternalAxiosRequestConfig {
  retry: boolean;
}

// Add a response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error?.config as AxiosRequestConfigCustom;

    if (error.response?.status === 401 && !originalRequest.retry) {
      originalRequest.retry = true;
      const refreshToken = getFromLocalStorage('refreshToken');
      if (refreshToken) {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/refreshToken`, { refreshToken });
        setToLocalStorage('accessToken', response.data.accessToken);
        setToLocalStorage('refreshToken', response.data.refreshToken);
        if (originalRequest && originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
        }
      }

      return axios(originalRequest);
    }

    return Promise.reject(error);
  },
);

// Add a resquest interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default api;
