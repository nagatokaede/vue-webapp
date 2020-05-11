module.exports = {
  apps : [{
    name: 'webapp',
    script: 'server/server.js',

    exec_mode: 'fork',
    max_memory_restart: '50M',

    env: {
      NODE_ENV: 'production',
      PORT: '8080',
    },
  
    listen_timeout: 10000,
  }],
};
