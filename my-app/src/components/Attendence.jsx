import React, { Component } from 'react';
import Dropdown from 'react-dropdown';
import { useForm } from "react-hook-form";
const Attendence = () =>  {
     
        const options = [
            'Present', 'Absent'
        ]
        return ( <form>

<div className="attendance-form">
    <h2>Attendance Recording</h2>
    <form id="record-form">
        <label htmlFor="studentName">Student Name:</label>
        <input type="text" id="studentName" required></input>

        <label htmlFor="attendanceStatus">Attendance Status:</label>
        <select id="attendanceStatus" required>
            <option value="present">Present</option>
            <option value="absent">Absent</option>
        </select>

        <button type="button" onclick="recordAttendance()">Submit</button>
    </form>
</div>

        </form> );
    }

 
export default Attendence;
