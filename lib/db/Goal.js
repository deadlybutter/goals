const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  cycle: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  notes: {
    type: String,
  },
}, {
  timestamps: true,
});

schema.pre('save', function (next, done) {
  mongoose.models['goal'].count({ user: this.user })
    .exec()
    .then(total => total <= 100 ? done() : done(new Error('Max goals reached!')));
});

const Goal = mongoose.model('goal', schema);

module.exports = {
  model: Goal,

  /**
   * Retrieve all goals for the given user in chronological order.
   *
   * @param  {Object} user
   * @return {Array}
   */
  getUserGoalsInChronologicalOrder: (user) => {
    const timestamp = new Date();

    return Goal.find({ user })
    .exec()
    .then(goals => goals.sort((a, b) => (timestamp - b.cycle) - (timestamp - a.cycle)));
  },
};
