import axiosInstance from '../config';

//新增公共设施配置

export const addDevice = (params) => {
  return axiosInstance.post('/api/addDevice', { ...params }, {});
};

//查找公共设施
export const findDevice = (params) => {
  return axiosInstance.post('/api/findDevice', { ...params }, {});
};

//更改公共设施

export const changeDevice = (params) => {
  return axiosInstance.post('/api/changeDevice', { ...params }, {});
};
//删除公共设施
export const deleteDevice = (params) => {
  return axiosInstance.post('/api/deleteDevice', { ...params }, {});
};
