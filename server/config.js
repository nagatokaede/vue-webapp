'use static';

const env = process.env;

module.exports = {
  mode: env.NODE_ENV || 'development',
  port: env.PORT || '3002',

  proxy: [
    {
      target: `http://${env.KOA_SERVER || 'nagato.top:3000'}/`,
      context: 'api',
    },
    {
      target: `http://${env.DEV_SERVER || 'localhost:3001'}/`,
      context: 'webpack-getaway',
    }
  ]
};
