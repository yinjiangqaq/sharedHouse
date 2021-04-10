import axiosInstance from '../config';

//获取用户列表

export const getUserList = (params) => {
    return axiosInstance.get('/api/getUserList', {}, {});
  };
  