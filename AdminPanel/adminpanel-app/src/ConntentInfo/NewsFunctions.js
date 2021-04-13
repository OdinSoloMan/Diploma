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
  const [modalInserNews, setModalInserNews] = useState(false);
  const [modalEditNews, setModalEditNews] = useState(false);
  const [modalDeleteNews, setModalDeleteNews] = useState(false);
  const [newsSelectInfo, setNewsSelectInfo] = useState({
    guidNewsId: "",
    newTitle: "",
    newDescription: "",
    dataNew: "",
    imageNew: "",
    isConsidered: "",
    usersId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(222, name);
    setNewsSelectInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(newsSelectInfo);
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
    console.log("addnews", newsSelectInfo);
    let s = false;
    if (newsSelectInfo.isConsidered === "true") {
      s = true;
    } else {
      s = false;
    }
    await axioc
      .post(baseUrl + "/addnews", {
        newTitle: newsSelectInfo.newTitle,
        newDescription: newsSelectInfo.newDescription,
        dataNew: newsSelectInfo.dataNew,
        imageNew: newsSelectInfo.imageNew,
        isConsidered: s,
        usersId: newsSelectInfo.usersId,
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
    console.log("updatenews", newsSelectInfo);
    let s = false;
    if (newsSelectInfo.isConsidered === "true") {
      s = true;
    } else {
      s = false;
    }
    await axioc
      .put(baseUrl + "/updatenews", {
        guidNewsId: newsSelectInfo.guidNewsId,
        newTitle: newsSelectInfo.newTitle,
        newDescription: newsSelectInfo.newDescription,
        dataNew: newsSelectInfo.dataNew,
        imageNew: newsSelectInfo.imageNew,
        isConsidered: s,
        usersId: newsSelectInfo.usersId,
      })
      .then((response) => {
        var dataEvent = data;
        dataEvent.forEach((event) => {
          if (event.guidNewsId === newsSelectInfo.guidNewsId) {
            event.newTitle = newsSelectInfo.newTitle;
            event.newDescription = newsSelectInfo.newDescription;
            event.dataNew = newsSelectInfo.dataNew;
            event.imageNew = newsSelectInfo.imageNew;
            event.isConsidered = newsSelectInfo.isConsidered;
            event.usersId = newsSelectInfo.usersId;
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
    console.log("deletenews", newsSelectInfo);
    await axioc
      .delete(baseUrl + "/deletenews/" + newsSelectInfo.guidNewsId, {
        guidNewsId: newsSelectInfo.guidNewsId,
      })
      .then((response) => {
        setData(
          data.filter((event) => event.guidNewsId !== newsSelectInfo.guidNewsId)
        );
        openCloseModalDelete();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const selectNews = (name, caso) => {
    console.log(111, name);
    setNewsSelectInfo(name);
    caso === "Editar" ? openCloseModalEdit() : openCloseModalDelete();
  };

  const openCloseModalInsert = () => {
    setModalInserNews(!modalInserNews);
  };

  const openCloseModalEdit = () => {
    setModalEditNews(!modalEditNews);
  };

  const openCloseModalDelete = () => {
    setModalDeleteNews(!modalDeleteNews);
  };

  useEffect(() => {
    servicGet();
  }, []);

  const bodyInsertar = (
    <div className={styles.modal}>
      <h3>New news</h3>
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
          Insert
        </Button>
        <Button onClick={() => openCloseModalInsert()}>Cancel</Button>
      </div>
    </div>
  );

  const bodyEdit = (
    <div className={styles.modal}>
      <h3>Edit news</h3>
      <TextField
        className={styles.inputMaterial}
        label="NewTitle"
        name="newTitle"
        onChange={handleChange}
        value={newsSelectInfo && newsSelectInfo.newTitle}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="NewDescription"
        name="newDescription"
        onChange={handleChange}
        value={newsSelectInfo && newsSelectInfo.newDescription}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        //label="PlannedStartDate"
        type="datetime-local"
        name="dataNew"
        onChange={handleChange}
        value={newsSelectInfo && newsSelectInfo.dataNew}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="ImageNew"
        name="imageNew"
        onChange={handleChange}
        value={newsSelectInfo && newsSelectInfo.imageNew}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="IsConsidered"
        name="isConsidered"
        onChange={handleChange}
        value={newsSelectInfo && newsSelectInfo.isConsidered}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="UsersId"
        name="usersId"
        onChange={handleChange}
        value={newsSelectInfo && newsSelectInfo.usersId}
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
        Are you sure you want to delete the news{" "}
        <b>{newsSelectInfo && newsSelectInfo.guidNewsId}</b>?{" "}
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
      <Button onClick={() => openCloseModalInsert()}>Insert News</Button>
      <br />
      <br />
      <MaterialTable
        title="Table News"
        columns={colums}
        data={data}
        actions={[
          {
            icon: "edit",
            tooltip: "Edit News",
            onClick: (event, rowData) => selectNews(rowData, "Editar"),
          },
          {
            icon: "delete",
            tooltip: "Delete News",
            onClick: (event, rowData) => selectNews(rowData, "Delete"),
          },
        ]}
        options={{
          actionsColumnIndex: -1,
        }}
      />

      <Modal open={modalInserNews} onClose={openCloseModalInsert}>
        {bodyInsertar}
      </Modal>
      <Modal open={modalEditNews} onClose={openCloseModalEdit}>
        {bodyEdit}
      </Modal>
      <Modal open={modalDeleteNews} onClose={openCloseModalDelete}>
        {bodyDelete}
      </Modal>
    </div>
  );
}

export default NewsFunctions;
