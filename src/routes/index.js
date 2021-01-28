import React from 'react';
import { Redirect } from 'react-router-dom';

import Login from '../application/Login';
import Register from '../application/Register';
import Project from '../application/project';
import Account from '../application/Account';
import Credit from '../application/Credit';

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
    ],
  },
];
