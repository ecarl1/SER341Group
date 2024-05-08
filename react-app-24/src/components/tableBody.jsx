import React, { Component } from "react";
import Like from "./like";
import { Link } from "react-router-dom";
class TableBody extends Component {
  render() {
    const { people } = this.props; //this.props.people
    return (
      <tbody>
        {people.map((person, index) => (
          <tr key={index}>
            <td>
              {" "}
              <Link to={`/people/${person.id}`}>{person.name} </Link>
            </td>
            <td>{person.job}</td>
            <td>
              <button
                onClick={() => {
                  this.props.onDelete(person);
                }}
                className="btn btn-danger btn-sm"
              >
                Delete
              </button>
            </td>
            <td>
              {" "}
              <Like
                liked={person.liked}
                onClick={() => {
                  this.props.onLike(person);
                }}
              ></Like>
            </td>
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
