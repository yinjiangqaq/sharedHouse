import axiosInstance from '../config';

//新增公寓配置
export const addRoom = (params) => {
  return axiosInstance.post('/api/addRoom', { ...params }, {});
};

//findRoom
export const findRoom = (params) => {
  return axiosInstance.post('/api/findRoom', { ...params }, {});
};

//更改公寓配置
export const changeRoom = (params) => {
  return axiosInstance.post('/api/changeRoom', { ...params }, {});
};

//删除公寓配置

export const deleteRoom = (params) => {
  return axiosInstance.post('/api/deleteRoom', { ...params }, {});
};
