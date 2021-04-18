import axiosInstance from '../config';

//查找历史订单
export const findCase = (params) => {
  return axiosInstance.post('/api/findCase', { ...params }, {});
};
//扣除信用分
export const deduceCredit = (params) => {
  return axiosInstance.post('/api/deduceCredit', { ...params }, {});
};
