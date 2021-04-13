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
  const [modalInserSerives, setModalInserSerives] = useState(false);
  const [modalEditSerives, setModalEditSerives] = useState(false);
  const [modalDeleteSerives, setModalDeleteSerives] = useState(false);
  const [serviesSelectInfo, setServiesSelectInfo] = useState({
    guidUsersId: "",
    fullName: "",
    email: "",
    telephone: "",
    position: "",
    typeOfEnterprise: "",
    role: "",
    password: "",
    //listServices: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(222, name);
    setServiesSelectInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(serviesSelectInfo);
  };

  const servicGet = async () => {
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
    console.log("addusers", serviesSelectInfo);
    await axioc
      .post(baseUrl + "/addusers", {
        fullName: serviesSelectInfo.fullName,
        email: serviesSelectInfo.email,
        telephone: serviesSelectInfo.telephone,
        position: serviesSelectInfo.position,
        typeOfEnterprise: serviesSelectInfo.typeOfEnterprise,
        role: serviesSelectInfo.role,
        password: serviesSelectInfo.password
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
    console.log("update", serviesSelectInfo);
    var s = serviesSelectInfo.name,
      ser;
    await axioc
      .put(baseUrl + "/updateusers", {
        guidUsersId : serviesSelectInfo.guidUsersId,
        fullName: serviesSelectInfo.fullName,
        email: serviesSelectInfo.email,
        telephone: serviesSelectInfo.telephone,
        position: serviesSelectInfo.position,
        typeOfEnterprise: serviesSelectInfo.typeOfEnterprise,
        role: serviesSelectInfo.role,
        password: serviesSelectInfo.password
      })
      .then((response) => {
        var dataEvent = data;
        dataEvent.map((event) => {
          if (event.guidUsersId === serviesSelectInfo.guidUsersId) {
            event.fullName = serviesSelectInfo.fullName;
            event.email = serviesSelectInfo.email;
            event.telephone = serviesSelectInfo.telephone;
            event.position = serviesSelectInfo.position;
            event.typeOfEnterprise = serviesSelectInfo.typeOfEnterprise;
            event.role = serviesSelectInfo.role;
            event.password = serviesSelectInfo.password;
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
    console.log("deleteusers", serviesSelectInfo);
    await axioc
      .delete(baseUrl + "/deleteusers/" + serviesSelectInfo.guidUsersId, {
        guidUsersId: serviesSelectInfo.guidUsersId,
      })
      .then((response) => {
        setData(
          data.filter(
            (event) => event.guidUsersId !== serviesSelectInfo.guidUsersId
          )
        );
        openCloseModalDelete();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const selectServies = (name, caso) => {
    console.log(111, name);
    setServiesSelectInfo(name);
    caso === "Editar" ? openCloseModalEdit() : openCloseModalDelete();
  };

  const openCloseModalInsert = () => {
    setModalInserSerives(!modalInserSerives);
  };

  const openCloseModalEdit = () => {
    setModalEditSerives(!modalEditSerives);
  };

  const openCloseModalDelete = () => {
    setModalDeleteSerives(!modalDeleteSerives);
  };

  useEffect(() => {
    servicGet();
  }, []);

  const bodyInsertar = (
    <div className={styles.modal}>
      <h3>New servies</h3>
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
          Insertar
        </Button>
        <Button onClick={() => openCloseModalInsert()}>Cancelar</Button>
      </div>
    </div>
  );

  const bodyEdit = (
    <div className={styles.modal}>
      <h3>Edit servies</h3>
      <TextField
        className={styles.inputMaterial}
        label="FullName"
        name="fullName"
        onChange={handleChange}
        value={serviesSelectInfo && serviesSelectInfo.fullName}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Email"
        name="email"
        onChange={handleChange}
        value={serviesSelectInfo && serviesSelectInfo.email}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Telephone"
        name="telephone"
        onChange={handleChange}
        value={serviesSelectInfo && serviesSelectInfo.telephone}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Position"
        name="position"
        onChange={handleChange}
        value={serviesSelectInfo && serviesSelectInfo.position}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="TypeOfEnterprise"
        name="typeOfEnterprise"
        onChange={handleChange}
        value={serviesSelectInfo && serviesSelectInfo.typeOfEnterprise}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Role"
        name="role"
        onChange={handleChange}
        value={serviesSelectInfo && serviesSelectInfo.role}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Password"
        name="password"
        onChange={handleChange}
        value={serviesSelectInfo && serviesSelectInfo.password}
      />
      <br />
      <br />
      <div align="right">
        <Button color="primary" onClick={() => updateSerivcePut()}>
          Editar
        </Button>
        <Button onClick={() => openCloseModalEdit()}>Cancelar</Button>
      </div>
    </div>
  );

  const bodyDelete = (
    <div className={styles.modal}>
      <p>
        Are you sure you want to delete the service{" "}
        <b>{serviesSelectInfo && serviesSelectInfo.guidUsersId}</b>?{" "}
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
      <Button onClick={() => openCloseModalInsert()}>Insert Servies</Button>
      <br />
      <br />
      <MaterialTable
        title="Simple action preview list table"
        columns={colums}
        data={data}
        actions={[
          {
            icon: "edit",
            tooltip: "Edit services",
            onClick: (event, rowData) => selectServies(rowData, "Editar"),
          },
          {
            icon: "delete",
            tooltip: "Delete services",
            onClick: (event, rowData) => selectServies(rowData, "Delete"),
          },
        ]}
        options={{
          actionsColumnIndex: -1,
        }}
      />

      <Modal open={modalInserSerives} onClose={openCloseModalInsert}>
        {bodyInsertar}
      </Modal>
      <Modal open={modalEditSerives} onClose={openCloseModalEdit}>
        {bodyEdit}
      </Modal>
      <Modal open={modalDeleteSerives} onClose={openCloseModalDelete}>
        {bodyDelete}
      </Modal>
    </div>
  );
}

export default UsersFunctions;
/*
function SimpleAction() {
  return (
    <MaterialTable
      title="Simple Action Preview"
      columns={[
        { title: 'Name', field: 'name' },
        { title: 'Surname', field: 'surname' },
        { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
        {
          title: 'Birth Place',
          field: 'birthCity',
          lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
        },
      ]}
      data={[
        { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
        { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017, birthCity: 34 },
      ]}        
      actions={[
        {
          icon: 'save',
          tooltip: 'Save User',
          onClick: (event, rowData) => alert("You saved " + rowData.name)
        }
      ]}
    />
  )
}
*/
