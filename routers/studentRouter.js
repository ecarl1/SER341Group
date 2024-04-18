var express = require('express');
var studentRouter = express.Router();
var Student = require('../models/student.js');
var Lab = require('../models/lab'); 
var Instructor = require('../models/instructor.js'); 

//GET students
studentRouter.route('/')
.get(async (req, res, next) => {
    //get all students from database
    try {
      const data = await Student.find({});
      //responds with students
      res.json(data);
    } catch (e) {
      console.log("Error", e);
    }
})

//POST student
.post(async (req, res) => {
  try {
    //creates a new student doucmentation in the database
    const student = await Student.create(req.body);
    console.log("Data saved", student);
    //success response
    res.status(201).json({ message: "Added student id:", id: student._id });
  } catch (e) {
    console.error("Failed save data", e);
    res.status(500).json({ message: "Failed save data", error: e.message });
  }
});



//GET student by studentID
studentRouter.route('/:studentID')
.get(async (req, res) => {
    try {
        //searches for student by their studentID
        const student = await Student.findOne({ studentID: req.params.studentID });
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        //returns with the student if successful
        res.json(student);
    } catch (e) {
        console.error("Error getting student", e);
        res.status(500).json({ error: 'Server error', message: e.message });
    }
});

//PUT to enroll a student in a lab
studentRouter.post('/:studentID/enroll/:labID', async (req, res) => {
  try {
      //gets the student and labID from their schemas
      const { studentID, labID } = req.params;
      //retrieves student and labID information from database
      const student = await Student.findById(studentID);
      const lab = await Lab.findById(labID);

      //if there is no student founf
      if (!student) {
          return res.status(404).json({ message: "Student not found" });
      }
      //if there is no lab found
      if (!lab) {
          return res.status(404).json({ message: "Lab not found" });
      }
      //if the lab is full
      if (lab.studentsEnrolled.length >= lab.capacity) {
          return res.status(400).json({ message: "Lab full" });
      }
      if (lab.studentsEnrolled.find(enrolled => enrolled.student.equals(student._id))) {
          return res.status(400).json({ message: "student already enrolled" });
      }

      //pushes the enrolled student
      lab.studentsEnrolled.push({ student: student._id, enrolledDate: new Date() });
      await lab.save();

      student.enrolledLabs.push({ lab: lab._id, dateOfAbsence: null });
        await student.save();

      //success
      res.json({ message: "Student enrolled", lab });
  } catch (error) {
    //if unable to enroll student
      console.error("Error enrolling student:", error);
      res.status(500).json({ message: "Error enrolling student", error: error.toString() });
  }
});


module.exports = studentRouter;
