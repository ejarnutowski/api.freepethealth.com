const router = require('express').Router();
const catchAsync = require('../middleware/catchAsync');
const userRepository = require('../db/repositories/user');
const rules = require('../validation/rules');
const validate = require('../validation/validate');

/**
 * Create user
 */
router.post('/', catchAsync(async (req, res) => {
  validate(req, {
    body: {
      name: rules.string.required(),
    }
  });
  const user = await userRepository.createOne({ name: req.body.name });
  res.send(user);
}));

module.exports = router;
