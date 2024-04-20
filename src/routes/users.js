const joi = require('joi');
const router = require('express').Router();
const catchAsync = require('../middleware/catchAsync');
const validate = require('../validation');

/**
 * Get all users
 */
router.get('/', (req, res) => {
  res.send({
    name: 'elliott',
  });
});

// /**
//  * Get all users
//  */
// router.get('/', catchAsync(async (req, res) => {
//   res.send(await productRepository.getAll());
// }));

module.exports = router;