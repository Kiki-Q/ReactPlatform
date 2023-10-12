const {
  override,
  addWebpackAlias,
  overrideDevServer,
} = require('customize-cra');
const path = require('path');
const webpack = require('webpack');

const ENV = {
  DEV: 'http://a.dev.example.com/',
  PROD: 'http://a.pro.example.com/',
};
const SECOND_ENV = {
  DEV: 'http://b.dev.example.com/',
  PROD: 'http://b.pro.example.com/',
};

const devServerConfig = () => (config) => {
  return {
    ...config,
    proxy: {
      '/api': {
        target: ENV.DEV,
        changeOrigin: true,
        secure: false,
      },
      '/bpi': {
        target: SECOND_ENV.DEV,
        changeOrigin: true,
        secure: false,
      },
      // 匹配capi开头的接口代理到第三个域名，并把capi去掉，
      '/capi': {
        target: 'http://c.dev.example.com',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/capi': '',
        },
      },
    },
  };
};

module.exports = {
  webpack: override(
    addWebpackAlias({
      // 指定@符指向src目录
      '@': path.resolve(__dirname, 'src'),
    })
  ),
  devServer: overrideDevServer(devServerConfig()),
};
