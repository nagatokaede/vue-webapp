'use static';

const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const merge = require('webpack-merge');
const common = require('./webpack.common');

process.env.NODE_ENV = 'production';

module.exports = merge(common('contenthash'), {
  plugins: [
    // 详细的 plugins 配置
    // 打包前清除过去打包的文件夹
    new CleanWebpackPlugin(),
    // CSS 文件压缩
    new OptimizeCssAssetsWebpackPlugin(),
    // 创建 html 文件
    new HtmlWebpackPlugin({
      template: './client/index.html',
      // 压缩html代码
      minify: {
        // 移除空格
        collapseWhitespace: true,
        // 移除注释
        removeComments: true
      }
    }),
  ],
  devtool: 'hidden-source-map',
  mode: 'production',
  // 1. 可以将node_modules中代码单独打包一个chunk最终输出
  // 2. 自动分析多入口chunk中，有没有公共的文件。如果有会打包成单独一个chunk
  optimization: {
    splitChunks: {
      chunks: 'all'
    },
    // 将当前模块的记录其他模块的hash单独打包为一个文件 runtime
    // 解决：修改a文件导致b文件的contenthash变化
    runtimeChunk: {
      name: entrypoint => `runtime-${entrypoint.name}`
    },
    minimizer: [
      // 配置生产环境的压缩方案：js和css
      new TerserWebpackPlugin({
        // 开启缓存
        cache: true,
        // 开启多进程打包
        parallel: true,
        // 启动source-map
        sourceMap: true
      })
    ]
  },
});
