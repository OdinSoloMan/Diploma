import axios from "axios";

export const GET_USERS_LIST = "GET_USERS_LIST";
export const GET_USERS_DETAIL = "GET_USERS_DETAIL";
export const POST_USERS_CREATE = "POST_USERS_CREATE";
export const PUT_USERS_EDIT = "PUT_USERS_EDIT";


export const getUsersList = () => {
  return (dispatch) => {
    axios
      .get("https://localhost:44367/users/readallusers")
      .then(function (response) {
        dispatch({
          type: GET_USERS_LIST,
          payload: {
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        dispatch({
          type: GET_USERS_LIST,
          payload: {
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const getUsersDetail = (guidId) => {
  return (dispatch) => {
    axios
      .get("https://localhost:44367/users/" + guidId)
      .then(function (response) {
        dispatch({
          type: GET_USERS_DETAIL,
          payload: {
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        dispatch({
          type: GET_USERS_DETAIL,
          payload: {
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const postUserCreate = (data) => {
  return (dispatch) => {
    axios
      .post("https://localhost:44367/users/addusers" , {
        firstName : data.firstName,
        middleMame : data.middleMame,
        password : data.password,
        position : data.position,
        secondName : data.secondName,
        typeOfEnterprise : data.typeOfEnterprise,
        telephone : parseInt(data.telephone)
      })
      .then(function (response) {
        dispatch({
          type: POST_USERS_CREATE,
          payload: {
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        dispatch({
          type: POST_USERS_CREATE,
          payload: {
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const putUserUpdate = (data, guidId) => {
  var s = guidId;
  return (dispatch) => {
    axios
      .put("https://localhost:44367/users/updateusers" , {
        guidId : s,
        firstName : data.firstName,
        middleMame : data.middleMame,
        password : data.password,
        position : data.position,
        secondName : data.secondName,
        typeOfEnterprise : data.typeOfEnterprise,
        telephone : parseInt(data.telephone)
      })
      .then(function (response) {
        dispatch({
          type: PUT_USERS_EDIT,
          payload: {
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        dispatch({
          type: PUT_USERS_EDIT,
          payload: {
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const deleteUser = (guidId) => {
  return (dispatch) => {
    axios
      .delete("https://localhost:44367/users/deleteusers/"+guidId)
      .then(function (response) {
       console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const deleteDataUser = () => {
  return (dispatch) => {
    dispatch({
      type: GET_USERS_DETAIL,
      payload: {
        data: false,
        errorMessage: false,
      },
    });


    dispatch({
      type: POST_USERS_CREATE,
      payload: {
        data: false,
        errorMessage: false,
      },
    });
  };
};
