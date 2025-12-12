import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    import.meta.mode === "development" ? "http://localhost:3009/api" : "/api",
  withCredentials: true, // send cookies with requests
});

export default axiosInstance;
