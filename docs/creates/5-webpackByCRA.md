#
```
npm i webpack
```
##
```
npm install react-app-rewired customize-cra --save-dev

config-overrides.js

scripts>
  "start": "set PORT=9527 && react-app-rewired start",
  "build": "react-app-rewired build",
  "test": "react-app-rewired test",
  "eject": "react-app-rewired eject",
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