const statusCode = require('http2').constants;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const errorHandler = require('../middlewares/error-handler');

// METHOD: GET
const getUsers = (req, res, next) => {
  User.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => errorHandler(err, res, next));
};

const getUserById = (req, res, next) => {
  User.findById(req.user._id)
    .orFail()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => errorHandler(err, res, next));
};

// METHOD: POST
const login = (req, res, next) => {
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
    .catch((err) => errorHandler(err, res, next));
};

const createUser = (req, res, next) => {
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
    .catch((err) => errorHandler(err, res, next));
};

// METHOD: PATCH
const updateUser = (req, res, next) => {
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
    .catch((err) => errorHandler(err, res, next));
};

const updateAvatar = (req, res, next) => {
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
    .catch((err) => errorHandler(err, res, next));
};

module.exports = {
  getUsers,
  getUserById,
  login,
  createUser,
  updateUser,
  updateAvatar,
};
