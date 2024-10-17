// src/Utils/AxiosInstance.js
import axios from 'axios';
import { BASE_URL } from './Constants';

const axiosInstance = axios.create({
    baseURL: BASE_URL, // Ensure this URL is correct
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

// Add Authorization token if available
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("token");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;