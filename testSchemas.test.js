require('dotenv').config(); 
const mongoose = require('mongoose');
const Student = require('./models/student'); 
const Instructor = require('./models/instructor');
const Lab = require('./models/lab');

const connectDB = async (url) => mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
const clearCollection = async (model) => await model.deleteMany({});

const url = 'mongodb+srv://ericmarkcarlson:node123@cluster0.j4cyafb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
beforeAll(() => connectDB(url));

//ensures that the tests are cleared from the database
afterAll(async () => {
    await Promise.all([Student, Instructor, Lab].map(model => clearCollection(model)));
    await mongoose.disconnect();  
});

//the describe for the unit tests
describe('MongoDB Schema Tests', () => {
    const createDocument = async (model, data) => {
        const doc = new model(data);
        return doc.save();
    };

    //unit test for creating a student using the student schema 
    test('Create a new student', async () => {
        const uniqueSuffix = Date.now().toString();

        //creating the temp data for a student
        const studentData = {
            studentID: `student-test-${uniqueSuffix}`, 
            name: 'Test Student'
        };
        const savedStudent = await createDocument(Student, studentData);
    
        //testing the expectations of the student
        expect(savedStudent._id).toBeDefined();
        expect(savedStudent.studentID).toBe(studentData.studentID);
        expect(savedStudent.name).toBe(studentData.name);
    
        await Student.deleteOne({ studentID: studentData.studentID });
    });


    //testing the instructor schema
    test('Create a new instructor', async () => {
        //temp data for the instructor
        const instructorData = {
            instructorID: 'instructor-test-011', 
            name: 'Instructor Jane'
        };
        const savedInstructor = await createDocument(Instructor, instructorData);

        //testing the expectations of the instructor
        expect(savedInstructor._id).toBeDefined();
        expect(savedInstructor.instructorID).toBe(instructorData.instructorID);
        expect(savedInstructor.name).toBe(instructorData.name);
    });


    //test for creating a new lab using the lab schema
    test('Create a new lab', async () => {
        const instructorData = {
            instructorID: 'instructor-test-002', 
            name: 'Instructor John'
        };
        const savedInstructor = await createDocument(Instructor, instructorData);

        //creating the test data for the la
        const labData = {
            labID: '21321312',
            courseName: 'Biology 101',
            instructor: savedInstructor._id,
            dateAndTime: new Date(),
            labType: 'Practical',
            location: 'Biology Lab',
            capacity: 20,
            studentsEnrolled: []
        };
        const savedLab = await createDocument(Lab, labData);

        //testing the expectations of the lab
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
