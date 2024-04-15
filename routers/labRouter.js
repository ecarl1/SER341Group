var express = require('express');
var labRouter = express.Router();
var Lab = require('../models/lab.js');
var Instructor = require('../models/instructor.js');

//GET labs
labRouter.route('/')
.get(async (req, res, next) => {
    try {
      const data = await Lab.find({});
      res.json(data);
    } catch (e) {
      console.log("Error failed to query", e);
    }
})

//POST lab
.post(async (req, res) => {
    try {
      const lab = await Lab.create(req.body);
      var id = lab._id;
      res.send("Added lab with id:" + id);
      console.log("Data saved");
    } catch (e) {
      console.log("Failed to save data");
    }
});


//GET lab by id
labRouter.route('/:labId')
.get(async (req, res, next) => {
    try {
      const lab = await Lab.findById(req.params.labId);
      res.json(lab);
    } catch (e) {
      console.log("Error retriving lab", e);
    }
})

//PUT lab by id
.put(async (req, res, next) => {
    try {
      const lab = await Lab.findByIdAndUpdate(
        req.params.labId,
        req.body
      );
      res.json(lab);
      console.log("Lab updated");
    } catch (e) {
      console.log("Error updating lab", e);
    }
});

//GET student in lab by lab id
labRouter.route('/:labId/students')
.get(async (req, res, next) => {
    try {
      const lab = await Lab.findById(req.params.labId);
      res.json(lab.studentsEnrolled);
    } catch (e) {
      console.log("Error finding students", e);
    }
});

//GET student information by student id from lab by lab idi
labRouter.route('/:labId/students/:studentId')
.get(async (req, res, next) => {
    try {
      const lab = await Lab.findById(req.params.labId);
      res.json(recipe.studentsEnrolled.id(req.params.studentId));
    } catch (e) {
      console.log("Error finding student", e);
    }
});

//GET absences from lab by lab id
labRouter.route('/:labId/absences')
.get(async (req, res, next) => {
    try {
      const lab = await Lab.findById(req.params.labId);
      res.json(lab.absences);
    } catch (e) {
      console.log("Error finding students", e);
    }
})

//PUT absences of lab by lab id
.put(async (req, res, next) => {
      try {
        const lab = await Lab.findById(req.params.labId);
        lab.absences = req.body.absences || [];
        lab.save();
        res.json(lab.absences);
    } catch (e) {
      console.log("Error updating absences", e);
    }
});

//GET absences of a student by student id in a lab by lab id
labRouter.route('/:labId/absences/:studentId')
.get(async (req, res, next) => {
    try {
      const lab = await Lab.findById(req.params.labId)
      lab.populate({path: 'absences', match: { student: req.params.studentId } })
      const studentAbsences = lab.absences.filter(absence => absence.student && 
      absence.student._id.equals(req.params.studentId));
      res.json(studentAbsences);
    } catch (e) {
        console.log("Error getting absences", e);
      }
});

//GET labs taught by instructor by instructor id
labRouter.route('/:instructorId')
.get(async (req, res, next) => {
    try {
        const instructor = Instructor.findById(req.params.instructorId)
        instructor.populate('labs')
        res.json(instructor.labs);
    } catch (e) {
        console.log("Error getting instructor", e);
      }
});

module.exports = labRouter;