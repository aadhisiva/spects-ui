import axios from "axios";
import { toast } from "react-toastify"; // Or your preferred toast library
import { store } from "./pages/redux/store";

// Create an Axios instance
const axiosInstance = axios.create({
  // baseURL: "http://localhost:8889/api/admin", // Set your API base URL
  baseURL: "https://spectacles.karnataka.gov.in/api/admin", // Set your API base URL
  timeout: 30000, // Set a timeout (optional)
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor (optional)
axiosInstance.interceptors.request.use(
  (config) => {
    // Attach token if required
    const state: any = store.getState();
    const token = state.user['Token'];
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response) {
        switch (error.response.status) {
          case 401:
            toast.warn("Unauthorized! Please log in again.");
            break;
          case 404:
            toast.info("Resource not found.");
            break;
          case 500:
            toast.error("Server error! Please try again later.");
            break;
          default:
            toast.error("An unexpected error occurred.");
        }
      } else {
        toast.error("Network error! Please check your internet connection.");
      }
      return Promise.reject(error);
    }
);

export default axiosInstance;
