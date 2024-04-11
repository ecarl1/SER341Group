var express = require('express');
var router = express.Router();
var Lab = require('../models/lab.js');
var Student = require('../models/student.js');
var Instructor = require('../models/instructor.js');

//GET labs
router.get('/', function(req, res, next) {
    Lab.find({}, function(err, labs) {
        if (err) {
            return next(err);
        }
        res.json(labs);
    });
});

//POST lab
router.post('/', function(req, res, next) {
    Lab.create(req.body, function(err, lab) {
        if (err) {
            return next(err);
        }
        res.json(lab);
    });
});


//GET lab by id
router.get('/:labId', function(req, res, next) {
    Lab.findById(req.params.labId, function(err, lab) {
        if (err) {
            return next(err);
        }
        if (!lab) {
            return res.status(404).json({ message: 'Lab not found' });
        }
        res.json(lab);
    });
});

//PUT lab by id
router.put('/:labId', function(req, res, next) {
    Lab.findByIdAndUpdate(req.params.labId, req.body, { new: true }, function(err, lab) {
        if (err) {
            return next(err);
        }
        if (!lab) {
            return res.status(404).json({ message: 'Lab not found' });
        }
        res.json(lab);
    });
});

//GET student in lab by lab id
router.get('/:labId/students', function(req, res, next) {
    Lab.findById(req.params.labId)
        .populate('studentsEnrolled.student')
        .exec(function(err, lab) {
            if (err) {
                return next(err);
            }
            if (!lab) {
                return res.status(404).json({ message: 'Lab not found' });
            }
            res.json(lab.studentsEnrolled);
        });
});

//GET student information by student id from lab by lab idi
router.get('/:labId/students/:studentId', function(req, res, next) {
    Lab.findById(req.params.labId)
        .populate({
            path: 'studentsEnrolled.student',
            match: { _id: req.params.studentId }
        })
        .exec(function(err, lab) {
            if (err) {
                return next(err);
            }
            if (!lab) {
                return res.status(404).json({ message: 'Lab not found' });
            }
            const studentEnrollment = lab.studentsEnrolled.find(enrollment =>
                enrollment.student && enrollment.student._id.equals(req.params.studentId)
            );
            if (!studentEnrollment) {
                return res.status(404).json({ message: 'Student not found in lab' });
            }
            res.json(studentEnrollment);
        });
});

//GET absences from lab by lab id
router.get('/:labId/absences', function(req, res, next) {
    Lab.findById(req.params.labId)
        .populate('absences.student')
        .exec(function(err, lab) {
            if (err) {
                return next(err);
            }
            if (!lab) {
                return res.status(404).json({ message: 'Lab not found' });
            }
            res.json(lab.absences);
        });
});

//PUT absences of lab by lab id
router.put('/:labId/absences', function(req, res, next) {
    Lab.findById(req.params.labId, function(err, lab) {
        if (err) {
            return next(err);
        }
        if (!lab) {
            return res.status(404).json({ message: 'Lab not found' });
        }

        // Update absences
        lab.absences = req.body.absences || [];

        // Save changes
        lab.save(function(err, updatedLab) {
            if (err) {
                return next(err);
            }
            res.json(updatedLab.absences);
        });
    });
});

//GET absences of a student by student id in a lab by lab id
router.get('/:labId/absences/:studentId', function(req, res, next) {
    Lab.findById(req.params.labId)
        .populate({
            path: 'absences',
            match: { student: req.params.studentId }
        })
        .exec(function(err, lab) {
            if (err) {
                return next(err);
            }
            if (!lab) {
                return res.status(404).json({ message: 'Lab not found' });
            }
            const studentAbsences = lab.absences.filter(absence =>
                absence.student && absence.student._id.equals(req.params.studentId)
            );
            res.json(studentAbsences);
        });
});

//GET labs taught by instructor by instructor id
router.get('/:instructorId', function(req, res, next) {
    Instructor.findById(req.params.instructorId)
        .populate('labs')
        .exec(function(err, instructor) {
            if (err) {
                return next(err);
            }
            if (!instructor) {
                return res.status(404).json({ message: 'Instructor not found' });
            }
            res.json(instructor.labs);
        });
});

module.exports = router;