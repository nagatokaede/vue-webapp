'use static';

const env = process.env;

module.exports = {
  mode: env.NODE_ENV || 'development',
  port: env.PORT || '3002',
  
  proxy: [
    {
      target: `https://${env.KOA_SERVER || 'localhost:3000'}/`,
      context: 'api-getaway',
    },
    {
      target: `https://${env.DEV_SERVER || 'localhost:3001'}/`,
      context: 'webpack-getaway',
    }
  ]
};
