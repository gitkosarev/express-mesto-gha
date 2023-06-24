const router = require('express').Router();
const { getUsers, getUserById, createUser } = require('../controllers/users');

// region: GET
router.get('/', getUsers);

router.get('/:userId', getUserById);

// region: POST
router.get('/', createUser);

module.exports = router;