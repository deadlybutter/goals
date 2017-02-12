require('./root');

const assert = require('chai').assert;

const db = require('../lib/db');

describe('completion model', function() {
  it ('should return the total completions', function() {
    const user = new db.User.model({ handle: 'test' });
    const goal = new db.Goal.model({ user, cycle: 1, title: 'test' });

    const completions = [];
    for (let i = 0; i < 10; i++) completions.push(new db.Completion.model({ user, goal }));

    return db.Completion.model.collection.insert(completions)
    .then(() => db.Completion.getTotalCompletionsPerUser(user))
    .then((total) => assert.equal(total, 10, 'total completions per user'))
    .then(() => db.Completion.getTotalCompletionsPerGoal(goal))
    .then((total) => assert.equal(total, 10, 'total completions per goal'));
  });

  it ('should return the goals in chronological order', function() {
    const user = new db.User.model({ handle: 'test' });

    const goals = [];
    for (let i = 0; i < 10; i++) goals.push(new db.Goal.model({ user, cycle: i * 1000, title: i }));

    return db.Goal.model.collection.insert(goals)
    .then(() => db.Goal.getUserGoalsInChronologicalOrder(user))
    .then((list) => {
      assert.isArray(list, 'goals is an array');
      assert.equal(list[0].cycle, 0, 'first goal is in the proper position');
    });
  });

  it ('should not allow more than a 100 goals', function() {
    const user = new db.User.model({ handle: 'test' });

    const goals = [];
    for (let i = 0; i < 100; i++) goals.push(new db.Goal.model({ user, cycle: i, title: i }));

    return db.Goal.model.collection.insert(goals)
    .then(() => {
      const goal = new db.Goal.model({ user, cycle: 1, title: 'test' });
      return goal.save().catch(err => assert.isDefined(err, 'Error thrown'));
    })
    .then(goal => assert.isUndefined(goal, 'Goal is undefined'));
  });

  it ('should find a user by handle', function() {
    const user = new db.User.model({ handle: 'test' });

    return user.save()
    .then(() => db.User.findByHandle('test'))
    .then(u => assert.equal(user.id, u.id, 'User ids match'));
  });
});
