var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var router = express.Router();

// Removed the line importing schemas.js
/**
 * Create a connection to mongoDB using mongoose
 */
var mongoose = require('mongoose');
const Student = require('./models/student'); // Correctly adjusted path to your schema file
const Instructor = require('./models/instructor');
const Lab = require('./models/lab');

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

// ... Rest of the app.js file ...





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
// Existing imports and setup...

// More route implementations...

// GET route to view all students
router.get('/students', async (req, res) => {
  try {
    const students = await Student.find({});
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST route to create a new student
router.post('/students', async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET route to fetch all absences for a lab
router.get('/labs/:labId/absences', async (req, res) => {
  try {
    const lab = await Lab.findById(req.params.labId).populate('absences.student');
    res.status(200).json(lab.absences);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT route to update absences for a lab
router.put('/labs/:labId/absences', async (req, res) => {
  try {
    const lab = await Lab.findById(req.params.labId);
    if (!lab) {
      return res.status(404).send("Lab not found");
    }
    // Assume req.body.absences is an array of absences to update
    lab.absences = req.body.absences;
    await lab.save();
    res.status(200).json(lab.absences);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET route to fetch a specific student's absences for a given lab
router.get('/labs/:labId/absences/:studentId', async (req, res) => {
  try {
    const lab = await Lab.findById(req.params.labId).populate({
      path: 'absences.student',
      match: { _id: req.params.studentId }
    });

    const studentAbsences = lab.absences.filter(absence => absence.student._id.toString() === req.params.studentId);
    res.status(200).json(studentAbsences);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET route to fetch labs taught by a specific professor
router.get('/professor/:professorId/labs', async (req, res) => {
  try {
    const labs = await Lab.find({ instructor: req.params.professorId }).populate('instructor');
    res.status(200).json(labs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ... Rest of the file ...




// Finally, use the router in your Express application
app.use('/', router);



module.exports = app;
