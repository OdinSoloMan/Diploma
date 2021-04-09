import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import axioc from "axios";
import { Modal, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const colums = [
  { title: "GuidServicesId", field: "guidServicesId" },
  { title: "Name", field: "name" },
];

const baseUrl = "https://localhost:44367/services";

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

function SeviesFunctions() {
  const styles = useStyles();
  const [data, setData] = useState([]);
  const [modalInserSerives, setModalInserSerives] = useState(false);
  const [modalEditSerives, setModalEditSerives] = useState(false);
  const [modalDeleteSerives, setModalDeleteSerives] = useState(false);
  const [serviesSelectInfo, setServiesSelectInfo] = useState({
    guidServicesId: "",
    name: "",
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
      .get(baseUrl + "/readallservices")
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addSerivcPost = async () => {
    console.log("addSerivcPost", serviesSelectInfo.name);
    var s = serviesSelectInfo.name;
    await axioc
      .post(baseUrl + "/addservices", {
        name: s,
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
    console.log("update", serviesSelectInfo.name);
    var s = serviesSelectInfo.name,
      ser;
    await axioc
      .put(baseUrl + "/updateservices", {
        guidServicesId: serviesSelectInfo.guidServicesId,
        name: serviesSelectInfo.name,
      })
      .then((response) => {
        var dataEvent = data;
        dataEvent.map((event) => {
          if (event.guidServicesId === serviesSelectInfo.guidServicesId) {
            event.name = serviesSelectInfo.name;
            event.listServices = serviesSelectInfo.listServices;
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
    let s = {
      guidServicesId: serviesSelectInfo.guidServicesId,
      name: serviesSelectInfo.name,
    };
    console.log("delete", s);
    await axioc
      .delete(baseUrl + "/deleteservices/" + serviesSelectInfo.guidServicesId, {
        guidServicesId: serviesSelectInfo.guidServicesId,
      })
      .then((response) => {
        setData(
          data.filter(
            (event) => event.guidServicesId !== serviesSelectInfo.guidServicesId
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
        label="Name"
        name="name"
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
        label="Name"
        name="name"
        onChange={handleChange}
        value={serviesSelectInfo && serviesSelectInfo.name}
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
        <b>{serviesSelectInfo && serviesSelectInfo.name}</b>?{" "}
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

export default SeviesFunctions;
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
