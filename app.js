const express = require('express');
const mongoose = require('mongoose');
const statusCode = require('http2').constants;
const router = require('./routes/index');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);
app.use(router);

app.use((req, res) => {
  res.status(statusCode.HTTP_STATUS_NOT_FOUND).send({ message: `Машрут ${req.path} не найден` });
});

app.use((err, req, res, next) => {
  res.status(err.statusCode).send({ message: err.message });
  next();
});

app.listen(PORT);
