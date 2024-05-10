import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import AttendanceTable from "./attendanceTable";
import { getStudents } from "../services/StudentService";

const Attendance = () => {
  const [students, setStudents] = useState([]);
  const [present, setPresent] = useState(false);
  const [absent, setAbsent] = useState(false);
  useEffect(() => {
    async function fetchData() {
      const { data } = await getStudents(); //Would be modified to get students specific to the lab the instructor chooses.
      console.log(data);
      setStudents(data);
    }
    fetchData();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handlePresent = async () => {
    console.log("Student is present");
    setAbsent(true);
  };
  const handleAbsent = async (student) => {
    console.log("Student is absent");
    setPresent(true);
  };
  return (
    <React.Fragment>
      <table>
        <AttendanceTable
          students={students}
          onPresent={handlePresent}
          onAbsent={handleAbsent}
        />
      </table>
    </React.Fragment>
  );
};

export default Attendance;
