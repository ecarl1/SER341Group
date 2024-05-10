import React, { useEffect, useState } from 'react';
import {getLabs, getLab, saveLab} from "../services/labsService";
// import Lab from './Lab';

const LabDislplay = () => {
    const [labs, setLabs] = useState([]);

    useEffect(() => {
      async function fetchData() {
        const { data: labs } = await getLabs();
        // if (!labs) return this.props.history.replace("/not-found");
        setLabs(labs);
      }
      fetchData();
    });

    const handleRegister = (id) => {
      // Find the desired lab
      const updatedLab = getLab(id)
      //I don't know why but it doesn't seem to like accessing enrolled students so I just have it lower capacity by 1
      updatedLab.capacity = updatedLab.capacity-1
      // Update the lab 
      saveLab(updatedLab)
    };

    

  return (
    <div className="lab-list">
      <h2>Available Labs</h2>
      {labs.map((lab) => (
        <div key={lab.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{lab.courseName}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{lab.instructor}</h6>
            <h6 className="card-subtitle mb-2 text-muted">{lab.location}</h6>
            <h6 className="card-subtitle mb-2 text-muted">{lab.dateAndTime}</h6>
            <h6 className="card-subtitle mb-2 text-muted">{lab.labType}</h6>
            <h6 className="card-subtitle mb-2 text-muted">Capacity: {lab.capacity}</h6>
            <button
                className="btn"
                onClick={() => handleRegister(lab.id)}
              >
                Join
              </button>
          </div>
        </div>
      </div>
      ))}
    </div>
  );
};

export default LabDislplay;