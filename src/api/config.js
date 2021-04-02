import axios from 'axios';
import { getToken } from '../common/util';
const baseUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:7001/'
    : 'https://1.15.229.136:7001/';
//axios实例以及拦截器配置

const axiosInstance = axios.create({
  baseURL: baseUrl,
});

//请求拦截器
axiosInstance.interceptors.request.use(
  (config) => {
    if (getToken() && getToken().length > 0) {
      config.headers['Authorization'] = getToken();
    }
    //有token的时候，在header塞入token
    return config;
  },
  (err) => {
    console.log(err);
    return Promise.reject(err);
  }
);
// 响应拦截器
axiosInstance.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (res.code === 407) {
      console.log('token验证失败重定向到登录界面');
      window.location.hash = 'login';
      window.location.reload();
    }
    return res;
  },
  (err) => {
    console.log(
      `${err.status || ''}：${err.statusText || ''} ${err.message || ''}`
    );
    return Promise.reject(err);
  }
);

export default axiosInstance;
