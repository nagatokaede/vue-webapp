'use static';

const { createProxyMiddleware } = require('http-proxy-middleware');
const c2k = require('koa2-connect');

const proxyMiddleware = (context, options) => {

  if (typeof options == 'string') {
    options = { target: options }
  }

  const proxy = createProxyMiddleware(context, options);

  return async function(ctx, next) {
    await c2k(proxy)(ctx, next)
  };
};

const proxyConfig = (config) => {
  // 反向代理配置计算
  const pathRewrite = {};
  const router = {};
  const context = [];
  config.forEach(item => {
    context.push('/' + item.context);
    pathRewrite['^/' + item.context] = '';
    router['/' + item.context] = item.target;
  });
  return {
    pathRewrite,
    router,
    context,
  };
};

module.exports = {
  proxyMiddleware,
  proxyConfig,
}
