var express = require('express');
var labRouter = express.Router();
var Lab = require('../models/lab');
var Instructor = require('../models/instructor');

//GET all labs
labRouter.get('/', async (req, res) => {
    try {
        const labs = await Lab.find({});
        res.json(labs);
    } catch (e) {
        console.error("Failed to retrieve labs", e);
        res.status(500).json({ message: "Failed to retrieve labs" });
    }
});

//POST create a lab
labRouter.post('/', async (req, res) => {
    try {
        const lab = await Lab.create(req.body);
        console.log("Lab created with ID:", lab._id);
        res.status(201).json(lab);
    } catch (e) {
        console.error("Failed to create lab", e);
        res.status(500).json({ message: "Failed to create lab" });
    }
});



//GET lab by id
labRouter.route('/:labID')
.get(async (req, res, next) => {
    try {
      const lab = await Lab.findById(req.params.labID);
      res.json(lab);
    } catch (e) {
      console.log("Error retriving lab", e);
    }
})

//PUT lab by id
.put(async (req, res, next) => {
    try {
      const lab = await Lab.findByIdAndUpdate(
        req.params.labID,
        req.body
      );
      res.json(lab);
      console.log("Lab updated");
    } catch (e) {
      console.log("Error updating lab", e);
    }
});

//GET student in lab by lab id
labRouter.route('/:labID/students')
.get(async (req, res, next) => {
    try {
      const lab = await Lab.findById(req.params.labID);
      res.json(lab.studentsEnrolled);
    } catch (e) {
      console.log("Error finding students", e);
    }
});

//GET student information by student id from lab by lab idi
labRouter.route('/:labID/students/:studentID')
.get(async (req, res, next) => {
    try {
      const lab = await Lab.findById(req.params.labID);
      res.json(lab.studentsEnrolled.id(req.params.studentID));
    } catch (e) {
      console.log("Error finding student", e);
    }
});

//GET absences from lab by lab id
labRouter.route('/:labID/absences')
.get(async (req, res, next) => {
    try {
      const lab = await Lab.findById(req.params.labID);
      res.json(lab.absences);
    } catch (e) {
      console.log("Error finding students", e);
    }
})

//PUT absences of lab by lab id
.put(async (req, res, next) => {
      try {
        const lab = await Lab.findById(req.params.labID);
        lab.absences = req.body.absences || [];
        lab.save();
        res.json(lab.absences);
    } catch (e) {
      console.log("Error updating absences", e);
    }
});

//GET absences of a student by student id in a lab by lab id
labRouter.route('/:labID/absences/:studentID')
.get(async (req, res, next) => {
    try {
      const lab = await Lab.findById(req.params.labID)
      lab.populate({path: 'absences', match: { student: req.params.studentID } })
      const studentAbsences = lab.absences.filter(absence => absence.student && 
      absence.student._id.equals(req.params.studentID));
      res.json(studentAbsences);
    } catch (e) {
        console.log("Error getting absences", e);
      }
});

//GET labs taught by instructor by instructor id
labRouter.route('/:instructorID')
.get(async (req, res, next) => {
    try {
        const instructor = Instructor.findById(req.params.instructorID)
        instructor.populate('labs')
        res.json(instructor.labs);
    } catch (e) {
        console.log("Error getting instructor", e);
      }
});

module.exports = labRouter;