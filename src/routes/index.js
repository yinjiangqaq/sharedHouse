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
        label: ['用户管理', '账户管理'],
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
    ],
  },
  {
    name: 'Not-Found',
    path: '*',
    component: NotFound,
  },
];
