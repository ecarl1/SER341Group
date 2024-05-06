var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Instructor Schema
var instructorSchema = new Schema({

    //id for each instructor
    instructorID: { type: String, required: true, unique: true },
    name: { type: String, required: true },

    //the labs that they are tied to 
    labs: [{ type: Schema.Types.ObjectId, ref: 'Lab' }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Instructor', instructorSchema);
