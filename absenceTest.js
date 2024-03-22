// Assuming you have Student model and are connected to MongoDB
const markAbsence = async (studentId, labId, absenceDate) => {
    try {
      const student = await Student.findById(studentId);
      if (!student) {
        console.log("Student not found!");
        return;
      }
      // Add the absence record
      student.absences.push({ lab: labId, date: absenceDate });
      await student.save();
      console.log("Absence recorded successfully.");
  
    } catch (error) {
      console.error("Error marking absence:", error);
    }
  };