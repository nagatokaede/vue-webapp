'use static';

const Koa = require('koa');
const Static = require('koa-static');
const { resolve } = require('path');

const proxyMiddleware = require('./middleware/proxy');
const returnHomeMiddleware = require('./middleware/returnHome');

const { proxy, port } = require('./config');

const app = new Koa();

app.use(Static(resolve(__dirname, '../webapp')));

// 反向代理配置计算
const pathRewrite = {};
const router = {};
const context = [];
proxy.forEach(item => {
  context.push('/' + item.context);
  pathRewrite['^/' + item.context] = '';
  router['/' + item.context] = item.target;
});

// 反向代理中间件
app.use(proxyMiddleware(context, {
  target: 'http://',
  pathRewrite,
  changeOrigin: true,
  logLevel: 'debug',
  router,
  onError(err) {
    console.log(err);
  },
}));

// 导航页面返回 index.html
app.use(returnHomeMiddleware(resolve(__dirname, '../webapp/index.html')));

app.listen(port);
console.info('koa running: http://localhost:' + port);
