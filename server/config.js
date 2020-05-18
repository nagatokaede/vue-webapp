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
      target: `https://${env.DEV_SERVER || 'kaede-oss.oss-cn-shanghai.aliyuncs.com'}/`,
      context: 'oss',
    }
  ]
};
