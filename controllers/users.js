const User = require('../models/user');

// METHOD: GET
const getUsers = (req, res) => {
  User.find()
    .then((result) => {
      if (result) {
        res.send(result);
      } else {
        res.status(404).send({ message: 'Пользователи не найдены.' });
      }
    })
    .catch((err) => res.status(400).send({ message: `Произошла ошибка: ${err.message}` }));
};

const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((result) => {
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(404).send({ message: 'Пользователь не найден.' });
      }
    })
    .catch((err) => res.status(400).send({ message: `Произошла ошибка: ${err.message}` }));
};

// METHOD: POST
const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((result) => {
      if (result) {
        res.status(201).send(result);
      } else {
        res.status(400).send({ message: 'Произошла ошибка при добавлении пользователя' });
      }
    })
    .catch((err) => res.status(400).send({ message: `Произошла ошибка: ${err.message}` }));
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
        res.status(400).send({ message: 'Произошла ошибка при обновлении пользователя' });
      }
    })
    .catch((err) => res.status(400).send({ message: `Произошла ошибка: ${err.message}` }));
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
        res.status(400).send({ message: 'Произошла ошибка при обновлении аватара' });
      }
    })
    .catch((err) => res.status(400).send({ message: `Произошла ошибка: ${err.message}` }));
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar
};