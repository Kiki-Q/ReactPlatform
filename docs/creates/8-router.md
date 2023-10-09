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
import React, { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'
import { Navigate } from 'react-router-dom'

/* 路由懒加载 */
const Home = lazy(() => import('@/views/home'))
const Mine = lazy(() => import('@/views/mine'))

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/home" />
  },
  {
    path: '/home',
    element: <Home />
  },
  {
    path: '/mine',
    element: <Mine />
  }
]

export default routes
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
## 权限
## title
## queryparams、参数问题


