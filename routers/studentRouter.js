var express = require('express');
var studentRouter = express.Router();
var Student = require('../models/student.js');

//GET students
studentRouter.route('/')
.get(function(req, res, next) {
    Student.find({}, function(err, students) {
        if (err) {
            return next(err);
        }
        res.json(students);
    });
})

//POST student
.post(function(req, res, next) {
    Student.create(req.body, function(err, student) {
        if (err) {
            return next(err);
        }
        res.json(student);
    });
});


//GET student by student id
studentRouter
.route('/:studentId')
.get(function(req, res, next) {
    Student.findById(req.params.studentId, function(err, student) {
        if (err) {
            return next(err);
        }
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json(student);
    });
});

module.exports = studentRouter;
