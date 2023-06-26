const express = require('express');
const mongoose = require('mongoose');
const statusCode = require('http2').constants;
const router = require('./routes/index');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = { _id: '6497e58b2c6d91b628f097b2' };
  next();
});

app.use(router);

app.use((req, res) => {
  res.status(statusCode.HTTP_STATUS_NOT_FOUND).send({ message: `Машрут ${req.path} не найден` });
});

app.listen(PORT);
