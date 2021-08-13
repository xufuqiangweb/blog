import axios from "axios";
import requestConfig from "./requestConfig";

//创建实例
const instance = axios.create({
  //创建axios实例，在这里可以设置请求的默认配置
  // baseURL: process.env.REACT_APP_API,
  baseURL: "http://localhost:5000/api",
  timeout: 10000, // 设置超时时间10s
});

// 常见的http状态码信息
// const httpCode = {
//   400: "请求参数错误",
//   401: "权限不足, 请重新登录",
//   403: "服务器拒绝本次访问",
//   404: "请求资源未找到",
//   500: "内部服务器错误",
//   501: "服务器不支持该请求中使用的方法",
//   502: "网关错误",
//   504: "网关超时",
// };

//请求拦截
instance.interceptors.request.use(
  function (config) {
    console.log(config);
    // 在发送请求之前做些什么
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);
//响应拦截
instance.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    return response;
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

// 合并axios参数
const conbineOptions = (opts) => {
  const _data = { ...opts.data };
  const options = {
    method: opts.method || "GET",
    url: opts.url,
    headers: opts.headers,
  };
  return options.method.toUpperCase() !== "GET"
    ? Object.assign(options, { data: _data })
    : Object.assign(options, { params: _data });
};

const Api = (() => {
  const apiObj = {};
  const requestList = requestConfig;
  const fun = (opts) => {
    return async (params = {}) => {
      params.url = params.url === undefined ? opts.url : params.url;
      const newOpts = conbineOptions(params);
      const res = await instance(newOpts);
      return res;
    };
  };
  Object.keys(requestConfig).forEach((key) => {
    let opts = {
      url: requestList[key],
    };
    apiObj[key] = fun(opts);
  });
  return apiObj;
})();
export default Api;
