import React, { Component } from 'react';
import Dropdown from 'react-dropdown';
import { useForm } from "react-hook-form";
const Attendance = () =>  {
     
        const options = [
            'Present', 'Absent'
        ]
        const defaultOption = options[0];

        const {
            register,
            handleSubmit,
            formState: { errors },
          } = useForm();
        return ( 
        <form>
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
                    <Dropdown options={options} onChange={this._onSelect} value={defaultOption} placeholder="Select an option" />;

                    <button className="btn btn-primary" onclick="recordAttendance()">Submit</button>
            </form>
        </div>
        </form> 
        );
    }

 
export default Attendance;
