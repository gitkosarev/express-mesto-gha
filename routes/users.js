const router = require('express').Router();
const {
  getUsers, getUserById, updateUser, updateAvatar,
} = require('../controllers/users');

// region: GET
router.get('/', getUsers);

router.get('/:userId', getUserById);

// region: PATCH
router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
