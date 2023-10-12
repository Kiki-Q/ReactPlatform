#
##
```
const history = useHistory<{a: number }>()
这样，在通过state携带参数时，就会有限制了。


import { LoginState } from "../types"
export default function Home() {
// 接收从login传入的值
const location = useLocation<LoginState>()
}

import { useParams } from 'react-router'
export default function Home() {
 const params = useParams<{ id: string }>()
 console.log(params.id)//这样就不会报错了
}

const navigate = useNavigate()
    // search、params传参直接在路径中传参，state在第二个参数里传
    navigate('detail',{
      replace: false,
      state: {
        id:m.id,
        title:m.title,
        content:m.content,
      }
    })
navigate(1) // 前进
navigate(-1) // 后退

```
传参
```
<Route path='/user' exact render={(props) => {
    // isLogin 从 redux 中拿到, 判断用户是否登录
    return isLogin ? <User {...props} name={'cedric'} /> : <div>请先登录</div>
}}></Route>

```

## title
```
import { useMatch } from 'react-router-dom';
import { Helmet } from 'react-helmet';
function About() {  
  const match = useMatch('/about');  
  useEffect(() => {    
    if (match && match.route.title) {      
      document.title = match.route.title;    
      }  
    }, [match]);  
    return (    
      <div>      
        <Helmet>       
        <title>{match.route.title}</title>     
        </Helmet>     
        <h1>About Page</h1>      
      </div>  
      );
  }

```

##
```
this.props.history 负责跳路由

this.props.location 负责存储路由信息（地址，参数）

this.props.match 负责存储路由信息（地址，参数）

this.props.history.push()  //跳转路由

this.props.history.replace() 

 this.props.history.go()  //前进 or 后退 

this.props.history.goBack() //后退  

this.props.history.goForward()  //前进
```

## 
```
   {
        path: '/home/message',
        element: <Message/>,
        children: [
          {
            path: 'detail/:id/:title/:content',
            element: <Detail/>
          }
        ]
      }

          messages.map(m => {
            return <li key={m.id}>
              <Link to={`detail/${m.id}/${m.title}/${m.content}`}>{m.title}</Link>
            </li>
          })

import { useParams } from 'react-router-dom'
const params = useParams();

import { useMatch } from 'react-router-dom'
const a = useMatch('/home/message/detail/:id/:title/:content');
```
```
          messages.map(m => {
            return <li key={m.id}>
              <Link to={`detail?id=${m.id}&title=${m.title}&content=${m.content}`}>{m.title}</Link>
            </li>
          })

import React from 'react'
import { useParams, useMatch, useSearchParams } from 'react-router-dom'

export default function Detail() {
  const [search, setSearch] = useSearchParams();
  const id = search.get('id');
  const title = search.get('title');
  const content = search.get('content');
  return (
    <ul>
      <button onClick={ () => setSearch('id=008&title=嘻嘻&content=哈哈') }>点我更改search参数</button>
      <li>id:{id}</li>
      <li>title:{title}</li>
      <li>content:{content}</li>
    </ul>
  )
}
```
```
import { useLocation } from 'react-router-dom'
const x = useLocation();

          messages.map(m => {
            return <li key={m.id}>
              <Link to="detail" state={{ id: m.id, title: m.title, content: m.content }}>{m.title}</Link>
            </li>
          })

import { useLocation } from 'react-router-dom'
const {state} = useLocation();

```