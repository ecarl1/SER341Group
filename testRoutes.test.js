const request = require('supertest');
const { app } = require('./app'); // Adjust the path to reference app.js correctly
const { Student } = require('./models/schemas'); // Adjust the path to reference schemas.js correctly
const mongoose = require('mongoose');

// ... rest of your test code ...


const testDatabaseUrl = 'mongodb+srv://ericmarkcarlson:node123@cluster0.j4cyafb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';



beforeAll(async () => {
  await mongoose.connect(testDatabaseUrl, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterEach(async () => {
  // Clean up the test database
  await Student.deleteMany({});
});

afterAll(async () => {
  // Close the Mongoose connection
  await mongoose.connection.close();
});

describe('POST /students', () => {
  test('It should create a new student and return it', async () => {
      const newStudent = {
          studentID: 'test-001',
          name: 'John Doe'
      };

      const response = await request(app)
          .post('/students')
          .send(newStudent)
          .expect(201)
          .expect('Content-Type', /json/);

      // Check the response data
      expect(response.body.studentID).toBe(newStudent.studentID);
      expect(response.body.name).toBe(newStudent.name);

      // Check the database
      const student = await Student.findOne({ studentID: newStudent.studentID });
      expect(student).toBeTruthy();
      expect(student.name).toBe(newStudent.name);
  });
});
