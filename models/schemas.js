var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//NOTE TO GROUP
//NOTE TO GROUP
//NOTE TO GROUP
//NOTE TO GROUP

//NOTE TO GROUP
//NOTE TO GROUP
//THIS FILE IS OLD AND IS AN OUTDATED VERSION OF THE SCHEMA FILE


// Assuming that studentID and instructorID are unique identifiers like email or university ID

// Student Schema
var studentSchema = new Schema({
    studentID: { type: String, required: true, unique: true }, // unique identifier for a student
    name: { type: String, required: true },
    enrolledLabs: [{
        lab: { type: Schema.Types.ObjectId, ref: 'Lab' },
        dateOfAbsence: { type: Date }
    }]
}, {
    timestamps: true
});

// Instructor Schema
var instructorSchema = new Schema({
    instructorID: { type: String, required: true, unique: true }, // unique identifier for an instructor
    name: { type: String, required: true },
    labs: [{ type: Schema.Types.ObjectId, ref: 'Lab' }]
}, {
    timestamps: true
});

// Lab Schema
var labSchema = new Schema({
    courseName: { type: String, required: true },
    instructor: { type: Schema.Types.ObjectId, ref: 'Instructor', required: true },
    dateAndTime: { type: Date, required: true },
    labType: { type: String, required: true }, // e.g., "Workshop", "Seminar"
    location: { type: String, required: true },
    capacity: { type: Number, required: true },
    studentsEnrolled: [{
        student: { type: Schema.Types.ObjectId, ref: 'Student' },
        enrolledDate: { type: Date, default: Date.now } // when the student was enrolled in the lab
    }],
    absences: [{ 
        student: { type: Schema.Types.ObjectId, ref: 'Student' },
        date: { type: Date }
    }]
}, {
    timestamps: true
});

// Adding methods for student absences
studentSchema.methods.recordAbsence = function(labId, absenceDate) {
    this.enrolledLabs = this.enrolledLabs.map(enrollment => {
        if(enrollment.lab.equals(labId)) {
            enrollment.dateOfAbsence = absenceDate;
        }
        return enrollment;
    });
};

// Adding method to Lab for enrollment
labSchema.methods.enrollStudent = function(studentId) {
    // Additional checks can be added here for capacity, etc.
    this.studentsEnrolled.push({ student: studentId });
};

// Compiling models
var Student = mongoose.model('Student', studentSchema);
var Instructor = mongoose.model('Instructor', instructorSchema);
var Lab = mongoose.model('Lab', labSchema);

module.exports = { Student, Instructor, Lab };
