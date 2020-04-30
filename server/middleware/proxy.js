'use static';

const { createProxyMiddleware } = require('http-proxy-middleware');
const c2k = require('koa2-connect');
const { proxy } = require('../config');

const context = proxy.map(item => item.context);

const options = () => {
  
  return {
    target: 'http://', // 默认 target ，所有代理在 router 里重定义
    changeOrigin: true, // needed for virtual hosted sites
    ws: true, // proxy websockets
    pathRewrite: {
      '^/api/old-path': '/api/new-path', // rewrite path
      '^/api/remove/path': '/path' // remove base path
    },
    router: {
      // when request.headers.host == 'dev.localhost:3000',
      // override target 'http://www.example.org' to 'http://localhost:8000'
      'dev.localhost:3000': 'http://localhost:8000'
    }
  };
};


module.exports = c2k(createProxyMiddleware(context, options()));


