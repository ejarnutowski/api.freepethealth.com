const router = require('express').Router();
const catchAsync = require('../../middleware/catchAsync');
const fakeAuth = require('../../middleware/fakeAuth');
const toolsRepository = require('../../db/repositories/tools');
const rules = require('../../validation/rules');
const validate = require('../../validation/validate');

/**
 * Purge all data
 */
router.post('/purge-data', fakeAuth, catchAsync(async (req, res) => {
  validate(req, {
    body: {
      confirm: rules.boolean.required(),
    }
  });
  if (req.body.confirm !== true) {
    res.send()
  }
  const result = await toolsRepository.purgeAll();
  res.send(result);
}));


module.exports = router;
