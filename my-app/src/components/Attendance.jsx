import React, { useEffect, useState } from 'react';
import Dropdown from 'react-dropdown';
import { useForm } from "react-hook-form";
import { getStudent, getStudents, saveStudent } from '../services/StudentService';
import AttendanceTable from './attendanceTable';
const Attendance = () =>  {
     
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

        // const options = [
        //     'Present', 'Absent'
        // ]
        // const defaultOption = options[0];

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
        // <form>
        //     <div className="attendance-form">
        //         <h2>Attendance Recording</h2>
        //         <form id="record-form">
        //             <label htmlFor="studentName">Student Name:</label>
        //             <input type="text" id="studentName" required></input>

        //             <label htmlFor="attendanceStatus">Attendance Status:</label>
        //             <select id="attendanceStatus" required>
        //                 <option value="present">Present</option>
        //                 <option value="absent">Absent</option>
        //             </select>
        //             <Dropdown options={options} onChange={this._onSelect} value={defaultOption} placeholder="Select an option" />;

        //             <button className="btn btn-primary" onclick="recordAttendance()">Submit</button>
        //     </form>
        // </div>
        // </form> 
        <React.Fragment>
        <table>
            <AttendanceTable students={students} onPresent={handlePresent} onAbsent={handleAbsent}/>
        </table>
        </React.Fragment>
        );
    }

 
export default Attendance;
