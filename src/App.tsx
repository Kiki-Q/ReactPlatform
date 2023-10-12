import React, { Suspense } from 'react';
import { useRoutes, NavLink, Outlet } from 'react-router-dom';
import routes from './routers/index';
// import RouterDemo from './examples/RouterDemo';
import './App.css';
import { RouterGurad } from './utils/routerUtils';

function App() {
  const activeClassName = ({ isActive }: { isActive: boolean }) =>
    isActive ? 'list-group-item peiqi' : 'list-group-item';

  const routeView = RouterGurad(routes);
  return (
    <div className="app">
      <div className="nav">
        <NavLink className={activeClassName} to="/App/home">
          菜单一
        </NavLink>
        <NavLink className={activeClassName} to="/App/login">
          菜单二
        </NavLink>
      </div>
      <div className="main">
        {/* 使用了路由懒加载，所以需要使用<Suspense>包起来 */}
        <Suspense fallback="loading">{routeView}</Suspense>
      </div>

      <Outlet />
      {/* <RouterDemo /> */}
    </div>
  );
}

export default App;
