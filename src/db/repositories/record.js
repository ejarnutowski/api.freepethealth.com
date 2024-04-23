const db = require('mongoose');

const getAllByPetId = (petId) => {
  return db.model('Record').find({ pet: petId });
};

const createOne = data => {
  return db.model('Record').create(data);
};

module.exports = {
  getAllByPetId,
  createOne,
};