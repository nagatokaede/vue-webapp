'use static';

const Koa = require('koa');
const Static = require('koa-static');
const { resolve } = require('path');

const app = new Koa();

app.use(Static(resolve(__dirname, '../webapp')));

app.use(async (ctx, next) => {
  if (ctx.path === '/') ctx.body = 'hello world!';
  await next();
});

app.listen('3001');
console.info('koa running: http://localhost:3001');
