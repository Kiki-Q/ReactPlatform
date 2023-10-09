import React, { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Login from '../views/Login';
/* 路由懒加载 */
const Home = lazy(() => import('../examples/I18nDemo'));
// const Login = lazy(() => import('../views/Login'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/login" />,
  },
  {
    path: '/home',
    element: <Home />,
    children: [
      {
        path: '/home/login',
        element: <Login />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
];

export default routes;
