const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { log, ExpressAPILogMiddleware } = require('@rama41222/node-logger');
require('dotenv').config();
const indexRouter = require('../services/index');
const usersRouter = require('../services/users/controller/users');
const assetsRouter = require('../services/assets/controller/assets');

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
app.use('/assets', assetsRouter);

// Error handler
// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  logger.log('error', error.message);
  res.status(error.status || 500);
  res.json({
    status: error.status,
    message: error.status ? error.message : 'Ha ocurrido un error inesperado',
  });
});

module.exports = { app, logger };
