import axios from "../axios";

const endpoints = {
  login: (data, config) => axios.post("/user/login", data, config),
  checkItem: (data, config) => axios.post("/item/check", data, config),
  getProfile: () => axios.get("/user/info"),
};

export default endpoints;
