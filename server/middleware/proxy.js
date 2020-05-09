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


module.exports = proxyMiddleware;
