var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Student Schema
var studentSchema = new Schema({
    //Id for each student
    studentID: { type: String, required: true, unique: true },
    //name is not unqiue for each student but still can be used to find the student 
    name: { type: String, required: true },

    //list of the labs the student enrolled in
    enrolledLabs: [{
        lab: { type: Schema.Types.ObjectId, ref: 'Lab' },
        dateOfAbsence: { type: Date }
    }]
}, {
    timestamps: true
});

//adding methods for student absences
studentSchema.methods.recordAbsence = function(labId, absenceDate) {
    this.enrolledLabs = this.enrolledLabs.map(enrollment => {
        if(enrollment.lab.equals(labId)) {
            enrollment.dateOfAbsence = absenceDate;
        }
        return enrollment;
    });
};

module.exports = mongoose.model('Student', studentSchema);
