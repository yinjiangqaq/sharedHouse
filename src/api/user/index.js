import axiosInstance from '../config';

//获取用户列表

export const getUserList = (params) => {
  return axiosInstance.post('/api/getUserList', { ...params }, {});
};
//获取用户信用度列表
export const getUserCreditList = (params) => {
  return axiosInstance.post('/api/getUserCreditList', { ...params }, {});
};
