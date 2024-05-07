import React, { Component } from 'react';
import { useForm } from "react-hook-form";
import DatePicker from 'react-date-picker';

const MakeUpLab = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
    const registerOptions = {
        name: { required: "Name is required" },
        labname: { required: "Lab name is required" },
        reqskill: { required: "Required skill is required" },
        
      };
    
        return ( <form>

<div class="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" class="form-control" id="name" name="name" 
            {...register("name", registerOptions.name)}></input>
        </div>
        <div class="form-group">
            <label htmlFor="labname">Lab Name:</label>
            <input type="text" class="form-control" id="labname" name="labname" 
            {...register("labname", registerOptions.labname)}></input>
        </div>
        <div class="form-group">
            <label htmlFor="req-skill">Required Skill:</label>
            <input type="text" class="form-control" id="reqskill" name="reqskill" 
            {...register("reqskill", registerOptions.reqskill)}></input>
        </div>
        </form> );
    
}
 
export default MakeUpLab;