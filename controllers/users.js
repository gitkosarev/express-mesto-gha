const mongooseError = require('mongoose').Error;
const statusCode = require('http2').constants;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const UnauthorizedError = require('../errors/UnauthorizedError');

const handleCatchedError = (err, res) => {
  if (err instanceof NotFoundError) {
    res.status(err.statusCode).send({ message: err.message });
  } else if (err instanceof BadRequestError) {
    res.status(err.statusCode).send({ message: err.message });
  } else if (err instanceof UnauthorizedError) {
    res.status(err.statusCode).send({ message: err.message });
  } else if (err instanceof mongooseError.ValidationError) {
    res.status(statusCode.HTTP_STATUS_BAD_REQUEST).send({ message: `Данные не прошли валидацию: ${err.message}` });
  } else if (err instanceof mongooseError.CastError) {
    res.status(statusCode.HTTP_STATUS_BAD_REQUEST).send({ message: `Некоректный Id: ${err.message}` });
  } else if (err instanceof mongooseError.DocumentNotFoundError) {
    res.status(statusCode.HTTP_STATUS_NOT_FOUND).send({ message: `Объект ${User.modelName} не найден: ${err.message}` });
  } else {
    res.status(statusCode.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Internal Server Error', error: err.message });
  }
};

// METHOD: GET
const getUsers = (req, res) => {
  User.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => handleCatchedError(err, res));
};

const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => handleCatchedError(err, res));
};

// METHOD: POST
const login = (req, res) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        'abrakadabra',
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch((err) => handleCatchedError(err, res));
};

const createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((result) => {
      res.status(statusCode.HTTP_STATUS_CREATED).send(result);
    })
    .catch((err) => handleCatchedError(err, res));
};

// METHOD: PATCH
const updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true, upsert: false },
  )
    .orFail()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => handleCatchedError(err, res));
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true, upsert: false },
  )
    .orFail()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => handleCatchedError(err, res));
};

module.exports = {
  getUsers,
  getUserById,
  login,
  createUser,
  updateUser,
  updateAvatar,
};
