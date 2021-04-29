import { axiosInstance } from '../config';

//登录
export const login = (parms) => {
  //post(url,{data},{config})
  return axiosInstance.post('/api/login', { ...parms }, {});
};

//退出登录

export const logout = () => {
  return axiosInstance.get('/api/logout', {}, {});
};

//注册
export const register = (params) => {
  return axiosInstance.post('/api/register', { ...params }, {});
};

//获取邮箱验证码

export const getEmailVerifyCode = (params) => {
  return axiosInstance.post('/api/getVerifyCode', { ...params }, {});
};

//获取管理员用户信息
export const getUserInfo = (params) => {
  return axiosInstance.get('/api/getUserInfo', {}, {});
};
