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

function ConsultationRequestsFunctions() {
  const styles = useStyles();
  const [data, setData] = useState([]);
  const [
    modalInserConsultationRequests,
    setModalInserConsultationRequests,
  ] = useState(false);
  const [
    modalEditConsultationRequests,
    setModalEditConsultationRequests,
  ] = useState(false);
  const [
    modalDeleteConsultationRequests,
    setModalDeleteConsultationRequests,
  ] = useState(false);
  const [
    consultationRequestSelectInfo,
    setConsultationRequestSelectInfo,
  ] = useState({
    guidConsultationRequestsId: "",
    description: "",
    reverseCommunication: "",
    usersId: "",
    listServicesId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(222, name);
    setConsultationRequestSelectInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(consultationRequestSelectInfo);
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
    console.log("addconsultationRequests", consultationRequestSelectInfo);
    await axioc
      .post(baseUrl + "/addconsultationRequests", {
        description: consultationRequestSelectInfo.description,
        reverseCommunication:
          consultationRequestSelectInfo.reverseCommunication,
        usersId: consultationRequestSelectInfo.usersId,
        listServicesId: consultationRequestSelectInfo.listServicesId,
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
    console.log("updateconsultationRequests", consultationRequestSelectInfo);
    await axioc
      .put(baseUrl + "/updateconsultationRequests", {
        guidConsultationRequestsId:
          consultationRequestSelectInfo.guidConsultationRequestsId,
        description: consultationRequestSelectInfo.description,
        reverseCommunication:
          consultationRequestSelectInfo.reverseCommunication,
        usersId: consultationRequestSelectInfo.usersId,
        listServicesId: consultationRequestSelectInfo.listServicesId,
      })
      .then((response) => {
        var dataEvent = data;
        dataEvent.forEach((event) => {
          if (
            event.guidConsultationRequestsId ===
            consultationRequestSelectInfo.guidConsultationRequestsId
          ) {
            event.description = consultationRequestSelectInfo.description;
            event.reverseCommunication =
              consultationRequestSelectInfo.reverseCommunication;
            event.usersId = consultationRequestSelectInfo.usersId;
            event.listServicesId = consultationRequestSelectInfo.listServicesId;
          } else {
            console.log(dataEvent);
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
    console.log("deleteconsultationRequests", consultationRequestSelectInfo);
    await axioc
      .delete(
        baseUrl +
          "/deleteconsultationRequests/" +
          consultationRequestSelectInfo.guidConsultationRequestsId,
        {
          guidConsultationRequestsId:
            consultationRequestSelectInfo.guidConsultationRequestsId,
        }
      )
      .then((response) => {
        setData(
          data.filter(
            (event) =>
              event.guidConsultationRequestsId !==
              consultationRequestSelectInfo.guidConsultationRequestsId
          )
        );
        openCloseModalDelete();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const selectConsultationRequest = (name, caso) => {
    console.log(111, name);
    setConsultationRequestSelectInfo(name);
    caso === "Editar" ? openCloseModalEdit() : openCloseModalDelete();
  };

  const openCloseModalInsert = () => {
    setModalInserConsultationRequests(!modalInserConsultationRequests);
  };

  const openCloseModalEdit = () => {
    setModalEditConsultationRequests(!modalEditConsultationRequests);
  };

  const openCloseModalDelete = () => {
    setModalDeleteConsultationRequests(!modalDeleteConsultationRequests);
  };

  useEffect(() => {
    servicGet();
  }, []);

  const bodyInsertar = (
    <div className={styles.modal}>
      <h3>New consultation requests</h3>
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
          Insert
        </Button>
        <Button onClick={() => openCloseModalInsert()}>Cancel</Button>
      </div>
    </div>
  );

  const bodyEdit = (
    <div className={styles.modal}>
      <h3>Edit consultation requests</h3>
      <TextField
        className={styles.inputMaterial}
        label="Description"
        name="description"
        onChange={handleChange}
        value={
          consultationRequestSelectInfo &&
          consultationRequestSelectInfo.description
        }
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="ReverseCommunication"
        name="reverseCommunication"
        onChange={handleChange}
        value={
          consultationRequestSelectInfo &&
          consultationRequestSelectInfo.reverseCommunication
        }
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="UsersId"
        name="usersId"
        onChange={handleChange}
        value={
          consultationRequestSelectInfo && consultationRequestSelectInfo.usersId
        }
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="ListServicesId"
        name="listServicesId"
        onChange={handleChange}
        value={
          consultationRequestSelectInfo &&
          consultationRequestSelectInfo.listServicesId
        }
      />
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
        Are you sure you want to delete the consultation requests <br />
        <b>
          {consultationRequestSelectInfo &&
            consultationRequestSelectInfo.guidConsultationRequestsId}
        </b>
        ?{" "}
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
      <Button onClick={() => openCloseModalInsert()}>
        Insert Consultation Requests
      </Button>
      <br />
      <br />
      <MaterialTable
        title="Table Consultation Requests"
        columns={colums}
        data={data}
        actions={[
          {
            icon: "edit",
            tooltip: "Edit Consultation Requests",
            onClick: (event, rowData) =>
              selectConsultationRequest(rowData, "Editar"),
          },
          {
            icon: "delete",
            tooltip: "Delete Consultation Requests",
            onClick: (event, rowData) =>
              selectConsultationRequest(rowData, "Delete"),
          },
        ]}
        options={{
          actionsColumnIndex: -1,
        }}
      />

      <Modal
        open={modalInserConsultationRequests}
        onClose={openCloseModalInsert}
      >
        {bodyInsertar}
      </Modal>
      <Modal open={modalEditConsultationRequests} onClose={openCloseModalEdit}>
        {bodyEdit}
      </Modal>
      <Modal
        open={modalDeleteConsultationRequests}
        onClose={openCloseModalDelete}
      >
        {bodyDelete}
      </Modal>
    </div>
  );
}

export default ConsultationRequestsFunctions;
