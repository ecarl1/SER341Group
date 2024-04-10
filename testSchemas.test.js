require('dotenv').config(); 
const mongoose = require('mongoose');
const { Student, Instructor, Lab } = require('./models/schemas'); // Adjust path to your schemas file

const url = 'mongodb+srv://ericmarkcarlson:node123@cluster0.j4cyafb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
beforeAll(async () => {
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
    // Clean up test data
    await Student.deleteMany({});
    await Instructor.deleteMany({});
    await Lab.deleteMany({});
    await mongoose.connection.close();
});

describe('MongoDB Schema Tests', () => {
    test('Create a new student', async () => {
        const uniqueSuffix = Date.now().toString();
        const studentData = {
            studentID: `student-test-${uniqueSuffix}`, // Unique identifier for each test
            name: 'Test Student'
        };
        const student = new Student(studentData);
        const savedStudent = await student.save();
    
        expect(savedStudent._id).toBeDefined();
        expect(savedStudent.studentID).toBe(studentData.studentID);
        expect(savedStudent.name).toBe(studentData.name);
    
        // Clean up after test
        await Student.deleteOne({ studentID: studentData.studentID });
    });

    test('Create a new instructor', async () => {
        const instructorData = {
            instructorID: 'instructor-test-001', // Unique identifier
            name: 'Instructor Jane'
        };
        const instructor = new Instructor(instructorData);
        const savedInstructor = await instructor.save();

        expect(savedInstructor._id).toBeDefined();
        expect(savedInstructor.instructorID).toBe(instructorData.instructorID);
        expect(savedInstructor.name).toBe(instructorData.name);
    });

    test('Create a new lab', async () => {
        // Ensure an instructor exists to reference in the lab
        const instructorData = {
            instructorID: 'instructor-test-002', // Unique identifier
            name: 'Instructor John'
        };
        const instructor = new Instructor(instructorData);
        const savedInstructor = await instructor.save();

        const labData = {
            courseName: 'Biology 101',
            instructor: savedInstructor._id,
            dateAndTime: new Date(),
            labType: 'Practical',
            location: 'Biology Lab',
            capacity: 20,
            studentsEnrolled: []
        };
        const lab = new Lab(labData);
        const savedLab = await lab.save();

        expect(savedLab._id).toBeDefined();
        expect(savedLab.courseName).toBe(labData.courseName);
        expect(savedLab.instructor.toString()).toBe(savedInstructor._id.toString());
        expect(savedLab.labType).toBe(labData.labType);
        expect(savedLab.location).toBe(labData.location);
        expect(savedLab.capacity).toBe(labData.capacity);
        expect(savedLab.studentsEnrolled).toEqual(expect.any(Array));
        expect(savedLab.studentsEnrolled.length).toBe(0);
    });
});