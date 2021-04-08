import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { Container, Button, Row, Col, Spinner } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfo,
  faEdit,
  faTrash,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import swal from 'sweetalert';
import { deleteUser } from "../actions/userActions";

const { SearchBar } = Search;

const handleClick = (dispatch, guidId) => {
  
  swal({
    title: "Are you sure you want to delete this data ?",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      dispatch(deleteUser(guidId))
      swal("User data deleted successfully", {
        icon: "success",
      });
    } else {
      swal("Data failed to delete");
    }
  });
}

const defaultSorted = [
  {
    dataField: "guidId",
    order: "asc",
  },
];

const mapStateToProps = (state) => {
  return {
    getUsersList: state.users.getUsersList,
    errorUsersList: state.users.errorUsersList,
  };
};

const TableComponents = (props) => {
  const columns = [
    {
      dataField: "guidId",
      text: "guidId",
      sort: true,
    },
    {
      dataField: "secondName",
      text: "secondName",
      sort: true,
    },
    {
      dataField: "firstName",
      text: "firstName",
      sort: true,
    },
    // {
    //   dataField: "middleMame",
    //   text: "middleMame",
    //   sort: true,
    // },
    
    {
      dataField: "telephone",
      text: "telephone",
      sort: true,
    },
    
    // {
    //   dataField: "position",
    //   text: "position",
    //   sort: true,
    // },
    
    // {
    //   dataField: "typeOfEnterprise",
    //   text: "typeOfEnterprise",
    //   sort: true,
    // },
    // {
    //   dataField: "password",
    //   text: "password",
    //   sort: true,
    // },
    {
      dataField: "link",
      test: "Action",
      formatter: (rowContent, row) => {
        return (
          <div>
          <Link to={"detail/" + row.guidId}>
            <Button color="dark" className="mr-2">
              <FontAwesomeIcon icon={faInfo} /> Detail
            </Button>
          </Link>
  
          <Link to={"edit/" + row.guidId}>
            <Button color="dark" className="mr-2">
              <FontAwesomeIcon icon={faEdit} /> Edit
            </Button>
          </Link>
  
          <Button color="dark" className="mr-2" onClick={() => handleClick(props.dispatch, row.guidId)}>
            <FontAwesomeIcon icon={faTrash} /> Delete
          </Button>
        </div>
        );
      },
    },
  ];
  return (
    <Container>
      {props.getUsersList ? (
        <ToolkitProvider
          bootstrap4
          keyField="guidId"
          data={props.getUsersList}
          columns={columns}
          defaultSorted={defaultSorted}
          search
        >
          {(props) => (
            <div>
              <Row>
                <Col>
                  <Link to="/create">
                    <Button color="dark" className="mr-2">
                      <FontAwesomeIcon icon={faUserPlus} /> Create User
                    </Button>
                  </Link>
                </Col>
                <Col>
                  <div className="float-right">
                    <SearchBar
                      {...props.searchProps}
                      placeholder="Search ..."
                    />
                  </div>
                </Col>
              </Row>

              <BootstrapTable
                {...props.baseProps}
                pagination={paginationFactory()}
              />
            </div>
          )}
        </ToolkitProvider>
      ) : (
        <div className="text-center">
          {props.errorUsersList ? (
            <h4>{props.errorUsersList}</h4>
          ) : (
            <Spinner color="dark" />
          )}
        </div>
      )}
    </Container>
  );
};

export default connect(mapStateToProps, null)(TableComponents);
