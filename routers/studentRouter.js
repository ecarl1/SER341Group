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
      var id = student._id;
      res.send("Added student with id:" + id);
      console.log("Data saved");
    } catch (e) {
      console.log("Failed to save data");
    }
});


//GET student by student id
studentRouter
.route('/:studentId')
.get(async (req, res, next) => {
    try {
      const student = await Student.findById(req.params.studentId);
      res.json(student);
    } catch (e) {
      console.log("Error retriving student", e);
    }
});

module.exports = studentRouter;
