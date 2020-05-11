module.exports = {
  apps : [{
    name: 'webapp',
    script: 'server/server.js',

    output: 'logs/out.log',
    error: 'logs/error.log',

    exec_mode: 'fork',
    max_memory_restart: '50M',

    env: {
      NODE_ENV: 'production',
      PORT: '8080',
      KOA_SERVER: 'localhost:3000',
    },
  
    listen_timeout: 10000,
  }],
};
