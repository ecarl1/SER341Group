var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var router = express.Router();

var users = require('./models/schemas');
/**
 * Create a connection to mongoDB using mongoose
 */
var mongoose = require('mongoose');
var { Student, Instructor, Lab } = require('./models/schemas');

// UPDATE WITH PROPPER MONGO LINK LATER ON DURING DEVELOPMENT
var url = 'mongodb+srv://ericmarkcarlson:node123@cluster0.j4cyafb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Connect using mongoose
mongoose.connect(url,{ useNewUrlParser: true });
//open a connection and get a db handler
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open',function(){
  console.log('Connected to MongoDB');
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


//crub operations
// Additional Routes

// Single student by ID: GET
router.get('/student/:studentId', async (req, res) => {
  try {
    const student = await Student.findById(req.params.studentId);
    if (!student) {
      return res.status(404).send("Student not found");
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Labs: GET, POST
router.route('/labs')
  .get(async (req, res) => {
    try {
      const labs = await Lab.find({});
      res.status(200).json(labs);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
  .post(async (req, res) => {
    try {
      const newLab = new Lab(req.body);
      const savedLab = await newLab.save();
      res.status(201).json(savedLab);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

// Specific lab by ID: GET, PUT
router.route('/labs/:labId')
  .get(async (req, res) => {
    try {
      const lab = await Lab.findById(req.params.labId);
      if (!lab) {
        return res.status(404).send("Lab not found");
      }
      res.status(200).json(lab);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
  .put(async (req, res) => {
    try {
      const updatedLab = await Lab.findByIdAndUpdate(
        req.params.labId,
        req.body,
        { new: true }
      );
      if (!updatedLab) {
        return res.status(404).send("Lab not found");
      }
      res.status(200).json(updatedLab);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

// Students in a specific lab: GET
router.get('/labs/:labId/students', async (req, res) => {
  try {
    const lab = await Lab.findById(req.params.labId).populate('studentsEnrolled');
    if (!lab) {
      return res.status(404).send("Lab not found");
    }
    res.status(200).json(lab.studentsEnrolled);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Specific student in a specific lab: GET
router.get('/labs/:labId/students/:studentId', async (req, res) => {
  // This requires additional logic to check if the student is enrolled in the lab
  // For now, this will just check if the student exists
  try {
    const student = await Student.findById(req.params.studentId);
    if (!student) {
      return res.status(404).send("Student not found");
    }
    // Additional checks should be implemented here
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Absences for a given lab: GET, PUT
router.route('/labs/:labId/absences')
  .get(async (req, res) => {
    // Implement logic to retrieve absences
  })
  .put(async (req, res) => {
    // Implement logic to update absences
  });

// A student's absences for a specific lab: GET
router.get('/labs/:labId/absences/:studentId', async (req, res) => {
  // Implement logic to retrieve a student's absences for a specific lab
});

// Labs taught by a specific professor: GET
router.get('/professor/:professorId', async (req, res) => {
  try {
    const professor = await Instructor.findById(req.params.professorId).populate('labs');
    if (!professor) {
      return res.status(404).send("Professor not found");
    }
    res.status(200).json(professor.labs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Finally, use the router in your Express application
app.use('/', router);



module.exports = app;
