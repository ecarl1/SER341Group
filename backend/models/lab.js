var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Lab Schema
var labSchema = new Schema({
    //lab id
    labID: { type: String, required: true, unique: true },

    //course name
    courseName: { type: String, required: true },

    //instructor
    instructor: { type: Schema.Types.ObjectId, ref: 'Instructor', required: true },

    //date in date format
    dateAndTime: { type: Date, required: true },

    //lab type, location, and capacity 
    labType: { type: String, required: true },
    location: { type: String, required: true },
    capacity: { type: Number, required: true },

    //determine the amount of studnets enroll
    studentsEnrolled: [{
        student: { type: Schema.Types.ObjectId, ref: 'Student' },
        enrolledDate: { type: Date, default: Date.now }
    }],

    //determines the amount of absences
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
