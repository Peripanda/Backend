const { log } = require('@rama41222/node-logger');
const app = require('./app');

const config = {
  name: 'sample-express-app',
  port: process.env.PORT,
  host: '0.0.0.0',
};

const logger = log({ console: true, file: false, label: config.name });

if (process.env.NODE_ENV !== 'test') {
  app.listen(config.port, config.host, (e) => {
    if (e) {
      throw new Error('Internal Server Error');
    }
    logger.info(`${config.name} running on ${config.host}:${config.port}`);
  });
}

module.exports = app;
