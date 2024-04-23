const db = require('mongoose');

const User = new db.Schema({
  name: {
    type: String,
    required: true,
  },
}, { timestamps: true });


db.model('User', User, 'users');
