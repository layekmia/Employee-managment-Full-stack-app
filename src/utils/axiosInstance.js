import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://employee-management-server-ebon.vercel.app/web/api",
  withCredentials: true,
});

export default axiosInstance;
