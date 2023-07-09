const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { urlRegex } = require('../utils/regex');
const {
  getUsers, getUserById, updateUser, updateAvatar,
} = require('../controllers/users');

// region: GET
router.get('/', getUsers);

router.patch('/me', getUserById);

// region: PATCH
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUser);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(urlRegex),
  }),
}), updateAvatar);

module.exports = router;
