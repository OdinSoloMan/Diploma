import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import axioc from "axios";
import { Modal, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const colums = [
  { title: "GuidListSevicesId", field: "guidListSevicesId" },
  { title: "Description", field: "description" },
  { title: "ServicesId", field: "servicesId" },
];

const baseUrl = "https://localhost:44367/listsevices";
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

function ListServicesFunctions() {
  const styles = useStyles();
  const [data, setData] = useState([]);
  const [modalInserListServices, setModalInserListServices] = useState(false);
  const [modalEditListServices, setModalEditListServices] = useState(false);
  const [modalDeleteListServices, setModalDeleteListServices] = useState(false);
  const [listServicesSelectInfo, setListServicesSelectInfo] = useState({
    guidListSevicesId: "",
    description: "",
    servicesId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(222, name);
    setListServicesSelectInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(listServicesSelectInfo);
  };

  const servicGet = async () => {
    await axioc
      .get(baseUrl + "/readalllistsevices")
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addSerivcPost = async () => {
    console.log("addlistsevices", listServicesSelectInfo);
    await axioc
      .post(baseUrl + "/addlistsevices", {
        Description: listServicesSelectInfo.description,
        ServicesId: listServicesSelectInfo.servicesId,
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
    console.log("updatelistsevices", listServicesSelectInfo);
    await axioc
      .put(baseUrl + "/updatelistsevices", {
        guidListSevicesId: listServicesSelectInfo.guidListSevicesId,
        description: listServicesSelectInfo.description,
        servicesId: listServicesSelectInfo.servicesId,
      })
      .then((response) => {
        var dataEvent = data;
        dataEvent.forEach((event) => {
          if (
            event.guidListSevicesId === listServicesSelectInfo.guidListSevicesId
          ) {
            event.description = listServicesSelectInfo.description;
            event.servicesId = listServicesSelectInfo.servicesId;
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
    console.log("delete", listServicesSelectInfo);
    await axioc
      .delete(
        baseUrl +
          "/deletelistsevices/" +
          listServicesSelectInfo.guidListSevicesId,
        {
          guidListSevicesId: listServicesSelectInfo.guidListSevicesId,
        }
      )
      .then((response) => {
        setData(
          data.filter(
            (event) =>
              event.guidListSevicesId !==
              listServicesSelectInfo.guidListSevicesId
          )
        );
        openCloseModalDelete();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const selectListServices = (name, caso) => {
    console.log(111, name);
    setListServicesSelectInfo(name);
    caso === "Editar" ? openCloseModalEdit() : openCloseModalDelete();
  };

  const openCloseModalInsert = () => {
    setModalInserListServices(!modalInserListServices);
  };

  const openCloseModalEdit = () => {
    setModalEditListServices(!modalEditListServices);
  };

  const openCloseModalDelete = () => {
    setModalDeleteListServices(!modalDeleteListServices);
  };

  useEffect(() => {
    servicGet();
  }, []);

  const bodyInsertar = (
    <div className={styles.modal}>
      <h3>New list service</h3>
      <TextField
        className={styles.inputMaterial}
        label="Description"
        name="description"
        onChange={handleChange}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="ServicesId"
        name="servicesId"
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
      <h3>Edit list serviece</h3>
      <TextField
        className={styles.inputMaterial}
        label="Description"
        name="description"
        onChange={handleChange}
        value={listServicesSelectInfo && listServicesSelectInfo.description}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="ServicesId"
        name="servicesId"
        onChange={handleChange}
        value={listServicesSelectInfo && listServicesSelectInfo.servicesId}
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
        Are you sure you want to delete the list serviece <br />
        <b>
          {listServicesSelectInfo && listServicesSelectInfo.guidListSevicesId}
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
        Insert List Service
      </Button>
      <br />
      <br />
      <MaterialTable
        title="Table List Service"
        columns={colums}
        data={data}
        actions={[
          {
            icon: "edit",
            tooltip: "Edit List Service",
            onClick: (event, rowData) => selectListServices(rowData, "Editar"),
          },
          {
            icon: "delete",
            tooltip: "Delete List Service",
            onClick: (event, rowData) => selectListServices(rowData, "Delete"),
          },
        ]}
        options={{
          actionsColumnIndex: -1,
        }}
      />

      <Modal open={modalInserListServices} onClose={openCloseModalInsert}>
        {bodyInsertar}
      </Modal>
      <Modal open={modalEditListServices} onClose={openCloseModalEdit}>
        {bodyEdit}
      </Modal>
      <Modal open={modalDeleteListServices} onClose={openCloseModalDelete}>
        {bodyDelete}
      </Modal>
    </div>
  );
}

export default ListServicesFunctions;
