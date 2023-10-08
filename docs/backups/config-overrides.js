const {
  override,
  overrideDevServer,
  addWebpackAlias,
  fixBabelImports,
  useEslintRc,
  addWebpackResolve,
  addWebpackPlugin,
  addWebpackExternals,
  addWebpackModuleRule,
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

module.exports = {
  webpack: override(
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
  devServer: overrideDevServer((config) => {
    config.proxy = {
      '/proxy/': {
        target: 'http://127.0.0.1:7001/v1',
        changeOrigin: true,
        pathRewrite: { '^/proxy': '/' },
      },
    };
    return config;
  }),
};
