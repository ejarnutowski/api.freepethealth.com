const db = require('mongoose');

const purgeAll = () => {
  return Promise.all([
    db.model('Pet').deleteMany({}),
    db.model('Record').deleteMany({}),
    db.model('User').deleteMany({}),
  ]);
};

module.exports = {
  purgeAll,
};
