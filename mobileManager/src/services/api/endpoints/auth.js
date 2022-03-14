import axios from "../axios"

const endpoints = {
  login: (url, data, config) => axios.post(url, data, config),
  getProfile: () => axios.get("/v1/auth/me"),
  updateProfile: data => axios.patch("/v1/auth/me", data),
}

export default endpoints
