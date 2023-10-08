const path = require('path')
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
        // path.join(__dirname,"../src/index.tsx"),//入口文件
    },
    output: {
        filename:"static/js/[name].js",//每个输出的js文件的名称
        path:path.join(__dirname,"../dist"),//打包结果输出的路径
        clean:true,//webapck5内置的，webpack4中需要配置clean-webpack-plugin来删除之前的dist
        publicPath:"/"//打包后文件的公共前缀路径
    },

    devtool: "source-map",

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json",".css", ".less", ".scss",".png"]
    },

    module: {
        rules: [
            {
                test: /\.html$/,
                use: [{
                    loader: "html-loader"
                }]
            },
            // { test: /\.tsx?$/, loader: "ts-loader" },
            {
                test:/.(ts|tsx)$/,//匹配ts、tsx文件
                use:{
                    loader:"babel-loader",
                    options:{
                        //预设执行顺序由右往左，所以这里是先处理ts再处理jsx
                        presets:[
                            "@babel/preset-react",
                            "@babel/preset-typescript"
                        ]
                    }
                }
            },
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
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                use: [{
                    loader: "url-loader",
                    options: {
                        name: "[name]-[hash:5].min.[ext]", //输出文件的名字
						limit: 8192,
						outputPath: 'image', //配置图片路径
                    }
                }]
            },
            {
                test:/\.ico$/,
                use:[
                    {
                        loader:'file-loader',  //npm i file-loader -D
                        options:{
                            name:'[name].[ext]',
                            outputPath:'assets/icons'
                        }
                    }
                ]
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