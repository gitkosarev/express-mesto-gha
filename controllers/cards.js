const Card = require('../models/card');

// region: GET
module.exports.getCards = (req, res) => {
  Card.find()
    .then((result) => res.status(200).send({ data: result }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка: ${err.message}` }));
};

module.exports.getCardById = (req, res) => {
  Card.findById(req.params.cardId)
    .then((result) => res.status(200).send({ data: result }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка: ${err.message}` }));
};

// region: POST
module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((result) => res.status(201).send({ data: result }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка: ${err.message}` }));
};

// region: DELETE
module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((result) => res.status(200).send({ data: result }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка: ${err.message}` }));
};