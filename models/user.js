const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const { urlRegex } = require('../utils/regex');
const UnauthorizedError = require('../errors/UnauthorizedError');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: 'Incorrect email',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (value) => urlRegex.test(value),
      message: 'Incorrect URL for avatar',
    },
  },
});

userSchema.statics.findUserByCredentials = (email, password) => {
  this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Неправильные почта или пароль');
      } else {
        return bcrypt.compare(password, user.password)
          .then((success) => {
            if (!success) {
              throw new UnauthorizedError('Неправильные почта или пароль');
            } else {
              return user;
            }
          });
      }
    });
};

module.exports = mongoose.model('user', userSchema);
