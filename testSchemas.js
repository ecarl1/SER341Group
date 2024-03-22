const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);

// Import your models
const { Student, Instructor, Lab } = require('../path/to/your/models');

// Set up Mongoose connection to a test database
mongoose.connect('mongodb://localhost/testAcademicDB', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
mongoose.connection.once('open', () => console.log('Connected to TestDB')).on('error', (error) => console.error(error));

// Before each test, empty the database
beforeEach((done) => {
    mongoose.connection.collections.students.drop(() => {
        mongoose.connection.collections.instructors.drop(() => {
            mongoose.connection.collections.labs.drop(() => {
                done();
            });
        });
    });
});

describe('Academic Models Tests', function() {
    it('should create a new student', function(done) {
        const student = new Student({ name: "John Doe" });
        student.save((err, savedStudent) => {
            expect(err).to.be.null;
            expect(savedStudent.name).to.equal("John Doe");
            done();
        });
    });

    it('should create an instructor and assign a lab', function(done) {
        const instructor = new Instructor({ name: "Prof. Smith" });
        const lab = new Lab({
            courseName: "Biology 101",
            instructor: instructor._id,
            dateAndTime: new Date(),
            labType: "General",
            location: "Lab Room 101",
            capacity: 30
        });

        instructor.labs.push(lab);
        lab.save((err) => {
            if (err) done(err);
            instructor.save((err, savedInstructor) => {
                expect(err).to.be.null;
                expect(savedInstructor.labs.length).to.equal(1);
                Lab.findById(savedInstructor.labs[0], (err, foundLab) => {
                    expect(err).to.be.null;
                    expect(foundLab.courseName).to.equal("Biology 101");
                    done();
                });
            });
        });
    });

    // Add more tests as needed...
});

after((done) => { 
    // Close the DB connection after all tests
    mongoose.connection.close(done);
});