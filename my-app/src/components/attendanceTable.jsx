import React, { Component } from "react";
import { Link } from "react-router-dom";
import student from "../../../backend/models/student";

class AttendanceTable extends Component {
    constructor(props) {
        super(props);
    }
    state = {  }
    render() { 
        const {students} = this.props;
        return ( <tbody>
            {students.map((student, index) => (
                <tr key={index}>
                    <td>{student.name}</td>
                    <td>
                        <button onClick={() => {this.props.onPresent()}} className="btn btn-primary btn-sm" disabled={this.props.present}>Present</button>
                    </td>
                    <td>
                        <button onClick={() => {this.props.onAbsent()}} className="btn btn-danger btn-sm" disabled={this.props.absent}>Absent</button>
                    </td>
                </tr>
            ))}
        </tbody> );
    }
}
 
export default AttendanceTable;