const router = require('express').Router();
const {
  getUsers, getUserById, updateUser, updateAvatar,
} = require('../controllers/users');

// region: GET
router.get('/', getUsers);
router.patch('/me', getUserById);

// region: PATCH
router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
