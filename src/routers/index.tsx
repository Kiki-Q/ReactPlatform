import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { RouteOBJ } from '../types/router';
import Login from '../views/Login';
/* 路由懒加载 */
const Home = lazy(() => import('../examples/I18nDemo'));
const ReduxDemo = lazy(() => import('../examples/ReduxDemo'));

// const Login = lazy(() => import('../views/Login'));

const routes: RouteOBJ[] = [
  {
    path: '/',
    element: <Navigate to="/App/login" />,
  },
  {
    path: '/home',
    element: <Home />,
    auth: true,
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
  {
    path: '/ReduxDemo',
    element: <ReduxDemo />,
  },
];

export default routes;
