import React from "react";
import { connect } from "react-redux";
import { Table } from "reactstrap";

const mapStateToProps = (state) => {
  return {
    getUsersDetail: state.users.getUsersDetail,
    errorUsersDetail: state.users.errorUsersDetail,
  };
};

const DetailUserComponents = (props) => {
  return (
    <Table striped>
      <tbody>
        <tr>
          <td width="200">GuidId</td>
          <td width="10">:</td>
          <td>{props.getUsersDetail.guidId}</td>
        </tr>
        <tr>
          <td width="200">SecondName</td>
          <td width="10">:</td>
          <td>{props.getUsersDetail.secondName}</td>
        </tr>
        <tr>
          <td width="200">FirstName</td>
          <td width="10">:</td>
          <td>{props.getUsersDetail.firstName}</td>
        </tr>
        <tr>
          <td width="200">MiddleMame</td>
          <td width="10">:</td>
          <td>{props.getUsersDetail.middleMame}</td>
        </tr>
        <tr>
          <td width="200">Telephone</td>
          <td width="10">:</td>
          <td>{props.getUsersDetail.telephone}</td>
        </tr>
        <tr>
          <td width="200">Position</td>
          <td width="10">:</td>
          <td>{props.getUsersDetail.position}</td>
        </tr>
        <tr>
          <td width="200">TypeOfEnterprise</td>
          <td width="10">:</td>
          <td>{props.getUsersDetail.typeOfEnterprise}</td>
        </tr>
        <tr>
          <td width="200">Password</td>
          <td width="10">:</td>
          <td>{props.getUsersDetail.password}</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default connect(mapStateToProps, null)(DetailUserComponents);
