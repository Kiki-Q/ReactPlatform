#
```
npm i webpack -D
```
## 路径别名配置
```
npm install react-app-rewired customize-cra --save-dev

config-overrides.js>
const { override, addWebpackAlias } = require('customize-cra')
const path = require('path')
module.exports = override(
  addWebpackAlias({
    // 指定@符指向src目录
    '@': path.resolve(__dirname, 'src'),
  })
)
并且 tsconfig.json>
"paths": {
  "@": ["./src"],
  "@/*": ["./src/*"]
},

scripts>
  "start": "set PORT=9527 && react-app-rewired start",
  "build": "react-app-rewired build",
  "test": "react-app-rewired test",
  "eject": "react-app-rewired eject",


```

## 跨域配置
```

```

## less配置：https://juejin.cn/post/6933017352522956814
```
addLessLoader({
  javascriptEnabled: true,
  modifyVars: {
    '@primary-color': '#1DA57A'
  }
}),
```
## sass
```
npm i sass-resources-loader -D
```

##
```
npm i uglifyjs-webpack-plugin -D
```














## Webpack


## babel

## loader

## 热更新

## scources

## 性能优化