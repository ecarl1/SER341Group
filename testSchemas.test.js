require('dotenv').config(); 
const mongoose = require('mongoose');
const { Student, Instructor, Lab } = require('./models/schemas'); // Adjust path to your schemas file

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

    test('Create a new instructor', async () => {
        const instructorData = { name: 'Instructor Jane' };
        const instructor = new Instructor(instructorData);
        const savedInstructor = await instructor.save();
    
        // Jest assertions
        expect(savedInstructor._id).toBeDefined();
        expect(savedInstructor.name).toBe(instructorData.name);
    });

    test('Create a new lab', async () => {
        const instructorData = { name: 'Instructor Jane' };
        const newInstructor = new Instructor(instructorData);
        const savedInstructor = await newInstructor.save();
    
        const labData = {
            courseName: "Biology 101",
            instructor: savedInstructor._id,
            dateAndTime: new Date(),
            labType: "Practical",
            location: "Biology Lab",
            capacity: 20,
            studentsEnrolled: [] 
        };
        const lab = new Lab(labData);
        const savedLab = await lab.save();
    
        // Jest assertions
        expect(savedLab._id).toBeDefined();
        expect(savedLab.courseName).toBe(labData.courseName);
        expect(savedLab.instructor.toString()).toBe(savedInstructor._id.toString()); 
        expect(savedLab.labType).toBe(labData.labType);
        expect(savedLab.capacity).toBe(labData.capacity);
        expect(savedLab.studentsEnrolled).toEqual(expect.any(Array));
        expect(savedLab.studentsEnrolled.length).toBe(0); 
    });

});