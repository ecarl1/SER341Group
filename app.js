var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//MongoDB connection setup
var url = 'mongodb+srv://ericmarkcarlson:node123@cluster0.j4cyafb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;

//error handling for mongodb
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var app = express();

//Middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routers
var labRouter = require('./routers/labRouter.js');
app.use('/labs', labRouter);

var studentRouter = require('./routers/studentRouter.js'); 
app.use('/students', studentRouter);



// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404).json({ message: "Not Found" });
});

// Error handler for functions with 500 error
app.use(function(err, req, res, next) {
  res.status(err.status || 500).json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {}
  });
});

module.exports = app;
