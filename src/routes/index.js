import React from 'react';
import { Redirect } from 'react-router-dom';

import Login from '../application/Login';
import Register from '../application/Register';
import Project from '../application/project';
import Account from '../application/Account';
import Credit from '../application/Credit';
import Room from '../application/Room';
import NotFound from '../application/NotFound';
import History from '../application/History';
import Device from '../application/Device';
import Equipment from '../application/Equipment';
import CommonEquipment from '../application/CommonEquipment';
// eslint-disable-next-line import/no-anonymous-default-export
export default [
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/register',
    component: Register,
  },
  {
    path: '/project',
    component: Project,
    //render: () => <Redirect to={'/project/account'}></Redirect>,
    children: [
      {
        name: '账号管理',
        path: '/project/account',
        label: ['用户管理', '账号管理'],
        component: Account,
      },
      {
        name: '信用管理',
        path: '/project/credit',
        label: ['用户管理', '信用管理'],
        component: Credit,
      },
      {
        name: '公寓租赁管理',
        path: '/project/room',
        label: ['租赁管理', '公寓租赁管理'],
        component: Room,
      },
      {
        name: '公共设施租赁管理',
        path: '/project/common',
        label: ['租赁管理', '公共设施管理'],
        component: Device,
      },
      {
        name: '历史数据统计',
        path: '/project/history',
        label: ['租赁管理', '历史数据统计'],
        component: History,
      },
      {
        name: '公寓配置管理',
        path: '/project/equipment',
        label: ['配置管理', '公寓配置管理'],
        component: Equipment,
      },
      {
        name: '公共资源配置管理',
        path: '/project/commonEquipment',
        label: ['配置管理', '公共资源配置管理'],
        component: CommonEquipment,
      },
    ],
  },

  {
    name: 'Not-Found',
    path: '*',
    component: NotFound,
  },
];
