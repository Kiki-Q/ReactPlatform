const webpack = require('webpack');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: "production",
    entry: {
        "app": ["./src/app.tsx"],
        "main": ["./main.tsx"]
    },
    output: {
        filename: "[name].js",
        path: __dirname + "/dist"
    },

    devtool: "source-map",

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            {
                test: /\.html$/,
                use: [{
                    loader: "html-loader"
                }]
            },
            { test: /\.tsx?$/, loader: "ts-loader" },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [{
                    //mini-css-extract-plugin:加载和分离css文件
                    loader: MiniCssExtractPlugin.loader 
                }, {
                    // 像使用js模块一样引入css和scss文件
                    loader: require.resolve('typings-for-css-modules-loader'),
                    options: {
                        modules: true,
                        namedExport: true,
                        camelCase: true,
                        localIdentName: '[name].[hash]'
                    }
                }, {
                    // sass-loader用来加载scss
                    loader: require.resolve('sass-loader')
                }]
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [{
                    loader: "url-loader",
                    options: {
                        name: "[name]-[hash:5].min.[ext]"
                    }
                }]
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./index.html",
            chunks: "app",
            // main是Electron的入口，这里需要排除。
            excludeChunks: ["main"],
            // 压缩选项
            minify: {
                collapseWhitespace: true
            }
        }),
        // typings-for-css-modules-loader会生成.d.ts文件，需要告诉webpack忽略它们。
        new webpack.WatchIgnorePlugin([/css\.d\.ts$/, /scss\.d\.ts$/]),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[hash].css'
        }),
        new CopyWebpackPlugin([{
            from: './image',
            to: 'assets/'
        }]),
        new CleanWebpackPlugin()
    ],
    // npm install -D terser-webpack-plugin@1.4.1
    // npm install -D optimize-css-assets-webpack-plugin@5.0.3
    optimization: {
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})]
    },

    target: "electron-renderer"
};