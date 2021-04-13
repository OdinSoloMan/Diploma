import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import axioc from "axios";
import { Modal, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const colums = [
  { title: "GuidEventsId", field: "guidEventsId" },
  { title: "EventTitle", field: "eventTitle" },
  { title: "DescriptionOfTheEvent", field: "descriptionOfTheEvent" },
  { title: "PlannedStartDate", field: "plannedStartDate" },
  { title: "ImageEvents", field: "imageEvents" },
  { title: "IsConsidered", field: "isConsidered" },
  { title: "UsersId", field: "usersId" },
];

const baseUrl = "https://localhost:44367/events";

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

function EventFunctions() {
  const styles = useStyles();
  const [data, setData] = useState([]);
  const [modalInserEvents, setModalInserEvents] = useState(false);
  const [modalEditEvents, setModalEditEvents] = useState(false);
  const [modalDeleteEvents, setModalDeleteEvents] = useState(false);
  const [eventsSelectInfo, setEventsSelectInfo] = useState({
    guidEventsId: "",
    eventTitle: "",
    descriptionOfTheEvent: "",
    plannedStartDate: "",
    imageEvents: "",
    isConsidered: "",
    usersId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(222, name);
    setEventsSelectInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(eventsSelectInfo);
  };

  const servicGet = async () => {
    await axioc
      .get(baseUrl + "/readallevents")
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addSerivcPost = async () => {
    console.log("addevents", eventsSelectInfo);
    let s = false;
    if (eventsSelectInfo.isConsidered === "true") {
      s = true;
    } else {
      s = false;
    }
    await axioc
      .post(baseUrl + "/addevents", {
        eventTitle: eventsSelectInfo.eventTitle,
        descriptionOfTheEvent: eventsSelectInfo.descriptionOfTheEvent,
        plannedStartDate: eventsSelectInfo.plannedStartDate,
        imageEvents: eventsSelectInfo.imageEvents,
        isConsidered: s,
        usersId: eventsSelectInfo.usersId,
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
    console.log("updateevents", eventsSelectInfo);
    let s = false;
    if (eventsSelectInfo.isConsidered === "true") {
      s = true;
    } else {
      s = false;
    }
    await axioc
      .put(baseUrl + "/updateevents", {
        guidEventsId: eventsSelectInfo.guidEventsId,
        eventTitle: eventsSelectInfo.eventTitle,
        descriptionOfTheEvent: eventsSelectInfo.descriptionOfTheEvent,
        plannedStartDate: eventsSelectInfo.plannedStartDate,
        imageEvents: eventsSelectInfo.imageEvents,
        isConsidered: s,
        usersId: eventsSelectInfo.usersId,
      })
      .then((response) => {
        var dataEvent = data;
        dataEvent.forEach((event) => {
          if (event.guidEventsId === eventsSelectInfo.guidEventsId) {
            event.eventTitle = eventsSelectInfo.eventTitle;
            event.descriptionOfTheEvent =
              eventsSelectInfo.descriptionOfTheEvent;
            event.plannedStartDate = eventsSelectInfo.plannedStartDate;
            event.imageEvents = eventsSelectInfo.imageEvents;
            event.isConsidered = eventsSelectInfo.isConsidered;
            event.usersId = eventsSelectInfo.usersId;
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
    console.log("delete", eventsSelectInfo);
    await axioc
      .delete(baseUrl + "/deleteevents/" + eventsSelectInfo.guidEventsId, {
        guidEventsId: eventsSelectInfo.guidEventsId,
      })
      .then((response) => {
        setData(
          data.filter(
            (event) => event.guidEventsId !== eventsSelectInfo.guidEventsId
          )
        );
        openCloseModalDelete();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const selectEvents = (name, caso) => {
    console.log(111, name);
    setEventsSelectInfo(name);
    caso === "Editar" ? openCloseModalEdit() : openCloseModalDelete();
  };

  const openCloseModalInsert = () => {
    setModalInserEvents(!modalInserEvents);
  };

  const openCloseModalEdit = () => {
    setModalEditEvents(!modalEditEvents);
  };

  const openCloseModalDelete = () => {
    setModalDeleteEvents(!modalDeleteEvents);
  };

  useEffect(() => {
    servicGet();
  }, []);

  const bodyInsertar = (
    <div className={styles.modal}>
      <h3>New events</h3>
      <TextField
        className={styles.inputMaterial}
        label="EventTitle"
        name="eventTitle"
        onChange={handleChange}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="DescriptionOfTheEvent"
        name="descriptionOfTheEvent"
        onChange={handleChange}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        //label="PlannedStartDate"
        type="datetime-local"
        name="plannedStartDate"
        onChange={handleChange}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="ImageEvents"
        name="imageEvents"
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
      <h3>Edit events</h3>
      <TextField
        className={styles.inputMaterial}
        label="EventTitle"
        name="eventTitle"
        onChange={handleChange}
        value={eventsSelectInfo && eventsSelectInfo.eventTitle}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="DescriptionOfTheEvent"
        name="descriptionOfTheEvent"
        onChange={handleChange}
        value={eventsSelectInfo && eventsSelectInfo.descriptionOfTheEvent}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        type="datetime-local"
        name="plannedStartDate"
        onChange={handleChange}
        value={eventsSelectInfo && eventsSelectInfo.plannedStartDate}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="ImageEvents"
        name="imageEvents"
        onChange={handleChange}
        value={eventsSelectInfo && eventsSelectInfo.imageEvents}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="IsConsidered"
        name="isConsidered"
        onChange={handleChange}
        value={eventsSelectInfo && eventsSelectInfo.isConsidered}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="UsersId"
        name="usersId"
        onChange={handleChange}
        value={eventsSelectInfo && eventsSelectInfo.usersId}
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
        Are you sure you want to delete the events{" "}
        <b>{eventsSelectInfo && eventsSelectInfo.guidEventsId}</b>?{" "}
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
      <Button onClick={() => openCloseModalInsert()}>Insert Events</Button>
      <br />
      <br />
      <MaterialTable
        title="Table Events"
        columns={colums}
        data={data}
        actions={[
          {
            icon: "edit",
            tooltip: "Edit events",
            onClick: (event, rowData) => selectEvents(rowData, "Editar"),
          },
          {
            icon: "delete",
            tooltip: "Delete events",
            onClick: (event, rowData) => selectEvents(rowData, "Delete"),
          },
        ]}
        options={{
          actionsColumnIndex: -1,
        }}
      />

      <Modal open={modalInserEvents} onClose={openCloseModalInsert}>
        {bodyInsertar}
      </Modal>
      <Modal open={modalEditEvents} onClose={openCloseModalEdit}>
        {bodyEdit}
      </Modal>
      <Modal open={modalDeleteEvents} onClose={openCloseModalDelete}>
        {bodyDelete}
      </Modal>
    </div>
  );
}

export default EventFunctions;
