const request = require('supertest');
const { app } = require('./app'); // Adjust the path to reference app.js correctly
const { Student } = require('./models/schemas'); // Adjust the path to reference schemas.js correctly
const mongoose = require('mongoose');

// ... rest of your test code ...


const testDatabaseUrl = 'mongodb+srv://ericmarkcarlson:node123@cluster0.j4cyafb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Set up database connection for testing
beforeAll(async () => {
  await mongoose.connect(testDatabaseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();  // Optionally drop the test database
  await mongoose.disconnect();
});





// Tests for POST /students route


// You can add more tests for other routes following the pattern above.
