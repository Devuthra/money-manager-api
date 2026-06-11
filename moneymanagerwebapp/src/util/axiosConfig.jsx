import axios from "axios";
import { BASE_URL } from "./apiEndpoints";

const axiosConfig = axios.create({
    baseURL:BASE_URL,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    }
});

// List of endpoints that do not require authorization header
const excludeEndPoints = ["/login", "/register", "/status", "/activate", "/health"];

// Request interceptor
axiosConfig.interceptors.request.use(
    (config) => {
        const shouldSkipToken = excludeEndPoints.some((endpoint) => {
            return config.url?.includes(endpoint); //  `endpoint` not `endpoints`
        });                                         // added `return`

        if (!shouldSkipToken) {                     //  corrected typo
            const accessToken = localStorage.getItem("token");
            if (accessToken) {
                config.headers.Authorization = `Bearer ${accessToken}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
axiosConfig.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {                                    // ✅ fix 4: all else-ifs are inside this callback
        if (error.response?.status === 401) {
            window.location.href = "/login";
        } else if (error.response?.status === 500) {
            console.error("Server error. Please try again later");
        } else if (error.code === "ECONNABORTED") {
            console.error("Request timeout. Please try again");
        }
        return Promise.reject(error);
    }                                               // ✅ properly closed before `)` 
);

export default axiosConfig;