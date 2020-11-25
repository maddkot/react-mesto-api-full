const router = require('express').Router();
const routersCards = require('./cards.js');
const routersUsers = require('./users.js');

router.use('/users', routersUsers);
router.use('/cards', routersCards);
router.use('/*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

module.exports = router;
