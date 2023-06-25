const Card = require('../models/card');

// METHOD: GET
module.exports.getCards = (req, res) => {
  Card.find()
    .then((result) => {
      if (!result) { res.status(404).send({ message: 'Данные не найдены.' }); }
      res.send({ data: result });
    })
    .catch((err) => res.status(500).send({ message: `Произошла ошибка: ${err.message}` }));
};

module.exports.getCardById = (req, res) => {
  Card.findById(req.params.cardId)
    .then((result) => {
      if (!result) { res.status(404).send({ message: 'Карточка не найдена.' }); }
      res.send({ data: result });
    })
    .catch((err) => res.status(500).send({ message: `Произошла ошибка: ${err.message}` }));
};

// METHOD: POST
module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((result) => res.status(201).send({ data: result }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка: ${err.message}` }));
};

// METHOD: DELETE
module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((result) => res.status(200).send({ data: result }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка: ${err.message}` }));
};

module.exports.deleteLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((result) => res.status(200).send({ data: result }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка: ${err.message}` }));
};

// METHOD: PUT
module.exports.putLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((result) => res.status(200).send({ data: result }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка: ${err.message}` }));
};