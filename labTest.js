const mongoose = require('mongoose');
const Lab = require('./lab'); // Assuming you have a correct path to your models

mongoose.connect('your_mongoDB_connection_string', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    try {
      const newLab = new Lab({
        instructorName: "John Doe",
        courseName: "Biology 101",
        dateAndTime: new Date(),
        typeOfLab: "Biology",
        location: "Building 5, Room 101",
        labCapacity: 20,
      });
      await newLab.save();
      console.log("Lab created successfully!");
    } catch (error) {
      console.error("Error creating the lab:", error);
    } finally {
      await mongoose.disconnect();
    }
  })
  .catch(error => console.error("Database connection error:", error));