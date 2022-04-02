import axios from "../axios"

const endpoints = {
  login: (data, config) => axios.post("/user/login", data, config),
  checkItem: (data, config) => axios.post("/item/check", data, config),
}

export default endpoints
