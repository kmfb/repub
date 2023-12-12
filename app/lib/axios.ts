import axios from "axios";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
  baseURL: "/api",
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
   
    toast.error(error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
