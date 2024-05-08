import React, { Component } from "react";
import { getPerson } from "./../service/PeopleService";
class PersonDetails extends Component {
  state = {
    person: {},
  };
  componentDidMount() {
    const person = getPerson(this.props.match.params.id);
    console.log(person);
    if (!person) return this.props.history.replace("/not-found");
    this.setState({ person });
  }
  render() {
    const { person } = this.state;
    return (
      <div>
        <h3>Person details</h3>
        <div> id: {person.id} </div>
        <div> Name: {person.name} </div>
        <div> description: {person.description} </div>
      </div>
    );
  }
}

export default PersonDetails;
