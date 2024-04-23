const db = require('mongoose');

const getAll = () => {
  return db.model('User').find();
};

const getOneById = id => {
  return db.model('User').findOne({ _id: id });
};

const createOne = data => {
  return db.model('User').create(data);
};

module.exports = {
  getAll,
  getOneById,
  createOne,
};