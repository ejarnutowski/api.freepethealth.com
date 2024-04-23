const db = require('mongoose');

const Pet = new db.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  owner: {
    type: db.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  dateOfBirth: {
    type: String,
  },
  records: [{
    type: db.Schema.Types.ObjectId,
    ref: 'Record',
  }],
}, { timestamps: true });


db.model('Pet', Pet, 'pets');
