import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import axioc from "axios";
import { Modal, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const colums = [
  { title: "GuidConsultationRequestsId", field: "guidConsultationRequestsId" },
  { title: "Description", field: "description" },
  { title: "ReverseCommunication", field: "reverseCommunication" },
  { title: "UsersId", field: "usersId" },
  { title: "ListServicesId", field: "listServicesId" },
];

const baseUrl = "https://localhost:44367/consultationRequests";

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

function ConsultationRequestsFunctions() {
  const styles = useStyles();
  const [data, setData] = useState([]);
  const [modalInserSerives, setModalInserSerives] = useState(false);
  const [modalEditSerives, setModalEditSerives] = useState(false);
  const [modalDeleteSerives, setModalDeleteSerives] = useState(false);
  const [serviesSelectInfo, setServiesSelectInfo] = useState({
    guidConsultationRequestsId: "",
    description: "",
    reverseCommunication: "",
    usersId: "",
    listServicesId: "",
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
      .get(baseUrl + "/readallconsultationRequests")
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addSerivcPost = async () => {
    console.log("addconsultationRequests", serviesSelectInfo);
    await axioc
      .post(baseUrl + "/addconsultationRequests", {
        description: serviesSelectInfo.description,
        reverseCommunication : serviesSelectInfo.reverseCommunication,
        usersId : serviesSelectInfo.usersId,
        listServicesId : serviesSelectInfo.listServicesId,
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
    console.log("updateconsultationRequests", serviesSelectInfo);
    var s = serviesSelectInfo.name,
      ser;
    await axioc
      .put(baseUrl + "/updateconsultationRequests", {
        guidConsultationRequestsId : serviesSelectInfo.guidConsultationRequestsId,
        description: serviesSelectInfo.description,
        reverseCommunication : serviesSelectInfo.reverseCommunication,
        usersId : serviesSelectInfo.usersId,
        listServicesId : serviesSelectInfo.listServicesId,
      })
      .then((response) => {
        var dataEvent = data;
        dataEvent.map((event) => {
          if (event.guidConsultationRequestsId === serviesSelectInfo.guidConsultationRequestsId) {
            event.description = serviesSelectInfo.description;
            event.reverseCommunication = serviesSelectInfo.reverseCommunication;
            event.usersId = serviesSelectInfo.usersId;
            event.listServicesId = serviesSelectInfo.listServicesId;
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
    console.log("deleteconsultationRequests", serviesSelectInfo);
    await axioc
    .delete(baseUrl + "/deleteconsultationRequests/" + serviesSelectInfo.guidConsultationRequestsId, {
        guidConsultationRequestsId: serviesSelectInfo.guidConsultationRequestsId,
      })
      .then((response) => {
        setData(
          data.filter(
            (event) => event.guidConsultationRequestsId !== serviesSelectInfo.guidConsultationRequestsId
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
        label="Description"
        name="description"
        onChange={handleChange}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="ReverseCommunication"
        name="reverseCommunication"
        onChange={handleChange}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="UsersId"
        name="usersId"
        onChange={handleChange}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="ListServicesId"
        name="listServicesId"
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
        label="Description"
        name="description"
        onChange={handleChange}
        value={serviesSelectInfo && serviesSelectInfo.description}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="ReverseCommunication"
        name="reverseCommunication"
        onChange={handleChange}
        value={serviesSelectInfo && serviesSelectInfo.reverseCommunication}
      />
     <br />
      <TextField
        className={styles.inputMaterial}
        label="UsersId"
        name="usersId"
        onChange={handleChange}
        value={serviesSelectInfo && serviesSelectInfo.usersId}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="ListServicesId"
        name="listServicesId"
        onChange={handleChange}
        value={serviesSelectInfo && serviesSelectInfo.listServicesId}
      />
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
        <b>{serviesSelectInfo && serviesSelectInfo.guidConsultationRequestsId}</b>?{" "}
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

export default ConsultationRequestsFunctions;
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
