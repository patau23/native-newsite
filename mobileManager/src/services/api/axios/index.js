import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const axiosInstance = axios.create({
  baseURL: "http://35.228.69.158/api",
});

axiosInstance.interceptors.request.use(
  async config => {
    const authToken = await AsyncStorage.getItem("auth-token");

    if (authToken) {
      config.headers.authorization = `Bearer ${authToken}`;
    }

    return config;
  },
  error => Promise.reject(error),
);

export default axiosInstance;
