var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Student Schema
var studentSchema = new Schema({
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
    labType: { type: String, required: true },
    location: { type: String, required: true },
    capacity: { type: Number, required: true },
    studentsEnrolled: [{ type: Schema.Types.ObjectId, ref: 'Student' }]
}, {
    timestamps: true
});

// Compiling models
var Student = mongoose.model('Student', studentSchema);
var Instructor = mongoose.model('Instructor', instructorSchema);
var Lab = mongoose.model('Lab', labSchema);

module.exports = { Student, Instructor, Lab };