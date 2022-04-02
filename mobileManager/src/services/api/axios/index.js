import axios from "axios"
import Cookies from "js-cookie"

const axiosInstance = axios.create({
  // СОЗДАЕМ ЭКЗЕМПЛЯР БИБЛИОТЕКИ AXIOS, В КОТОРОМ ПОМЕНЯЕМ НЕКОТОРЫЕ ФУНКЦИОНАЛ
  baseURL: "http://35.228.18.13/api", // url апишки
})

axiosInstance.interceptors.request.use(
  config => {
    const authToken = Cookies.get("auth-token")

    if (authToken) {
      config.headers.authorization = `Bearer ${authToken}`
    } // перехватчик, который перез запросом будет добавлять заголовок с токеном для авторизации если он есть в куки

    return config
  },
  error => Promise.reject(error),
)

export default axiosInstance
