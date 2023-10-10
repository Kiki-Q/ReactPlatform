#
## 路由
```
npm i react-router-dom -S
npm i @types/react-router-dom -S

import { BrowserRouter} from 'react-router-dom';
<BrowserRouter>
    <App />
  </Suspense>
</BrowserRouter>

import { HashRouter } from 'react-router-dom'
root.render(
  <HashRouter>
    <App />
  </HashRouter>
)


```

## 创建路由表
routers>index.tsx
```
import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { RouteOBJ } from '../types/router';
import Login from '../views/Login';
/* 路由懒加载 */
const Home = lazy(() => import('../examples/I18nDemo'));
// const Login = lazy(() => import('../views/Login'));

const routes: RouteOBJ[] = [
  {
    path: '/',
    element: <Navigate to="/login" />,
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
];

export default routes;

```

## App.tsx 中使用路由
```
import React, { Suspense } from 'react'
import { useRoutes, Link } from 'react-router-dom'
import routes from './router'

function App() {
  return (
    <div className="App">
      <div className="nav">
        <Link to="/home">菜单一</Link>
        <Link to="/mine">菜单二</Link>
      </div>
      <Suspense fallback="loading...">
        <div className="main">{useRoutes(routes)}</div>
      </Suspense>
    </div>
  )
}

export default App
```

## 路由守卫
```
<!-- 路由接口 -->
import type { RouteObject } from 'react-router-dom';

export type RouteOBJ = RouteObject & {
  caseSensitive?: boolean;
  children?: RouteOBJ[];
  element?: React.ReactNode;
  index?: boolean;
  path?: string;
  auth?: boolean;
  name?: string;
};
```

```
<!-- 守卫方法 -->
import { message } from 'antd';
import { useEffect } from 'react';
import {
  NavigateFunction,
  useLocation,
  useNavigate,
  useRoutes,
} from 'react-router-dom';
import { RouteOBJ } from '../types/router';

// 递归查询对应的路由
export const searchroutedetail = (
  path: string,
  routes: RouteOBJ[]
): RouteOBJ | null => {
  for (let i = 0; i < routes.length; i += 1) {
    const item = routes[i];
    if (item.path === path) return item;
    if (item.children) {
      return searchroutedetail(path, item.children);
    }
  }
  return null;
};

// 全局路由守卫
export const guard = (
  location: Location,
  navigate: NavigateFunction,
  routes: RouteOBJ[]
) => {
  const { pathname } = location;
  console.log(pathname);

  // 找到对应的路由信息
  const routedetail = searchroutedetail(pathname, routes);

  // 没有找到路由，跳转404
  if (!routedetail) {
    // navigate("/404");
    return false;
  }

  // 如果需要权限验证
  if (routedetail.auth) {
    const token = localStorage.getItem('jiang_blog_token');
    if (!token) {
      message.warning('请登录');
      navigate(-1);
      return false;
    }
  }
  return true;
};

export const RouterGurad = (routes: RouteOBJ[]) => {
  const location: any = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    guard(location, navigate, routes);
  }, [location, navigate, routes]);
  // document.documentElement.scrollTo(0, 0);
  const Route = useRoutes(routes);
  return Route;
};

<!-- 使用 -->
const routeView = RouterGurad(routes);
```
## 权限
```
auth+token
```

## 子路由
```
路由表：children属性
<Outlet />
```

## title
## queryparams、参数问题
## 路由过渡动画

## 打包部署路由配置


