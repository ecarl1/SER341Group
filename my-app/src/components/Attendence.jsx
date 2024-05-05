import React, { Component } from 'react';
import Dropdown from 'react-dropdown';
import { useForm } from "react-hook-form";
const Attendence = () =>  {
     
        const options = [
            'Present', 'Absent'
        ]
        return ( <form>
            <div id="header">
    <a href="start.html">Attendance Recording</a>
    <a href="createLab.html">Create Lab</a>
</div>

<div id="attendance-form">
    <h2>Attendance Recording</h2>
    <form id="record-form">
        <label for="studentName">Student Name:</label>
        <input type="text" id="studentName" required></input>

        <label for="attendanceStatus">Attendance Status:</label>
        <select id="attendanceStatus" required>
            <option value="present">Present</option>
            <option value="absent">Absent</option>
        </select>

        <button type="button" onclick="recordAttendance()">Submit</button>
    </form>
</div>

<div id="footer">
    <button onclick="logout()">Logout</button>
</div>
        </form> );
    }

 
export default Attendence;
