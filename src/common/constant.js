export const setType = [
  {
    value: 1,
    label: '每次',
  },
  {
    value: 2,
    label: '每月',
  },
  {
    value: 3,
    label: '每年',
  },
]; //公共资源套餐类型

//配置管理对话框显示状态
export const modalState = {
  INITIAL: 0,
  ADD: 1,
  CHANGE: 2,
  DETAIL: 3,
};

//订单状态
export const STATE = [
  {
    label: '未完成',
    value: 0,
  },
  {
    label: '通过',
    value: 1,
  },
  {
    label: '驳回',
    value: 2,
  },
];

//违规行为

export const creditLess = [
  {
    label: '毁坏或偷窃公寓物品',
    value: 30,
  },
  {
    label: '毁坏公共设施',
    value: 20,
  },
  {
    label: '在公寓进行黄赌毒等违法行为',
    value: 50,
  },
  {
    label: '恶意污染公寓环境',
    value: 10,
  },
  {
    label: '无',
    value: 0,
  },
];
//用户角色
export const role = [
  {
    label: '普通用户',
    value: 1,
  },
  {
    label: '房东',
    value: 2,
  },
];
