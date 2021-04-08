import React, { Component } from "react";
import { Container } from "reactstrap";
import BackComponent from "../components/BackComponent";
import { connect } from "react-redux";
import { getUsersDetail } from "../actions/userActions";
import DetailUserComponents from "../components/DetailUserComponents";

class DetailUserContainer extends Component {
  componentDidMount() {
    this.props.dispatch(getUsersDetail(this.props.match.params.guidId));
  }
  
  render() {
    return (
      <Container>
        <BackComponent />
        <h1>Detail User</h1>
        <DetailUserComponents />
      </Container>
    );
  }
}

export default connect()(DetailUserContainer);
