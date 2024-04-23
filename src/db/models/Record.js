const db = require('mongoose');

const Record = new db.Schema({
  type: {
    type: String,
    required: true,
  },
  pet: {
    type: db.Schema.Types.ObjectId,
    ref: 'Pet',
    required: true,
  },
  details: {
    type: db.Schema.Types.Mixed,
    required: true,
  },
}, { timestamps: true });


db.model('Record', Record, 'records');
