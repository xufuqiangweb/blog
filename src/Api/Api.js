import axios from "axios";
import Api from "./request";

let baseUrl = "http://localhost:5000";
export const getHome = (endUrl, obj) => {
  return axios.get(baseUrl + "/api/" + endUrl, obj);
};
export const test = (params = {}) => {
  return Api.test(params);
};
