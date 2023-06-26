const mongooseError = require('mongoose').Error;
const statusCode = require('http2').constants;
const Card = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');

const handleCatchedError = (err, res) => {
  if (err instanceof NotFoundError) {
    res.status(err.statusCode).send({ message: err.message });
  } else if (err instanceof BadRequestError) {
    res.status(err.statusCode).send({ message: err.message });
  } else if (err instanceof mongooseError.ValidationError) {
    res.status(statusCode.HTTP_STATUS_BAD_REQUEST).send({ message: `Данные не прошли валидацию: ${err.message}` });
  } else if (err instanceof mongooseError.CastError) {
    res.status(statusCode.HTTP_STATUS_BAD_REQUEST).send({ message: `Некоректный Id: ${err.message}` });
  } else if (err instanceof mongooseError.DocumentNotFoundError) {
    res.status(statusCode.HTTP_STATUS_NOT_FOUND).send({ message: `Объект ${Card.modelName} не найден: ${err.message}` });
  } else {
    res.status(statusCode.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: `Internal Server Error: ${err.message}` });
  }
};

// METHOD: GET
module.exports.getCards = (req, res) => {
  Card.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => handleCatchedError(err, res));
};

module.exports.getCardById = (req, res) => {
  Card.findById(req.params.cardId)
    .orFail()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => handleCatchedError(err, res));
};

// METHOD: POST
module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((result) => {
      res.status(statusCode.HTTP_STATUS_CREATED).send(result);
    })
    .catch((err) => handleCatchedError(err, res));
};

// METHOD: DELETE
module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => handleCatchedError(err, res));
};

module.exports.deleteLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => handleCatchedError(err, res));
};

// METHOD: PUT
module.exports.putLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => handleCatchedError(err, res));
};
