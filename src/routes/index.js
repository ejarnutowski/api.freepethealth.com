const router = require('express').Router();
const NotFoundError = require('../errors/NotFoundError');
const admin = require('./admin');
const pets = require('./pets');
const users = require('./users');

router.use('/admin', admin);
router.use('/pets', pets);
router.use('/users', users);

// Prevent "Not Found" error on favicon requests
router.get('/favicon.ico', (req, res) => {
  res.sendStatus(204);
});

// Disallow robots
router.get('/robots.txt', (req, res) => {
  res.send('User-agent: *\nDisallow: /');
});

// Catch all
router.all('*', (req, res) => {
  throw new NotFoundError;
});

module.exports = router;
