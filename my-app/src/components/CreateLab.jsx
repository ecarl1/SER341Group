import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { saveLab } from '../services/labsService';
import{ getInstructor } from '../services/InstructorService';
import DatePicker from 'react-date-picker';
import axios from 'axios';
import * as config from "../config.json";
const CreateLab  = () => {
  const { apiUrl } = config;

  const apiEndpoint = apiUrl + "labs";
    
     const [labID, setLabID] = useState('');
     const [instructorName, setInstructorName] = useState('');
     const [courseName, setCourseName] = useState('');
     const [labDate, setLabDate] = useState('');
     const [labType, setLabType] = useState('');
     const [location, setLocation] = useState('');
     const [capacity, setCapacity] = useState('');

     const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

      const handleAdd = async () => { //Would use info ffrom form inputs
        const NewLab = { labID: "1",
                      courseName: "BIO200",
                      instructorName: "Jon", //Would get from instructor ID.
                      labDate: "2024-01-03:12:02.253Z",
                      labType: "Make up",
                      location: "TH120",
                      capacity: 3
        };
        const { data: lab } = await saveLab(NewLab);

      }

     const registerOptions = {
        labID: { required: "ID is required" },
        instructorName: { required: "Name is required" },
        courseName: { required: "Course is required" },

        labDate: {
          required: "Date is required",
          min: "2023-01-01",
          max: "2024-12-31"
        },
        labType: { required: "Type is required" },
        location: { required: "Location is required" },
        capacity: { required: "Capacity is required" },
      };
    
        return ( 
          <div>
       <form onSubmit={useForm().handleSubmit}>
        
        
    <h2>Create Lab</h2>
    <div>
        <label htmlFor="labID">Lab ID:</label>
        <input type="text" 
        id="labID" 
        name="labID"
        {...register("labID", registerOptions.labID)}/>
        <small className="text-danger">
          {errors?.labID && errors.labID.message}
        </small>
        </div>

        <div>
        <label htmlFor="courseName">Course Name:</label>
        <input type="text" id="courseName" name="courseName" 
        {...register("courseName", registerOptions.labName)}/>
        <small className="text-danger">
          {errors?.courseName && errors.courseName.message}
        </small>
        </div>

        <div>
        <label htmlFor="instructorName">Instructor Name:</label>
        <input type="text" id="instructorName" name="instructorName" 
        {...register("instructorName", registerOptions.instructorName)}/>
        <small className="text-danger">
          {errors?.instructorName && errors.instructorName.message}
        </small>
        </div>

<div>
        <label htmlFor="labDate">Lab Date:</label>
        <input type="date" id="labDate" name="labDate"
        {...register("labDate", registerOptions.labDate)}/>
        <small className="text-danger">
          {errors?.labDate && errors.labDate.message}
        </small>
</div>
        
<div>
        <label htmlFor="labType">Lab Type:</label>
        <input type="text" id="labName" name="labType" 
        {...register("labType", registerOptions.labType)}/>
        <small className="text-danger">
          {errors?.labType && errors.labType.message}
        </small>
        </div>

        <div>
        <label htmlFor="location">Location:</label>
        <input type="text" id="labName" name="location" 
        {...register("location", registerOptions.location)}/>
        <small className="text-danger">
          {errors?.location && errors.location.message}
        </small>
        </div>

        <div>
        <label htmlFor="capacity">Capacity:</label>
        <input type="number" id="capacity" name="capacity" 
        {...register("capacity", registerOptions.capacity)}/>
        <small className="text-danger">
          {errors?.capacity && errors.capacity.message}
        </small>
        </div>
        <button className="btn btn-primary" onClick={handleSubmit}>Create Lab</button>
       </form>
       </div>
       
         );
    }

 
export default CreateLab;
