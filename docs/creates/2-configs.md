# REACT项目配置
## 路径配置
tsconfig
```
    "baseUrl": "./", // 路径配置
    "paths": {
      "@": ["src"],
      "@/*": ["src/*"]
    },
```

## 修改默认端口："start": "set PORT=9527 && react-scripts start",

## css相关(默认使用scss，配置简单一些)
### 样式模块化，ts配置
1. style.d.ts
```
declare module '*.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}
```
2. vscode 类名自动提示
```
npm install typescript-plugin-css-modules --save-dev

tsconfig>compilerOption>
"plugins": [{"name": "typescript-plugin-css-modules"}]
/* 编译范围 */
 "include": ["src", "src/types"]

<!-- 创建.vscode文件夹，添加settings.json文件: -->
"typescript.tsdk": "node_modules/typescript/lib",
"typescript.enablePromptUseWorkspaceTsdk": true
```

3. scss识别（less：https://juejin.cn/post/6844904181942222862）
```
npm i node-sass sass-loader --save-dev

```

## antd
### 引入
```
npm install antd --save
```
## 样式
```
npm i -D styled-components @types/styled-components
or
npm install --save @emotion/react
or
npm install --save @emotion/styled
```


