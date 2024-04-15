var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Lab Schema
var labSchema = new Schema({
    labID: { type: String, required: true, unique: true },
    courseName: { type: String, required: true },
    instructor: { type: Schema.Types.ObjectId, ref: 'Instructor', required: true },
    dateAndTime: { type: Date, required: true },
    labType: { type: String, required: true },
    location: { type: String, required: true },
    capacity: { type: Number, required: true },
    studentsEnrolled: [{
        student: { type: Schema.Types.ObjectId, ref: 'Student' },
        enrolledDate: { type: Date, default: Date.now }
    }],
    absences: [{ 
        student: { type: Schema.Types.ObjectId, ref: 'Student' },
        date: { type: Date }
    }]
}, {
    timestamps: true
});

labSchema.methods.enrollStudent = function(studentId) {
    this.studentsEnrolled.push({ student: studentId });
};

module.exports = mongoose.model('Lab', labSchema);
