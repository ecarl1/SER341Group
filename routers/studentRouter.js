var express = require('express');
var studentRouter = express.Router();
var Student = require('../models/student.js');

//GET students
studentRouter.route('/')
.get(async (req, res, next) => {
    try {
      const data = await Student.find({});
      res.json(data);
    } catch (e) {
      console.log("Error failed to query", e);
    }
})

//POST student
.post(async (req, res) => {
  try {
    const student = await Student.create(req.body);
    console.log("Data saved", student);
    res.status(201).json({ message: "Added student with id:", id: student._id });
  } catch (e) {
    console.error("Failed to save data", e);
    res.status(500).json({ message: "Failed to save data", error: e.message });
  }
});



//GET student by studentID
studentRouter.route('/:studentID')
.get(async (req, res) => {
    try {
        const student = await Student.findOne({ studentID: req.params.studentID });
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json(student);
    } catch (e) {
        console.error("Error retrieving student", e);
        res.status(500).json({ error: 'Server error', message: e.message });
    }
});

module.exports = studentRouter;
