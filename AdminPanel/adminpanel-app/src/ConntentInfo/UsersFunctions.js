import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import axioc from "axios";
import { Modal, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const colums = [
  { title: "GuidUsersId", field: "guidUsersId" },
  { title: "FullName", field: "fullName" },
  { title: "Email", field: "email" },
  { title: "Telephone", field: "telephone" },
  { title: "Position", field: "position" },
  { title: "TypeOfEnterprise", field: "typeOfEnterprise" },
  { title: "Role", field: "role" },
  { title: "Password", field: "password" },
];

const baseUrl = "https://localhost:44367/users";
axioc.defaults.headers.common = {'Authorization': `Bearer ${JSON.parse(localStorage.getItem("token"))}`}

const useStyles = makeStyles((theme) => ({
  modal: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  iconos: {
    cursor: "pointer",
  },
  inputMaterial: {
    width: "100%",
  },
}));

function UsersFunctions() {
  const styles = useStyles();
  const [data, setData] = useState([]);
  const [modalInserUsers, setModalInserUsers] = useState(false);
  const [modalEditUsers, setModalEditUsers] = useState(false);
  const [modalDeleteUsers, setModalDeleteUsers] = useState(false);
  const [usersSelectInfo, setUsersSelectInfo] = useState({
    guidUsersId: "",
    fullName: "",
    email: "",
    telephone: "",
    position: "",
    typeOfEnterprise: "",
    role: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(222, name);
    setUsersSelectInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(usersSelectInfo);
  };

  const servicGet = async () => {
    var s = localStorage.getItem("token");
    await axioc
      .get(baseUrl + "/readallusers")
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addSerivcPost = async () => {
    console.log("addusers", usersSelectInfo);
    await axioc
      .post(baseUrl + "/addusers", {
        fullName: usersSelectInfo.fullName,
        email: usersSelectInfo.email,
        telephone: usersSelectInfo.telephone,
        position: usersSelectInfo.position,
        typeOfEnterprise: usersSelectInfo.typeOfEnterprise,
        role: usersSelectInfo.role,
        password: usersSelectInfo.password,
      })
      .then((response) => {
        setData(data.concat(response.data));
        openCloseModalInsert();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateSerivcePut = async () => {
    console.log("update", usersSelectInfo);
    await axioc
      .put(baseUrl + "/updateusers", {
        guidUsersId: usersSelectInfo.guidUsersId,
        fullName: usersSelectInfo.fullName,
        email: usersSelectInfo.email,
        telephone: usersSelectInfo.telephone,
        position: usersSelectInfo.position,
        typeOfEnterprise: usersSelectInfo.typeOfEnterprise,
        role: usersSelectInfo.role,
        password: usersSelectInfo.password,
      })
      .then((response) => {
        var dataEvent = data;
        dataEvent.forEach((event) => {
          if (event.guidUsersId === usersSelectInfo.guidUsersId) {
            event.fullName = usersSelectInfo.fullName;
            event.email = usersSelectInfo.email;
            event.telephone = usersSelectInfo.telephone;
            event.position = usersSelectInfo.position;
            event.typeOfEnterprise = usersSelectInfo.typeOfEnterprise;
            event.role = usersSelectInfo.role;
            event.password = usersSelectInfo.password;
          }
        });
        setData(dataEvent);
        openCloseModalEdit();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteSerivceDelete = async () => {
    console.log("deleteusers", usersSelectInfo);
    await axioc
      .delete(baseUrl + "/deleteusers/" + usersSelectInfo.guidUsersId, {
        guidUsersId: usersSelectInfo.guidUsersId,
      })
      .then((response) => {
        setData(
          data.filter(
            (event) => event.guidUsersId !== usersSelectInfo.guidUsersId
          )
        );
        openCloseModalDelete();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const selectUsers = (name, caso) => {
    console.log(111, name);
    setUsersSelectInfo(name);
    caso === "Editar" ? openCloseModalEdit() : openCloseModalDelete();
  };

  const openCloseModalInsert = () => {
    setModalInserUsers(!modalInserUsers);
  };

  const openCloseModalEdit = () => {
    setModalEditUsers(!modalEditUsers);
  };

  const openCloseModalDelete = () => {
    setModalDeleteUsers(!modalDeleteUsers);
  };

  useEffect(() => {
    servicGet();
  }, []);

  const bodyInsertar = (
    <div className={styles.modal}>
      <h3>New users</h3>
      <TextField
        className={styles.inputMaterial}
        label="FullName"
        name="fullName"
        onChange={handleChange}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Email"
        name="email"
        onChange={handleChange}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Telephone"
        name="telephone"
        onChange={handleChange}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Position"
        name="position"
        onChange={handleChange}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="TypeOfEnterprise"
        name="typeOfEnterprise"
        onChange={handleChange}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Role"
        name="role"
        onChange={handleChange}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Password"
        name="password"
        onChange={handleChange}
      />
      <br />
      <br />
      <div align="right">
        <Button color="primary" onClick={() => addSerivcPost()}>
          Insert
        </Button>
        <Button onClick={() => openCloseModalInsert()}>Cancel</Button>
      </div>
    </div>
  );

  const bodyEdit = (
    <div className={styles.modal}>
      <h3>Edit users</h3>
      <TextField
        className={styles.inputMaterial}
        label="FullName"
        name="fullName"
        onChange={handleChange}
        value={usersSelectInfo && usersSelectInfo.fullName}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Email"
        name="email"
        onChange={handleChange}
        value={usersSelectInfo && usersSelectInfo.email}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Telephone"
        name="telephone"
        onChange={handleChange}
        value={usersSelectInfo && usersSelectInfo.telephone}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Position"
        name="position"
        onChange={handleChange}
        value={usersSelectInfo && usersSelectInfo.position}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="TypeOfEnterprise"
        name="typeOfEnterprise"
        onChange={handleChange}
        value={usersSelectInfo && usersSelectInfo.typeOfEnterprise}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Role"
        name="role"
        onChange={handleChange}
        value={usersSelectInfo && usersSelectInfo.role}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Password"
        name="password"
        onChange={handleChange}
        value={usersSelectInfo && usersSelectInfo.password}
      />
      <br />
      <br />
      <div align="right">
        <Button color="primary" onClick={() => updateSerivcePut()}>
          Edit
        </Button>
        <Button onClick={() => openCloseModalEdit()}>Cancel</Button>
      </div>
    </div>
  );

  const bodyDelete = (
    <div className={styles.modal}>
      <p>
        Are you sure you want to delete the users{" "}
        <b>{usersSelectInfo && usersSelectInfo.guidUsersId}</b>?{" "}
      </p>
      <div align="right">
        <Button color="secondary" onClick={() => deleteSerivceDelete()}>
          Yes
        </Button>
        <Button onClick={() => openCloseModalDelete()}>No</Button>
      </div>
    </div>
  );

  return (
    <div>
      <br />
      <Button onClick={() => openCloseModalInsert()}>Insert Users</Button>
      <br />
      <br />
      <MaterialTable
        title="Table Users"
        columns={colums}
        data={data}
        actions={[
          {
            icon: "edit",
            tooltip: "Edit Users",
            onClick: (event, rowData) => selectUsers(rowData, "Editar"),
          },
          {
            icon: "delete",
            tooltip: "Delete Users",
            onClick: (event, rowData) => selectUsers(rowData, "Delete"),
          },
        ]}
        options={{
          actionsColumnIndex: -1,
        }}
      />

      <Modal open={modalInserUsers} onClose={openCloseModalInsert}>
        {bodyInsertar}
      </Modal>
      <Modal open={modalEditUsers} onClose={openCloseModalEdit}>
        {bodyEdit}
      </Modal>
      <Modal open={modalDeleteUsers} onClose={openCloseModalDelete}>
        {bodyDelete}
      </Modal>
    </div>
  );
}

export default UsersFunctions;
