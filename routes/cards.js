const router = require('express').Router();
const { getCards, createCard, deleteCard } = require('../controllers/cards');

// region: GET
router.get('/', getCards);

// region: POST
router.post('/', createCard);

// region: DELETE
router.delete('/:cardId', deleteCard);

module.exports = router;