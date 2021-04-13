import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

const Logout = () => {
  localStorage.removeItem("user");
  window.location.reload();
};
export class Navigation extends Component {
  render() {
    return (
      <Navbar
        className="navbar navbar-expand-lg navbar-light bg-light"
        expand="lg"
      >
        <Navbar.Toggle aria-controls="collapse navbar-collapse" />
        <Navbar.Collapse>
          <Nav>
            <NavLink className="nav-link" to="/events">
              Events
            </NavLink>
            <NavLink className="nav-link" to="/news">
              News
            </NavLink>
            <NavLink className="nav-link" to="/users">
              Users
            </NavLink>
            <NavLink className="nav-link" to="/servies">
              Servies
            </NavLink>
            <NavLink className="nav-link" to="/listservices">
              Listservices
            </NavLink>
            <NavLink className="nav-link" to="/consultationrequests">
              ConsultationRequests
            </NavLink>
          </Nav>
        </Navbar.Collapse>
        <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item"></li>
            <li className="nav-item">
              <button
                type="button"
                className="btn btn-light pull-left"
                onClick={Logout}
              >
                Sign out
              </button>
            </li>
          </ul>
        </div>
      </Navbar>
    );
  }
}
