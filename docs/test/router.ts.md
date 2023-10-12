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

```

##
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