import React, { Component } from "react";
import TableBody from "./components/tableBody";
import TableHead from "./components/tableHead";
import { getPeople } from "./service/PeopleService";
class Table extends Component {
  constructor(props) {
    super(props);

    this.handleSearch = this.handleSearch.bind(this);
  }
  state = {
    people: [], //getPeople(),
    query: "",
  };
  componentDidMount() {
    this.setState({ people: getPeople() });
  }
  handleSearch = (event) => {
    this.setState({ query: event.target.value });
  };
  handleLike = (person) => {
    const people = [...this.state.people];
    const index = people.indexOf(person);
    people[index].liked = !people[index].liked;
    this.setState({ people });
  };
  handleClick() {
    const toggle = !this.state.toggle;
    this.setState({ toggle }); //this.state.toggle =toggle is incorrect
  }
  handleDelete = (person) => {
    const people = [...this.state.people];
    const newPeople = people.filter((p) => p.id !== person.id);
    this.setState({ people: newPeople });
  };
  filterPeopleByName = () => {
    let people = [...this.state.people];
    if (this.state.query) {
      const filtered = people.filter((p) =>
        p.name.toLowerCase().startsWith(this.state.query.toLowerCase())
      );
      people = filtered;
    }
    return people;
  };
  render() {
    const people = this.filterPeopleByName();
    return (
      <React.Fragment>
        <input
          type="text"
          className="form-control"
          name="search"
          placeholder="Search by Name"
          value={this.state.query}
          onChange={this.handleSearch}
        />
        <table className="table">
          <TableHead />
          <TableBody
            people={people}
            onDelete={this.handleDelete}
            onLike={this.handleLike}
          />
        </table>
      </React.Fragment>
    );
  }
}

export default Table;
