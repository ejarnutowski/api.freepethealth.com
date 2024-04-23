const models = [
  'Pet',
  'Record',
  'User',
];

const register = () => {
  models.forEach(model => require(`./${model}`));
};

module.exports = { register };
