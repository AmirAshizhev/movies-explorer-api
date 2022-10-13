const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
require('dotenv').config();
const errorHandler = require('./middlewares/errorHandler');
const { errorLogger, requestLogger } = require('./middlewares/logger');
const router = require('./routes');

const { PORT = 3002, MONGO_DATABASE = 'mongodb://localhost:27017/moviesdb' } = process.env;

const app = express();
const allowedCors = [
  'localhost:3000',
  'localhost:3002',
  'http://localhost:3002',
  'http://localhost:3003',
  'http://movies-explorer.amir.nomoredomains.sbs',
];

app.use(bodyParser.json());

app.use((req, res, next) => {
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Origin', '*');
  const { method } = req;

  const requestHeaders = req.headers['access-control-request-headers'];
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Headers', requestHeaders);

    return res.end();
  }

  return next();
});

mongoose.connect(MONGO_DATABASE, {
  useNewUrlParser: true,
});

app.use(requestLogger);

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`app listening ${PORT}`);
});
