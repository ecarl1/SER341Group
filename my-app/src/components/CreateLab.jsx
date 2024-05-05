import React, { useState } from 'react';
import { useForm } from "react-hook-form";
const CreateLab  = () => {
    
     const [instructorName, setInstructorName] = useState('');
     const [labName, setLabName] = useState('');
     const [labDate, setLabDate] = useState('');
    
        return ( 
       <form>
        <div className="header">
            <a href="start.html">Attendance Recording</a>
            <a href="createLab.html">Create Lab</a>
        </div>
        <div className="lab-form">
    <h2>Create Lab</h2>
    <form className="create-lab-form">
        <label for="instructorName">Instructor Name:</label>
        <input type="text" id="instructorName" name="instructorName" required></input>

        <label for="labName">Lab Name:</label>
        <input type="text" id="labName" name="labName" required></input>

        <label for="labDate">Lab Date:</label>
        <input type="date" id="labDate" name="labDate" min="2023-01-01" max="2024-12-31" required></input>

        <button type="button" onclick="createLab()">Create Lab</button>
    </form>
</div>
<div id="notification-container">
    <div id="notification-content">Lab successfully created!</div>
</div>
        <div className="footer">
            <button onclick="logout()">Logout</button>
        </div>
       </form>     
         );
    }

 
export default CreateLab;
