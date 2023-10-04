## 路径配置
tsconfig
```
    "baseUrl": "./", // 路径配置
    "paths": {
      "@": ["src"],
      "@/*": ["src/*"]
    },
```

## css相关
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


```
