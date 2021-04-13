import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import axioc from "axios";
import { Modal, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const colums = [
  { title: "GuidNewsId", field: "guidNewsId" },
  { title: "NewTitle", field: "newTitle" },
  { title: "NewDescription", field: "newDescription" },
  { title: "DataNew", field: "dataNew" },
  { title: "ImageNew", field: "imageNew" },
  { title: "IsConsidered", field: "isConsidered" },
  { title: "UsersId", field: "usersId" },
];

const baseUrl = "https://localhost:44367/news";

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

function NewsFunctions() {
  const styles = useStyles();
  const [data, setData] = useState([]);
  const [modalInserSerives, setModalInserSerives] = useState(false);
  const [modalEditSerives, setModalEditSerives] = useState(false);
  const [modalDeleteSerives, setModalDeleteSerives] = useState(false);
  const [serviesSelectInfo, setServiesSelectInfo] = useState({
    guidNewsId: "",
    newTitle: "",
    newDescription: "",
    dataNew: "",
    imageNew: "",
    isConsidered: "",
    usersId: "",
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
      .get(baseUrl + "/readallnews")
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addSerivcPost = async () => {
    console.log("addnews", serviesSelectInfo);
    let s = false;
    if (serviesSelectInfo.isConsidered === "true") {
      s = true;
    } else {
        s = false;
    }
    await axioc
      .post(baseUrl + "/addnews", {
        newTitle: serviesSelectInfo.newTitle,
        newDescription: serviesSelectInfo.newDescription,
        dataNew: serviesSelectInfo.dataNew,
        imageNew: serviesSelectInfo.imageNew,
        isConsidered: s,
        usersId: serviesSelectInfo.usersId,
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
    console.log("updatenews", serviesSelectInfo);
    let s = false;
    if (serviesSelectInfo.isConsidered === "true") {
      s = true;
    } else {
        s = false;
    }
    await axioc
      .put(baseUrl + "/updatenews", {
        guidNewsId: serviesSelectInfo.guidNewsId,
        newTitle: serviesSelectInfo.newTitle,
        newDescription: serviesSelectInfo.newDescription,
        dataNew: serviesSelectInfo.dataNew,
        imageNew: serviesSelectInfo.imageNew,
        isConsidered: s,
        usersId: serviesSelectInfo.usersId,
      })
      .then((response) => {
        var dataEvent = data;
        dataEvent.map((event) => {
          if (event.guidNewsId === serviesSelectInfo.guidNewsId) {
            event.newTitle= serviesSelectInfo.newTitle;
            event.newDescription= serviesSelectInfo.newDescription;
            event.dataNew= serviesSelectInfo.dataNew;
            event.imageNew= serviesSelectInfo.imageNew;
            event.isConsidered= serviesSelectInfo.isConsidered;
            event.usersId= serviesSelectInfo.usersId;
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
    console.log("deletenews", serviesSelectInfo);
    await axioc
      .delete(
        baseUrl + "/deletenews/" + serviesSelectInfo.guidNewsId,
        {
            guidNewsId: serviesSelectInfo.guidNewsId,
        }
      )
      .then((response) => {
        setData(
          data.filter(
            (event) =>
              event.guidNewsId !== serviesSelectInfo.guidNewsId
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
        label="NewTitle"
        name="newTitle"
        onChange={handleChange}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="NewDescription"
        name="newDescription"
        onChange={handleChange}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        //label="PlannedStartDate"
        type="datetime-local"
        name="dataNew"
        onChange={handleChange}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="ImageNew"
        name="imageNew"
        onChange={handleChange}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="IsConsidered"
        name="isConsidered"
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
        label="NewTitle"
        name="newTitle"
        onChange={handleChange}
        value={serviesSelectInfo && serviesSelectInfo.newTitle}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="NewDescription"
        name="newDescription"
        onChange={handleChange}
        value={serviesSelectInfo && serviesSelectInfo.newDescription}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        //label="PlannedStartDate"
        type="datetime-local"
        name="dataNew"
        onChange={handleChange}
        value={serviesSelectInfo && serviesSelectInfo.dataNew}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="ImageNew"
        name="imageNew"
        onChange={handleChange}
        value={serviesSelectInfo && serviesSelectInfo.imageNew}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="IsConsidered"
        name="isConsidered"
        onChange={handleChange}
        value={serviesSelectInfo && serviesSelectInfo.isConsidered}
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
        <b>{serviesSelectInfo && serviesSelectInfo.guidNewsId}</b>?{" "}
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

export default NewsFunctions;
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
