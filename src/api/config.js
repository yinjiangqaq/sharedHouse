import axios from 'axios';
import { getToken } from '../common/util';
const baseUrl = 'http://localhost:7001';
//axios实例以及拦截器配置

const axiosInstance = axios.create({
  baseURL: baseUrl,
});

//请求拦截器
axiosInstance.interceptors.request.use(
  (config) => {
    if (getToken().length > 0) {
      config.headers['Authorization'] = getToken();
    }
    return config;
  },
  (err) => {
    console.log(err);
    return Promise.reject(err);
  }
);
// 响应拦截器
axiosInstance.interceptors.response.use(
  (res) => res.data,
  (err) => {
    console.log(
      `${err.status || ''}：${err.statusText || ''} ${err.message || ''}`
    );
    return Promise.reject(err);
  }
);

export default axiosInstance;
