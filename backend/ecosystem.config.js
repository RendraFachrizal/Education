module.exports = {
  apps: [{
    name: 'school-profile-api',
    script: 'server.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 5000
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 5000
    },
    watch: false,
    max_memory_restart: '512M',
    error_file: './logs/pm2/err.log',
    out_file: './logs/pm2/out.log',
    log_file: './logs/pm2/combined.log',
    time: true
  }]
};
