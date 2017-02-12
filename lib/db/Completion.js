const mongoose = require('mongoose');
const console = require('keypunch');

const schema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  goal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  }
}, {
  timestamps: true,
});

const Completion = mongoose.model('completion', schema);

module.exports = {
  model: Completion,

  /**
   * Find the total completions for this user.
   *
   * @param  {Object} user
   * @return {Int}
   */
  getTotalCompletionsPerUser: (user) => {
    return Completion.count({ user }).exec().catch(err => console.error(err));
  },

  /**
   * Find the total completions for this goal.
   *
   * @param  {Object} goal
   * @return {Int}
   */
  getTotalCompletionsPerGoal: (goal) => {
    return Completion.count({ goal }).exec().catch(err => console.error(err));
  },
};
