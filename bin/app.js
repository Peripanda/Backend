require('dotenv').config();

const { app, logger } = require('./server');

const config = {
  name: 'sample-express-app',
  port: process.env.PORT,
  host: '0.0.0.0',
};

app.listen(config.port, config.host, (e) => {
  if (e) {
    throw new Error('Internal Server Error');
  }
  logger.info(`${config.name} running on ${config.host}:${config.port}`);
});

module.exports = app;
