const Card = require('../models/card');

// METHOD: GET
module.exports.getCards = (req, res) => {
  Card.find()
    .then((result) => {
      if (result) {
        res.send(result);
      } else {
        res.status(404).send({ message: 'Данные не найдены.' });
      }
    })
    .catch((err) => res.status(400).send({ message: `Произошла ошибка: ${err.message}` }));
};

module.exports.getCardById = (req, res) => {
  Card.findById(req.params.cardId)
    .then((result) => {
      if (result) {
        res.send(result);
      } else {
        res.status(404).send({ message: 'Карточка не найдена.' });
      }
    })
    .catch((err) => res.status(400).send({ message: `Произошла ошибка: ${err.message}` }));
};

// METHOD: POST
module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((result) => {
      if (result) {
        res.status(201).send(result);
      } else {
        res.status(400).send({ message: 'Ошибка при добавлении карточки.' });
      }
    })
    .catch((err) => res.status(400).send({ message: `Произошла ошибка: ${err.message}` }));
};

// METHOD: DELETE
module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((result) => {
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(400).send({ message: 'Ошибка при удалении карточки.' });
      }
    })
    .catch((err) => res.status(400).send({ message: `Произошла ошибка: ${err.message}` }));
};

module.exports.deleteLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((result) => {
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(400).send({ message: 'Ошибка при удалении лайка.' });
      }
    })
    .catch((err) => res.status(400).send({ message: `Произошла ошибка: ${err.message}` }));
};

// METHOD: PUT
module.exports.putLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((result) => {
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(400).send({ message: 'Ошибка при добавлении лайка.' });
      }
    })
    .catch((err) => res.status(400).send({ message: `Произошла ошибка: ${err.message}` }));
};