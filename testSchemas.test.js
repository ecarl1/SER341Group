require('dotenv').config(); // This is still useful for other potential environment variables you might use
const mongoose = require('mongoose');
const { Student, Instructor, Lab } = require('./models/schemas'); // Adjust path to your schemas file

// Using the provided MongoDB URI directly instead of an environment variable
const url = 'mongodb+srv://ericmarkcarlson:node123@cluster0.j4cyafb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

describe('MongoDB Schema Tests', () => {
    // Connect to MongoDB using the provided credentials
    beforeAll(async () => {
        await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    });

    afterAll(async () => {
        // Clean up test data - handle with care!
        await Student.deleteMany({ name: 'Test Student' });

        // Disconnect from the database to clean up after tests
        await mongoose.connection.close();
    });

    test('Create a new student', async () => {
        const studentData = { name: 'Test Student' };
        const student = new Student(studentData);
        const savedStudent = await student.save();

        // Jest assertions
        expect(savedStudent._id).toBeDefined();
        expect(savedStudent.name).toBe(studentData.name);
    });

    // Further tests can be added as needed here
});