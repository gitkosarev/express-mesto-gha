const router = require('express').Router();
const { getCards, createCard, deleteCard, putLike, deleteLike } = require('../controllers/cards');

// region: GET
router.get('/', getCards);

// region: POST
router.post('/', createCard);

// region: DELETE
router.delete('/:cardId', deleteCard);
router.delete('/:cardId/likes', deleteLike);

// region: PUT
router.put('/:cardId/likes', putLike);

module.exports = router;