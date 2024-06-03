import axios from "axios";

export const baseUrl = "https://spectacles.karnataka.gov.in/edcs/";
// export const baseUrl = "http://localhost:8889/edcs/";

const axiosRequest = axios.create({
    baseURL: baseUrl
});
axiosRequest.defaults.withCredentials = true;

axiosRequest.interceptors.request.use(
    (config): any => {
        config.headers['X-Frame-Options'] = 'SAMEORIGIN';
        config.headers['Content-Security-Policy'] = '<policy-directive>; <policy-directive>';
        config.headers['X-XSS-Protection'] = '1; mode=block';
        config.headers['X-Content-Type-Options'] = 'nosniff';
        config.headers['Strict-Transport-Security'] = 'max-age=63072000; includeSubdomains; preload';
        return config;
    }, (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
axiosRequest.interceptors.response.use(
    (response) => {
      // Process successful responses
      return response;
    },
    (error) => {
      // Handle error responses
      return Promise.reject(error);
    }
  );


export default axiosRequest;