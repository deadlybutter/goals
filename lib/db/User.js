const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  handle: {
    type: String,
    index: true,
    unique: true,
    required: true,
  },
}, {
  timestamps: true,
});

const User = mongoose.model('user', schema);

module.exports = {
  model: User,

  findByHandle: handle => User.findOne({ handle }).exec()
};
