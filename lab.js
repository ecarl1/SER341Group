const mongoose = require('mongoose');

const LabSchema = new mongoose.Schema({
  instructorName: String,
  courseName: String,
  dateAndTime: Date,
  typeOfLab: String,
  location: String,
  labCapacity: Number,
  enrolledStudents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
  }],
});

module.exports = mongoose.model('Lab', LabSchema);  