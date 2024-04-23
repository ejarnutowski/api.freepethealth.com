const router = require('express').Router();
const catchAsync = require('../../middleware/catchAsync');
const fakeAuth = require('../../middleware/fakeAuth');
const petRepository = require('../../db/repositories/pet');
const recordRepository = require('../../db/repositories/record');
const rules = require('../../validation/rules');
const validate = require('../../validation/validate');

/**
 * Get all pets
 */
router.get('/', fakeAuth, catchAsync(async (req, res) => {
  const pets = await petRepository.getAll()
  res.send(pets);
}));

/**
 * Get one pet
 */
router.get('/:id', fakeAuth, catchAsync(async (req, res) => {
  validate(req, {
    params: {
      id: rules.mongoDbId.required(),
    },
  });
  const pet = await petRepository.getOneById(req.params.id);
  if (!pet) return res.sendNotFound(req);
  res.send(pet);
}));

/**
 * Get all pet records
 */
router.get('/:id/records', fakeAuth, catchAsync(async (req, res) => {
  validate(req, {
    params: {
      id: rules.mongoDbId.required(),
    },
  });
  const records = await recordRepository.getAllByPetId(req.params.id);
  res.send(records);
}));

module.exports = router;
