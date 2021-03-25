import axiosInstance from '../config';

//登录
export const login = (parms) => {
  //post(url,{data},{config})
  return axiosInstance.post('/login', { ...parms }, {});
};

//退出登录

export const logout = () => {
  return axiosInstance.post('/logout', {}, {});
};
