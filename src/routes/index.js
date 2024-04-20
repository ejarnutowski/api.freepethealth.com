const router = require('express').Router();
const NotFoundError = require('../errors/NotFoundError');
const users = require('./users');

router.get('/', (req, res) => {
  res.send('Welcome');
});

router.use('/users', require('./users'));

// Prevent "Not Found" error on favicon requests
router.get('/favicon.ico', (req, res) => {
  res.sendStatus(204);
});

// Disallow robots
router.get('/robots.txt', (req, res) => {
  res.send('User-agent: *\nDisallow: /');
});

// Catch all - not found
router.all('*', (req, res) => {
  throw new NotFoundError;
});

module.exports = router;
