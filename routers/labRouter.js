var express = require('express');
var labRouter = express.Router();
var Lab = require('../models/lab');
var Instructor = require('../models/instructor');
var Student = require('../models/student')

//works
//GET all labs
labRouter.get('/', async (req, res) => {
    try {
      //finding lab
        const labs = await Lab.find({});
        res.json(labs);
    } catch (e) {
        console.error("Failed to retrieve labs", e);
        res.status(500).json({ message: "Failed to retrieve labs" });
    }
});

//works
//POST create a lab
labRouter.post('/', async (req, res) => {
    try {
        //creating new lab 
        const lab = await Lab.create(req.body);
        console.log("Lab created with ID:", lab._id);
        //returns with sucess
        res.status(201).json(lab);
    } catch (e) {
        console.error("Failed to create lab", e);
        res.status(500).json({ message: "Failed to create lab" });
    }
});



//works
//GET lab by id
labRouter.route('/:labID')
.get(async (req, res, next) => {
    try {
      //finding the lab with the id of the lab
      const lab = await Lab.findById(req.params.labID);
      //returning json with lab data
      res.json(lab);
    } catch (e) {
      console.log("Error retriving lab", e);
    }
})

//works
//PUT lab by id
.put(async (req, res, next) => {
    try {
      //finding the lab by id and updating
      const lab = await Lab.findByIdAndUpdate(
        //getting updated body and id of the lab
        req.params.labID,
        req.body
      );
      //returns the lab data that was updated
      res.json(lab);
      console.log("Lab updated");
    } catch (e) {
      console.log("Error updating lab", e);
    }
});

//works
//GET students in lab by lab id
labRouter.route('/:labID/students')
.get(async (req, res, next) => {
    try {
      //getting the lab by the id 
      const lab = await Lab.findById(req.params.labID);
      //returning the students that are enrolled in the lab 
      res.json(lab.studentsEnrolled);
    } catch (e) {
      console.log("Error finding students", e);
    }
});

//works
//GET student information by student id from lab by lab idi

/*
labRouter.route('/:labID/students/:studentID')
.get(async (req, res, next) => {
    try {
      const lab = await Lab.findById(req.params.labID);
      res.json(lab.studentsEnrolled.id(req.params.student));
    } catch (e) {
      console.log("Error finding student", e);
    }
});
*/

//GET student by student id from lab by lab id
labRouter.get('/:labID/students/find/:studentID', async (req, res) => {
  try {
    //finding the enrolled student in the lab their ID
      const lab = await Lab.findById(req.params.labID).populate('studentsEnrolled.student');
      //error return if the lab cannot be found
      if (!lab) {
          return res.status(404).json({ message: 'Lab not found' });
      }

      //Find the enrolled student by their ID
      const studentInfo = lab.studentsEnrolled.find(
        enrollment => enrollment.student._id.toString() === req.params.studentID
      );

      //if there is not a student found
      if (!studentInfo) {
          return res.status(404).json({ message: 'Student not found in this lab' });
      }

      res.json(studentInfo);
  } catch (e) {
      console.error("Error finding student", e);
      res.status(500).json({ message: "Internal Server Error", error: e.message });
  }
});


//works
//GET absences from lab by lab id
labRouter.route('/:labID/absences')
.get(async (req, res, next) => {
    try {
      //find the lab by ID 
      const lab = await Lab.findById(req.params.labID);
      //turns the absences connected to the object to json
      res.json(lab.absences);
    } catch (e) {
      console.log("Error finding students", e);
    }
})
//works
//may need to turn this into a POST 
//PUT absences of lab by lab id
.put(async (req, res, next) => {
      try {
        //getting the lab by ID like before
        const lab = await Lab.findById(req.params.labID);
        //saving the new absences to the lab
        lab.absences = req.body.absences || [];
        lab.save();
        res.json(lab.absences);
    } catch (e) {
      console.log("Error updating absences", e);
    }
});

//works
//GET absences of a student by student id in a lab by lab id
labRouter.route('/:labID/absences/:studentID')
.get(async (req, res, next) => {
    try {
      //finding the lab by id
      const lab = await Lab.findById(req.params.labID)
      //matching the student id to the student id on the lab absences
      lab.populate({
        path: 'absences', 
        //only populates absences related to the student ID
        match: { student: req.params.studentID } })
      //filters the absences array to find where the student is located
      const studentAbsences = lab.absences.filter(
        absence => absence.student && absence.student._id.equals(req.params.studentID)
      );
      //returns with the response
      res.json(studentAbsences);
    } catch (e) {
        console.log("Error getting absences", e);
      }
});

//not working
//GET labs taught by instructor by instructor id
labRouter.get('/instructor/:instructorID', async (req, res) => {
  try {

    //
      const instructor = await Instructor.findById(req.params.instructorID);
      if (!instructor) {
          return res.status(404).json({ message: "Instructor not found" });
      }

      await instructor.populate('labs');
      res.json(instructor.labs);
  } catch (e) {
      console.error("Error getting instructor labs:", e);
      res.status(500).json({ message: "Failed to retrieve labs for the instructor", error: e.message });
  }
});

module.exports = labRouter;