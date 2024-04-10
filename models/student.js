var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Student Schema
var studentSchema = new Schema({
    studentID: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    enrolledLabs: [{
        lab: { type: Schema.Types.ObjectId, ref: 'Lab' },
        dateOfAbsence: { type: Date }
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

module.exports = mongoose.model('Student', studentSchema);
