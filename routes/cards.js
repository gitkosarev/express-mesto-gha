const router = require('express').Router();

router.get('/', (req, res) => {
  res.send(`Cards. Time now: ${Date.now()}`);
});

module.exports = router;