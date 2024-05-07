import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import DatePicker from 'react-date-picker';
const CreateLab  = () => {
    
     const [instructorName, setInstructorName] = useState('');
     const [labName, setLabName] = useState('');
     const [labDate, setLabDate] = useState('');

     const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

     const registerOptions = {
        instructorName: { required: "Name is required" },
        labName: { required: "Email is required" },
        labDate: {
          required: "Date is required",
          min: "2023-01-01",
          max: "2024-12-31"
        },
      };
    
        return ( 
       <form>
        
        <div className="lab-form">
    <h2>Create Lab</h2>
    <form className="create-lab-form">
        <label htmlFor="instructorName">Instructor Name:</label>
        <input type="text" 
        id="instructorName" 
        name="instructorName" required
        {...register("instructorName", registerOptions.instructorName)}></input>

        <label htmlFor="labName">Lab Name:</label>
        <input type="text" id="labName" name="labName" required 
        {...register("labName", registerOptions.labName)}></input>

        <label htmlFor="labDate">Lab Date:</label>
        <input type="date" id="labDate" name="labDate" min="2023-01-01" max="2024-12-31" required
        {...register("labDate", registerOptions.labDate)}></input>

        <button className="btn btn-primary" onclick="createLab()">Create Lab</button>
    </form>
</div>
       </form>     
         );
    }

 
export default CreateLab;
