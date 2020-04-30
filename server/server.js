'use static';

const Koa = require('koa');
const Static = require('koa-static');
const { resolve } = require('path');

const app = new Koa();

app.use(Static(resolve(__dirname, '../webapp')));

app.listen('3002');
console.info('koa running: http://localhost:3002');
