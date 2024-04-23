const db = require('mongoose');

const getAll = () => {
  return db.model('Pet').find();
};

const getAllByOwnerId = ownerId => {
  return db.model('Pet').find({ owner: ownerId });
};

const getOneById = id => {
  return db.model('Pet').findOne({ _id: id });
};

const getOneByIdAndOwnerId = (id, ownerId) => {
  return db.model('Pet').findOne({ _id: id, owner: ownerId });
};

const createOne = data => {
  return db.model('Pet').create(data);
};

module.exports = {
  getAll,
  getAllByOwnerId,
  getOneById,
  getOneByIdAndOwnerId,
  createOne,
};