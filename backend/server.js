const app = require('./app');
const config = require('./config/env');

const PORT = config.app.port;

app.listen(PORT, () => {
  console.log(`${config.app.name} running on port ${PORT} in ${config.app.env} mode`);
  console.log(`API: ${config.app.url}/api`);
});
