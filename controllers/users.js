const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');

const handleCatchedError = (err, res) => {
  if (err instanceof NotFoundError) {
    res.status(err.statusCode).send({ message: err.message });
  } else if (err instanceof BadRequestError) {
    res.status(err.statusCode).send({ message: err.message });
  } else {
    res.status(500).send({ message: 'Internal Server Error', error: err.message });
  }
};

// METHOD: GET
const getUsers = (req, res) => {
  User.find()
    .then((result) => {
      if (result) {
        res.status(200).send(result);
      } else {
        throw new NotFoundError('Пользователи не найдены.');
      }
    })
    .catch((err) => handleCatchedError(err, res));
};

const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((result) => {
      if (result) {
        res.status(200).send(result);
      } else {
        throw new NotFoundError('Пользователи не найдены.');
      }
    })
    .catch((err) => handleCatchedError(err, res));
};

// METHOD: POST
const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((result) => {
      if (result) {
        res.status(201).send(result);
      } else {
        throw new BadRequestError('Произошла ошибка при добавлении пользователя');
      }
    })
    .catch((err) => handleCatchedError(err, res));
};

// METHOD: PATCH
const updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true, upsert: false }
  )
    .then((result) => {
      if (result) {
        res.status(200).send(result);
      } else {
        throw new BadRequestError('Произошла ошибка при обновлении пользователя');
      }
    })
    .catch((err) => handleCatchedError(err, res));
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true, upsert: false }
  )
    .then((result) => {
      if (result) {
        res.status(200).send(result);
      } else {
        throw new BadRequestError('Произошла ошибка при обновлении аватара');
      }
    })
    .catch((err) => handleCatchedError(err, res));
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar
};