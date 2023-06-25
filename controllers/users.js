const User = require('../models/user');

// region: GET
const getUsers = (req, res) => {
  User.find()
    .then((result) => res.status(200).send({ data: result }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка: ${err.message}` }));
};

const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((result) => res.status(200).send({ data: result }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка: ${err.message}` }));
};

// region: POST
const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((result) => res.status(201).send({ data: result }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка: ${err.message}` }));
};

// region: PATCH
const updateUser = (req, res) => {
  const owner = req.user._id;
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    owner,
    { name, about },
    { new: true, runValidators: true, upsert: false }
  )
    .then((result) => res.status(200).send({ data: result }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка: ${err.message}` }));
};
const updateAvatar = (req, res) => {
  const owner = req.user._id;
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    owner,
    { avatar },
    { new: true, runValidators: true, upsert: false }
  )
    .then((result) => res.status(200).send({ data: result }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка: ${err.message}` }));
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar
};