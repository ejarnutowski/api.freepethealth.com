const router = require('express').Router();
const pets = require('./pets');
const tools = require('./tools');

router.use('/pets', pets);
router.use('/tools', tools);

module.exports = router;
