#
```
npm install --save-dev webpack webpack-cli webpack-dev-server
```

## loader
```
npm i babel-loader @babel/core @babel/preset-react @babel/preset-typescript -D 

```

## html-webpack-plugin: webapck.base.js
```
npm i html-webpack-plugin -D

const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
    // ...
    plugins:[
        new HtmlWebpackPlugin({
            template:path.resolve(__dirname,"../public/index.html"),//模板用定义root节点的模板
            // 收藏夹图标
            favicon: path.resolve(__dirname, "./public/logo.ico"),
            inject:true//自动注入静态资源
        })
    ],
}
```

## webpack-dev-server: webpack-dev-server
```
npm i webpack-dev-server -D
<!-- 合并基本配置 -->
npm i webpack-merge -D

const path = require("path")
const {merge} = require("webpack-merge")
const baseConfig = require("./webpack.base.js")

//合并公共配置，并添加开发环境配置
module.exports = merge(baseConfig,{
    mode:"development",//开发模式下打包速度更快，省去了一些代码优化步骤

    devtool:"eval-cheap-module-source-map",//源码调试的模式，后面单独会说

    devServer:{
        port:3000,//服务端口号
        hot:true,//开启热模块替换功能，后面会有对react模块热替换的具体配置
        compress:false,//gzip压缩，开发环境下不用开启，提升热更新的速度
        historyApiFallback:true,//解决history路由一刷新变404的问题
        static:{
            directory:path.join(__dirname,"../public"),//托管静态资源public文件夹
        }
    }
})

package.json添加dev脚本：
"dev": "webpack-dev-server -c build/webpack.dev.js"
```

## webpack.prod.js
```
const {merge} = require("webpack-merge")
const baseConfig = require("./webpack.base.js")

module.exports = merge(baseConfig,{
    mode:"production",//生产模式下，会开启tree-shaking和压缩代码，以及其他优化
})

"build":"webpack -c build/webpack.prod.js"

```
打包后的dist文件可以在本地借助node服务器serve打开,全局安装serve
```
npm i serve -g
<!-- 执行 -->
serve -s dist
```

## 环境变量
```
<!-- 用来兼容各种系统的设置环境变量的包 -->
npm i cross-env -D

<!-- webpack-DefinePlugin：为业务代码注入环境变量，webpack内置的有 -->

package.json
  "dev:dev": "cross-env NODE_ENV=development BASE_ENV=development webpack-dev-server -c build/webpack.dev.js",
  "dev:test": "cross-env NODE_ENV=development BASE_ENV=test webpack-dev-server -c build/webpack.dev.js",
  "dev:pre": "cross-env NODE_ENV=development BASE_ENV=pre webpack-dev-server -c build/webpack.dev.js",
  "dev:prod": "cross-env NODE_ENV=development BASE_ENV=production webpack-dev-server -c build/webpack.dev.js",
  
  "build:dev": "cross-env NODE_ENV=production BASE_ENV=development webpack -c build/webpack.prod.js",
  "build:test": "cross-env NODE_ENV=production BASE_ENV=test webpack -c build/webpack.prod.js",
  "build:pre": "cross-env NODE_ENV=production BASE_ENV=pre webpack -c build/webpack.prod.js",
  "build:prod": "cross-env NODE_ENV=production BASE_ENV=production webpack -c build/webpack.prod.js",

<!-- webpack.base.js -->
plugins:[
		new webpack.DefinePlugin({
            "process.env.BASE_ENV":JSON.stringify(process.env.BASE_ENV)
        })
	]
```

## 开启一下ts装饰器支持,修改tsconfig.json文件
```
npm i @babel/plugin-proposal-decorators -D

// tsconfig.json
{
  "compilerOptions": {
    // ...
    // 开启装饰器使用
    "experimentalDecorators": true
  }
}

<!-- 在babel.config.js中添加插件 -->
module.exports = { 
  // ...
  "plugins": [
    ["@babel/plugin-proposal-decorators", { "legacy": true }]
  ]
}

```

## css & less配置：https://juejin.cn/post/6933017352522956814
```
npm i style-loader css-loader -D

npm i less-loader less -D

<!-- webpack.base.js -->
module.exports = {
  // ...
  module: { 
    rules: [
      // ...
      {
        test: /.(css|less)$/, //匹配 css和less 文件
        use: ['style-loader','css-loader',
        // 新增
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: ['autoprefixer']
            }
          }
        },
        'less-loader']
      }
    ]
  },
  // ...
}

<!-- 处理css3前缀兼容 -->
npm i postcss-loader autoprefixer -D

<!-- 配置完成后,需要有一份要兼容浏览器的清单,让postcss-loader知道要加哪些浏览器的前缀,在根目录下创建 .browserslistrc文件: -->
IE 9 # 兼容IE 9
chrome 35 # 兼容chrome 35

<!-- postcss.config.js -->
module.exports = {
  plugins: ['autoprefixer']
}

module.exports = {
  // ...
  module: { 
    rules: [
      // ...
      {
        test: /.(css|less)$/, //匹配 css和less 文件
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'less-loader'
        ]
      },
    ]
  },
  // ...
}

```

## 安装Babel/babel预设处理js兼容
```

<!-- babel-loader: 使用 babel 加载最新js代码并将其转换为 ES5（上面已经安装过）
@babel/core: babel 编译的核心包
@babel/preset-env: babel 编译的预设,可以转换目前最新的js标准语法
core-js: 使用低版本js语法模拟高版本的库,也就是垫片 -->

npm i babel-loader @babel/core @babel/preset-env  @babel/plugin-transform-runtime @babel/preset-react core-js@3 -D
```
babel.config.js
```
module.exports = {
    "presets":[
        "@babel/preset-env",
        "@babel/preset-react"    
    ]
}
```
package.json
```
"scripts": {
  "start": "webpack-dev-server --config webpack.config.js",
  "build": "webpack --config webpack.config.js"
  // 其他命令
},
```
webpack.base.js
```
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /.(ts|tsx)$/,
        // 排除node_modules
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            // 执行顺序由右往左,所以先处理ts,再处理jsx,最后再试一下babel转换为低版本语法
            presets: [
              [
                "@babel/preset-env",
                {
                  // 设置兼容目标浏览器版本,这里可以不写,babel-loader会自动寻找上面配置好的文件.browserslistrc
                  // "targets": {
                  //  "chrome": 35,
                  //  "ie": 9
                  // },
                   "useBuiltIns": "usage", // 根据配置的浏览器兼容,以及代码中使用到的api进行引入polyfill按需添加
                   "corejs": 3, // 配置使用core-js低版本
                  }
                ],
              '@babel/preset-react',
              '@babel/preset-typescript'
            ],
            // 使用transform-runtime，避免全局污染，注入helper
            plugins: ["@babel/plugin-transform-runtime"],
          }
        }
      }
    ]
  }
}

```

## public 静态文件处理
```
npm i copy-webpack-plugin -D

<!-- webpack.prod.js -->
// webpack.prod.js
// ..
const path = require('path')
const CopyPlugin = require('copy-webpack-plugin');
module.exports = merge(baseConfig, {
  mode: 'production',
  plugins: [
    // 复制文件插件
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../public'), // 复制public下文件
          to: path.resolve(__dirname, '../dist'), // 复制到dist目录中
          filter: source => {
            return !source.includes('index.html') // 忽略index.html
          }
        },
      ],
    }),
  ]
})

```
## 图片处理
<!-- file-loader, 它会将图片复制至构建目录中，并且在代码中插入图片的url
url-loader, 它会将size小于某个大小的图片转换成base64编码，其他的则用file-loader加载。通过url-loader可以将许多细小的图片直接放入代码，减少页面渲染的时候发出的http请求
raw-loader，它直接将文件的内容复制到产物中，适用于svg场景 -->

webpack.base.js
```
module.exports = {
  module: {
    rules: [
      // ...
      {
        test:/.(png|jpe?g|gif|svg|webp)$/, // 匹配图片文件
        type: "asset", // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb转base64位
          }
        },
        generator:{ 
          filename:'static/images/[name][ext]', // 文件输出目录和命名
        },
      },
    ]
  }
}

```
新增src/images.d.ts文件
```
declare module '*.svg'
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'
declare module '*.bmp'
declare module '*.tiff'
declare module '*.less'
declare module '*.css'
```

## 处理字体和媒体文件
webpack.base.js
```
{
  test:/.(woff2?|ttf|eot)$/, // 匹配图片文件
  type: "asset", // type选择asset
  parser: {
    dataUrlCondition: {
      maxSize: 10 * 1024, // 小于10kb转base64位
    }
  },
  generator:{ 
    filename:'static/font/[name][ext]', // 文件输出目录和命名
  },
},
{
  test:/.(mp4|mp3|webm|wav|flac|aac|oog)$/, // 匹配图片文件
  type: "asset", // type选择asset
  parser: {
    dataUrlCondition: {
      maxSize: 10 * 1024, // 小于10kb转base64位
    }
  },
  generator:{ 
    filename:'static/media/[name][ext]', // 文件输出目录和命名
  },
},
```

## 配置react热模块替换（HMR）
```
npm i @pmmmwh/react-refresh-webpack-plugin react-refresh -D

// webpack.dev.js
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = merge(baseConfig, {
  // ...
  plugins: [
    new ReactRefreshWebpackPlugin(), // 添加热更新插件
  ]
})

<!-- 修改babel.config.js -->
const isDEV = process.env.NODE_ENV === 'development' // 是否是开发模式
module.exports = {
  // ...
  "plugins": [
    isDEV && require.resolve('react-refresh/babel'), // 如果是开发模式,就启动react热更新插件
    // ...
  ].filter(Boolean) // 过滤空值
}


```


## sass
```
npm i sass-resources-loader -D
```

##
```
npm i uglifyjs-webpack-plugin -D
```

## 优化构建速度
### 构建耗时分析
```
npm i speed-measure-webpack-plugin -D

<!-- build/webpack.analy.js -->
const prodConfig = require('./webpack.prod.js') // 引入打包配置
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin'); // 引入webpack打包速度分析插件
const smp = new SpeedMeasurePlugin(); // 实例化分析插件
const { merge } = require('webpack-merge') // 引入合并webpack配置方法

// 使用smp.wrap方法,把生产环境配置传进去,由于后面可能会加分析配置,所以先留出合并空位
module.exports = smp.wrap(merge(prodConfig, {

}))

<!-- 修改package.json添加启动webpack打包分析脚本命令,在scripts新增： -->
"build:analy": "cross-env NODE_ENV=production BASE_ENV=production webpack -c build/webpack.analy.js"

```
### 开启持久化存储缓存
修改webpack.base.js:
```
// webpack.base.js
// ...
module.exports = {
  // ...
  cache: {
    type: 'filesystem', // 使用文件缓存
  },
}
```
### 开启多线程loader
```
npm i thread-loader -D
<!-- 注意：使用时,需将此 loader 放置在其他 loader 之前。放置在此 loader 之后的 loader 会在一个独立的 worker 池中运行。 -->

// webpack.base.js
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /.(ts|tsx)$/,
        use: ['thread-loader', 'babel-loader']
      }
    ]
  }
}
<!-- 由于thread-loader不支持抽离css插件MiniCssExtractPlugin.loader(下面会讲),所以这里只配置了多进程解析js,开启多线程也是需要启动时间,大约600ms左右,所以适合规模比较大的项目 -->

```
### 配置alias别名
### 缩小loader作用范围
```
const path = require('path')
module.exports = {
  // ...
  module: {
    rules: [
      {
        include: [path.resolve(__dirname, '../src')], 只对项目src文件的ts,tsx进行loader解析
        test: /.(ts|tsx)$/,
        use: ['thread-loader', 'babel-loader']
      }
    ]
  }
}

```
### 精确使用loader
我们可以通过减少无用的loader解析来提升构建的速度，比如避免使用less-loader来解析css文件。
### 缩小模块的搜索范围
```
const path = require('path')
module.exports = {
  // ...
  resolve: {
     // ...
     modules: [path.resolve(__dirname, '../node_modules')], // 查找第三方模块只在本项目的node_modules中查找
  },
}
```
### devtool配置:不同的映射模式会明显影响到构建和重新构建的速度
开发环境推荐使用：eval-cheap-module-source-map


## 优化构建结果
### webpack包分析工具
```
npm install webpack-bundle-analyzer -D

<!-- 修改webpack.analy.js: -->
// webpack.analy.js
const prodConfig = require('./webpack.prod.js')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const smp = new SpeedMeasurePlugin();
const { merge } = require('webpack-merge')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer') // 引入分析打包结果插件
module.exports = smp.wrap(merge(prodConfig, {
  plugins: [
    new BundleAnalyzerPlugin() // 配置分析打包结果插件
  ]
}))

```
### 抽取css样式文件
```
npm i mini-css-extract-plugin -D

<!-- 修改webpack.base.js -->

{
  test: /.css$/, //匹配 css和less 文件
  include: [path.resolve(__dirname, '../src')],
  use: [
    isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
    'css-loader',
    'postcss-loader',
  ]
},
{
  test: /.less$/, //匹配 css和less 文件
  include: [path.resolve(__dirname, '../src')],
  use: [
    isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
    'css-loader',
    'postcss-loader',
    'less-loader'
  ]
},

<!-- 再修改webpack.prod.js, 打包时添加抽离css插件 -->
// webpack.prod.js
// ...
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = merge(baseConfig, {
  mode: 'production',
  plugins: [
    // ...
    // 抽离css插件
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].css' // 抽离css的输出目录和名称
    }),
  ]
})
```

### 压缩css文件/压缩js文件
```
npm i css-minimizer-webpack-plugin -D

// webpack.prod.js
// ...
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
module.exports = {
  // ...
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(), // 压缩css
    ],
  },
}

npm i terser-webpack-plugin -D

// ...
const TerserPlugin = require('terser-webpack-plugin')
module.exports = {
  // ...
  optimization: {
    minimizer: [
      // ...
      new TerserPlugin({ // 压缩js
        parallel: true, // 开启多线程压缩
        terserOptions: {
          compress: {
            pure_funcs: ["console.log"] // 删除console.log
          }
        }
      }),
    ],
  },
}

```
### 合理配置打包文件hash
hash：跟整个项目的构建有关，只要项目里面有文件修改，那么整个项目构建的hash都会改变
chunkhash:文件本身修改或者依赖的文件修改，chunkhash值会改变
contenthash:每个文件有一个单独的hash值，文件的改动只会影响自身的hash

### 代码分隔第三方包和公共的模块
修改webpack.prod.js:
```
splitChunks: { // 分隔代码
      cacheGroups: {
        vendors: { // 提取node_modules代码
          test: /node_modules/, // 只匹配node_modules里面的模块
          name: 'vendors', // 提取文件命名为vendors,js后缀和chunkhash会自动加
          minChunks: 1, // 只要使用一次就提取出来
          chunks: 'initial', // 只提取初始化就能获取到的模块,不管异步的
          minSize: 0, // 提取代码体积大于0就提取出来
          priority: 1, // 提取优先级为1
        },
        commons: { // 提取页面公共代码
          name: 'commons', // 提取文件命名为commons
          minChunks: 2, // 只要使用两次就提取出来
          chunks: 'initial', // 只提取初始化就能获取到的模块,不管异步的
          minSize: 0, // 提取代码体积大于0就提取出来
        }
      }
}

```

### tree-shaking清理未引用的js
模式mode为production时就会默认开启tree-shaking功能以此来标记未引入代码然后移除掉,测试一下。

### 清理未使用的css
```
npm i css-minimizer-webpack-plugin -D

/ webpack.prod.js
// ...
const globAll = require('glob-all')
const PurgeCSSPlugin = require('purgecss-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
  // ...
  plugins: [
    // 抽离css插件
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash:8].css'
    }),
    // 清理无用css
    new PurgeCSSPlugin({
      // 检测src下所有tsx文件和public下index.html中使用的类名和id和标签名称
      // 只打包这些文件中用到的样式
      paths: globAll.sync([
        `${path.join(__dirname, '../src')}/**/*.tsx`,
        path.join(__dirname, '../public/index.html')
      ]),
      safelist: {
        standard: [/^ant-/], // 过滤以ant-开头的类名，哪怕没用到也不删除
      }
    }),
  ]
}

```

### 资源懒加载
webpack默认支持资源懒加载,只需要引入资源使用import语法来引入资源,webpack打包的时候就会自动打包为单独的资源文件,等使用到的时候动态加载。
```
import React, { lazy, Suspense, useState } from 'react'
const LazyDemo = lazy(() => import('@/components/LazyDemo')) // 使用import语法配合react的Lazy动态引入资源

function App() {
  const [ show, setShow ] = useState(false)
  
  // 点击事件中动态引入css, 设置show为true
  const onClick = () => {
    import('./app.css')
    setShow(true)
  }
  return (
    <>
      <h2 onClick={onClick}>展示</h2>
      {/* show为true时加载LazyDemo组件 */}
      { show && <Suspense fallback={null}><LazyDemo /></Suspense> }
    </>
  )
}
export default App

```

### 打包时生成gzip文件
```
npm i compression-webpack-plugin -D

<!-- 添加配置,修改webpack.prod.js： -->
const glob = require('glob')
const CompressionPlugin  = require('compression-webpack-plugin')
module.exports = {
  // ...
  plugins: [
     // ...
     new CompressionPlugin({
      test: /.(js|css)$/, // 只生成css,js压缩文件
      filename: '[path][base].gz', // 文件命名
      algorithm: 'gzip', // 压缩格式,默认是gzip
      test: /.(js|css)$/, // 只生成css,js压缩文件
      threshold: 10240, // 只有大小大于该值的资源会被处理。默认值是 10k
      minRatio: 0.8 // 压缩率,默认值是 0.8
    })
  ]
}

```
