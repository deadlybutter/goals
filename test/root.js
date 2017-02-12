require('dotenv').config();

if (process.env.MONGODB_TEST_URI) process.env.MONGODB_URI = process.env.MONGODB_TEST_URI;

// Disable this if you're trying to debug while writing the test.
// process.env.LOG_LEVEL = 4;

// Enable this if you need further debugging
// process.env.DEBUG_MONGO = true

const mongoose = require('../lib/db').mongoose;

function dropDatabase(done) {
  mongoose.connection.db.dropDatabase(done);
}

beforeEach(function(done) {
  dropDatabase(done);
});

after(function(done) {
  dropDatabase(done)
});
