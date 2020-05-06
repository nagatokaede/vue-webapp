'use static';

const { resolve } = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const merge = require('webpack-merge');
const common = require('./webpack.common');

process.env.NODE_ENV = 'development';

const os = require('os');
// 动态获取 host || 也可在package.json中配置 HOST （--host 0.0.0.0)
const HOST = (() => {
  for (const key in os.networkInterfaces()) {
    for (const item of os.networkInterfaces()[key]) {
      if (item.family === 'IPv4' && item.address.includes('192.168.')) {
        return item.address;
      }
    }
  }
})();

module.exports = merge(common('hash'), {
  plugins: [
    // 创建 html 文件
    new HtmlWebpackPlugin({
      template: './client/index.html'
    }),
  ],
  devtool: 'eval-source-map',
  mode: 'development',
  devServer: {
    // 运行代码的目录
    contentBase: resolve(__dirname, '../webapp'),
    // 监视 contentBase 目录下的所有文件，一旦文件变化就会 reload
    watchContentBase: true,
    // 启动gzip压缩，使体积更小
    compress: true,
    // 域名
    host: HOST,
    // 端口号
    port: 3001,
    // 自动打开浏览器
    open: true,
    // 启用热加载
    hot: true,
    // 设置代理
    proxy: {
      '/api': {
        // 请求域名
        target: 'http://nagato.top:3000',
        // 重写资源路径
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
});
