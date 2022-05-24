const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { log, ExpressAPILogMiddleware } = require('@rama41222/node-logger');
require('dotenv').config();
const indexRouter = require('../services/index');
const usersRouter = require('../services/users/controller/users');

const config = {
  name: 'sample-express-app',
  port: process.env.PORT,
  host: '0.0.0.0',
};

const app = express();
const logger = log({ console: true, file: false, label: config.name });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(ExpressAPILogMiddleware(logger, { request: true }));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// Error handler
app.use((error, req, res) => {
  res.status(error.status || 500);
  res.json({
    status: error.status,
    message: error.status ? error.message : 'Ha ocurrido un error inesperado',
  });
});

app.listen(config.port, config.host, (e) => {
  if (e) {
    throw new Error('Internal Server Error');
  }
  logger.info(`${config.name} running on ${config.host}:${config.port}`);
});
