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
