import React, { Component } from 'react';
import { useForm } from "react-hook-form";
import DatePicker from 'react-date-picker';

const MakeUpLab = () => {
    const makeUpOptions = {
        name: { required: "Name is required" },
        labname: { required: "Lab name is required" },
        reqskill: { required: "Required skill is required" },
        
      };
    
        return ( <form>

<div class="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" class="form-control" id="name" name="name" required></input>
        </div>
        <div class="form-group">
            <label htmlFor="labname">Lab Name:</label>
            <input type="text" class="form-control" id="labname" name="labname" required></input>
        </div>
        <div class="form-group">
            <label htmlFor="req-skill">Required Skill:</label>
            <input type="text" class="form-control" id="reqskill" name="reqskill" required></input>
        </div>
        </form> );
    
}
 
export default MakeUpLab;