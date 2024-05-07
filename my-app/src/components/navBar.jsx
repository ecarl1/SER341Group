import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
class NavBar extends Component {
  render() {
    const { user } = this.props;
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">
          Home
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <NavLink className="nav-item nav-link" to="/login">
              Login
            </NavLink>
            <NavLink className="nav-item nav-link" to="/attandence">
              Attendance
            </NavLink>
            <NavLink className="nav-item nav-link" to="/labs">
              Labs
            </NavLink>
            <NavLink className="nav-item nav-link" to="/makeuplab">
              Make-Up Lab
            </NavLink>
          </div>
        </div>
      </nav>
    );
  }
}