import React, { Component } from "react";
import TableComponents from "../components/TableComponents";
import { connect } from "react-redux";
import { deleteDataUser, getUsersList } from "../actions/userActions";

class HomeContainer extends Component {
  componentDidMount() {
    this.props.dispatch(getUsersList());
    this.props.dispatch(deleteDataUser());
  }
  render() {
    return (
      <div>
        <TableComponents />
      </div>
    );
  }
}

export default connect()(HomeContainer);
