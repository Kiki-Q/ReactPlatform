const {
  override,
  overrideDevServer,
  addWebpackAlias,
  fixBabelImports,
  useEslintRc,
  addWebpackResolve,
  addWebpackPlugin,
  // addLessLoader,
  addPostcssPlugins,
  addWebpackExternals,
  addWebpackModuleRule, 
  addDecoratorsLegacy,
  useBabelRc,
  setWebpackOptimizationSplitChunks
} = require('customize-cra');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const myPlugin = [
  new UglifyJsPlugin({
    uglifyOptions: {
      warnings: false,
      compress: {
        drop_debugger: true,
        drop_console: true,
      },
    },
  }),
];

// const DefinePlugin = require('webpack').DefinePlugin
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

// module.exports = override(
//   addWebpackPlugin(
//     new DefinePlugin({
//       'test': 12244,
//     }),
//   ),
//   addWebpackPlugin(new BundleAnalyzerPlugin()),
// )

// // 安装less less-loader
// yarn add less less-loader -D
// // 安装compression-webpack-plugin 压缩js为gzip
// yarn add compression-webpack-plugin -D

const CompressionWebpackPlugin = require('compression-webpack-plugin');
// 打包配置
const addCustomize = () => config => {
  if (process.env.NODE_ENV === 'production') {
    // 关闭sourceMap
    config.devtool = false;
    // 配置打包后的文件位置
    config.output.path = __dirname + '../dist/demo/';
    config.output.publicPath = './demo';
    // 添加js打包gzip配置
    config.plugins.push(
      new CompressionWebpackPlugin({
        test: /.js$|.css$/,
        threshold: 1024,
      }),
    )
  }
  return config;
}

// 跨域配置
const devServerConfig = () => config => {
  return {
    ...config,
    // 服务开启gzip
    compress: true,
    proxy: {
      '/api': {
        target: 'xxx',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api',
        },
      }
    }
  }
}

// npm i --save-dev babel-plugin-import
// npm i --save antd

// npm i --save-dev @babel/plugin-proposal-decorators

// npm i react-hot-loader -D
// npm i react-app-rewire-hot-loader @hot-loader/react-dom -D

module.exports = {
  webpack: override(
    addDecoratorsLegacy(),
    // 注意，一定要用 path.resolve 引入eslint的配置文件，否则不生效
    useEslintRc(path.resolve(__dirname, './.eslintrc.js')),
    // 配置路径别名
    addWebpackAlias({
      '@': path.resolve(__dirname, './src'),
      _c: path.resolve(__dirname, './src/components'),
    }),
    // 配置antd 按需引入
    fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: 'css',
    }),
    // 导入文件的时候可以不用添加文件的后缀名
    addWebpackResolve({
      extensions: ['.tsx', '.ts', '.js', '.jsx', '.json'],
    }),
    addWebpackExternals({
      //不做打包处理配置，如直接以cdn引入的
      echarts: 'window.echarts',
      // highcharts:"window.highcharts"
    }),
    addWebpackModuleRule({
      test: /\.scss$/,
      use: [
        'style-loader',
        'css-loader',
        'sass-loader',
        {
          loader: 'sass-resources-loader',
          options: {
            resources: path.resolve(__dirname, 'src/asset/base.scss'), //全局引入公共的scss 文件
          },
        },
      ],
    }),
    // // ...其他配置...
    // adjustStyleLoaders(rule => {
    //   if (rule.test.toString().includes('scss')) {
    //     rule.use.push({
    //       loader: require.resolve('sass-resources-loader'),
    //       options: {
    //         resources: './src/assets/css/theme.scss'
    //       }
    //     });
    //   }
    // }),
    // addLessLoader({
    //     javascriptEnabled: true,
    //     modifyVars: { '@primary-color': '#1DA57A' },
    //     localIdentName: '[local]--[hash:base64:5]' // 自定义 CSS Modules 的 localIdentName
    // }),
    addPostcssPlugins([require('postcss-pxtorem')({ rootValue: 75, propList: ['*'], minPixelValue: 2, selectorBlackList: ['am-'] })]),
    addCustomize(),
    // 实现自定义 babel
    // .babelrc
    // {
    //   "presets": ["@babel/env"],
    //   "plugins": ["@babel/plugin-transform-runtime"]
    // }
    useBabelRc(),
    // 自定义拆包
    setWebpackOptimizationSplitChunks({
      maxSize: 1024 * 1024 * 3,
      minChunks: 2,
    }),
    (config) => {
      //暴露webpack的配置 config ,evn
      // 去掉打包生产map 文件
      // config.devtool = config.mode === 'development' ? 'cheap-module-source-map' : false;
      if (process.env.NODE_ENV === 'production') config.devtool = false;
      if (process.env.NODE_ENV !== 'development')
        config.plugins = [...config.plugins, ...myPlugin];

      return config;
    }
  ),
  // 处理跨域
  devServer: overrideDevServer(devServerConfig()),
  // The Jest config
  jest: function(config) {
    // ...add your jest config customisation...
    return config;
  },
};
