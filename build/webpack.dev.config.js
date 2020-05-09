'use static';

const { resolve } = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const merge = require('webpack-merge');
const common = require('./webpack.common');

const { proxy } = require('../server/config');

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

// 反向代理配置计算
const pathRewrite = {};
const router = {};
const context = [];
proxy.forEach(item => {
  context.push('/' + item.context);
  pathRewrite['^/' + item.context] = '';
  router['/' + item.context] = item.target;
});

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
    // 在所有响应中添加首部内容
    headers: {
      'Connection': 'keep-alive'
    },
    // 设置代理
    proxy: [{
      context,
      target: 'http://',
      pathRewrite,
      changeOrigin: true,
      logLevel: 'debug',
      router,
    }],
    // 在使用单页面应用的时候，需要设置此参数，代表如果访问除根路径以外的地址，最终都会转向去请求根路径。
    historyApiFallback: true,
  },
});
