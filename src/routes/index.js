import React from 'react';
import { Redirect } from 'react-router-dom';
import Login from '../application/Login';
import Register from '../application/Register';

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
];
