import axios from 'axios';

const baseUrl = 'http://localhost:3000';
//axios实例以及拦截器配置

const axiosInstance = axios.create({
  baseURL: baseUrl,
});

//拦截器
axiosInstance.interceptors.response.use(
    (res) => res.data,
    (err) => {
      console.log(err, "网络错误");
    }
  );
