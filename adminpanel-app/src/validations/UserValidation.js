const UserValidation = (values) => {
  const errors = {};
  // if (!values.guidId || values.guidId === "") {
  //   errors.guidId = "Required field0";
  // }

  if (!values.secondName || values.secondName === "") {
    errors.secondName = "Required field1";
  }

  if (!values.firstName || values.firstName === "") {
    errors.firstName = "Required field2";
  }

  if (!values.middleMame || values.middleMame === "") {
    errors.middleMame = "Required field3";
  }
  if (!values.telephone || values.telephone === "") {
    errors.telephone = "Required field4";
  }

  if (!values.position || values.position === "") {
    errors.position = "Required field5";
  }

  if (!values.typeOfEnterprise || values.typeOfEnterprise === "") {
    errors.typeOfEnterprise = "Required field6";
  }

  if (!values.password || values.password === "") {
    errors.password = "Required field7";
  }
  return errors;
};

export default UserValidation;
