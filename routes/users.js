const router = require('express').Router();
const User = require('../models/user');

// GET
router.get('/', (req, res) => {
  res.send(`Users. Time now: ${Date.now()}`);
});

router.get('/:userId', (req, res) => {
  res.send(`User id: ${req.params.userId}`);
});

// POST
router.get('/', (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then(user => res.status(201).send({ data: user }))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
});

module.exports = router;