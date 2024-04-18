require('dotenv').config(); 
const mongoose = require('mongoose');
const Student = require('./models/student'); 
const Instructor = require('./models/instructor');
const Lab = require('./models/lab');

const connectDB = async (connectionUrl) => {
    try {
        await mongoose.connect(connectionUrl, {
            useNewUrlParser: true, 
            useUnifiedTopology: true
        });
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection failed:', error);
    }
};

const clearCollection = async (model) => {
    await model.deleteMany({});
    console.log('All data has been removed from the collection.');
};
const url = 'mongodb+srv://ericmarkcarlson:node123@cluster0.j4cyafb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
beforeAll(() => connectDB(url));

//ensures that the tests are cleared from the database
afterAll(async () => {
    await Promise.all([Student, Instructor, Lab].map(model => clearCollection(model)));
    await mongoose.disconnect();  
});

//the describe for the unit tests
describe('Unit tests', () => {
    const createDocument = async (model, data) => {
        const doc = new model(data);
        return doc.save();
    };

    //unit test for creating a student using the student schema 
    test('Create student', async () => {
        
        //creating the temp data for a student
        const studentData = {
            studentID: `id`, 
            name: 'Eric'
        };
        const savedStudent = await createDocument(Student, studentData);
    
        //testing the expectations of the student
        expect(savedStudent._id).toBeDefined();
        expect(savedStudent.studentID).toBe(studentData.studentID);
        expect(savedStudent.name).toBe(studentData.name);
    
        //deleting the data after it is created 
        await Student.deleteOne({ studentID: studentData.studentID });
    });


    //testing the instructor schema
    test('Create instructor', async () => {
        //temp data for the instructor
        const instructorData = {
            instructorID: 'id', 
            name: 'Prof. Ruby'
        };
        const savedInstructor = await createDocument(Instructor, instructorData);

        //testing the expectations of the instructor
        expect(savedInstructor._id).toBeDefined();
        expect(savedInstructor.instructorID).toBe(instructorData.instructorID);
        expect(savedInstructor.name).toBe(instructorData.name);

        //deleting the instance of the instructor after it is created
        await Instructor.deleteOne({ instructorID: instructorData.instructorID});
    });


    //test for creating a new lab using the lab schema
    test('Create a new lab', async () => {
        const instructorData = {
            instructorID: 'id', 
            name: 'Prof. Blake'
        };
        const savedInstructor = await createDocument(Instructor, instructorData);

        //creating the test data for the la
        const labData = {
            labID: '1',
            courseName: 'CSC 11',
            instructor: savedInstructor._id,
            dateAndTime: new Date(),
            labType: 'Experimental',
            location: 'CCE',
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

        //deleting the instance of the lab and instructor after it is created
        await Instructor.deleteOne({ instructorID: instructorData.instructorID});
        await Lab.deleteOne({ labID: labData.labIDID});
    });
});
