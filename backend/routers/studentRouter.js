var express = require('express');
var studentRouter = express.Router();
var Student = require('../models/student.js');
var Lab = require('../models/lab'); 
var Instructor = require('../models/instructor.js'); 
var passport = require('passport');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Verify = require('./verify');




//Login student
//json body will have username and password
studentRouter.post('/login', async (req, res) => {
  try {
      const student = await Student.findOne({ studentID: req.body.studentID });
      if (!student) {
          return res.status(401).json({ message: 'Student not found' });
      }

      const isMatch = await bcrypt.compare(req.body.password, student.password);
      if (!isMatch) {
          return res.status(401).json({ message: 'Invalid password' });
      }

      const token = Verify.getToken({ _id: student._id });
      res.status(200).json({ message: 'Login successful', token: token });
  } catch (e) {
      console.error("Error logging in", e);
      res.status(500).json({ message: "Error logging in", error: e.message });
  }
});

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
studentRouter.post('/', async (req, res) => {
    try {
        if (!req.body.password) {
            return res.status(400).json({ message: "Password is required" });
        }

        // Hash the password before saving the student
        req.body.password = await bcrypt.hash(req.body.password, 10);
        const student = await Student.create(req.body);
        console.log("Data saved", student);
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
  } catch (e) {
    //if unable to enroll student
      console.error("Error enrolling student:", e);
  }
});


module.exports = studentRouter;
