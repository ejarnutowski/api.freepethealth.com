const router = require('express').Router();
const catchAsync = require('../middleware/catchAsync');
const fakeAuth = require('../middleware/fakeAuth');
const petRepository = require('../db/repositories/pet');
const recordRepository = require('../db/repositories/record');
const rules = require('../validation/rules');
const validate = require('../validation/validate');

/**
 * Get all pets
 */
router.get('/', fakeAuth, catchAsync(async (req, res) => {
  const pets = await petRepository.getAllByOwnerId(req.userId)
  res.send(pets);
}));

/**
 * Create one pet
 */
router.post('/', fakeAuth, catchAsync(async (req, res) => {
  validate(req, {
    body: {
      name: rules.string.required(),
      type: rules.string.required(),
      dateOfBirth: rules.string.required(),
    }
  });
  const pet = await petRepository.createOne({
    owner: req.userId,
    name: req.body.name,
    type: req.body.type,
    dateOfBirth: req.body.dateOfBirth,
  });
  res.send(pet);
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
  const pet = await petRepository.getOneByIdAndOwnerId(req.params.id, req.userId);
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
  const pet = await petRepository.getOneByIdAndOwnerId(req.params.id, req.userId);
  if (!pet) return res.sendNotFound(req);
  const records = await recordRepository.getAllByPetId(req.params.id);
  res.send(records);
}));

/**
 * Create one pet record
 */
router.post('/:id/records', fakeAuth, catchAsync(async (req, res) => {
  validate(req, {
    params: {
      id: rules.mongoDbId.required(),
    },
    body: {
      type: rules.string.required(),
      details: rules.object.required(),
    },
  });
  const pet = await petRepository.getOneByIdAndOwnerId(req.params.id, req.userId);
  if (!pet) return res.sendNotFound(req);
  const record = await recordRepository.createOne({
    type: req.body.type,
    pet: req.params.id,
    details: req.body.details,
  });
  res.send(record);
}));

module.exports = router;
