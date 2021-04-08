import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

export class AddEventsModal extends Component {
  constructor(props) {
    super(props);

    this.state = { snackbaropen: false, snackbarmsg: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  snackbarClose = (event) => {
    this.setState({ snackbaropen: false });
  }


  handleSubmit(event) {
    event.preventDefault();

    fetch('https://localhost:44367/events/addevents', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        eventTitle: event.target.eventTitle.value,
        descriptionOfTheEvent: event.target.descriptionOfTheEvent.value,
        plannedStartDate: event.target.plannedStartDate.value,
        plannedEndDate: event.target.plannedEndDate.value,
        imageEvents: event.target.imageEvents.value
      })
    })
      .then(res => res.json())
      .then((result) => {
        //alert(result);
        this.setState({ snackbaropen: true, snackbarmsg: result });
      },
        (error) => {
          //alert('Failed')
          this.setState({ snackbaropen: true, snackbarmsg: 'failed' });
        })
  }

  render() {
    return (
      <div className="container">
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          open={this.state.snackbaropen}
          autoHideDuration={3000}
          onClose={this.snackbarClose}

          message={<span id="message-id">{this.state.snackbarmsg}</span>}
          action={[
            <IconButton
              key="close"
              arial-label="Close"
              color="inherit"
              onClick={this.snackbarClose}
            >
              x
                </IconButton>
          ]}
        />
        <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Add Events
              </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col sm={10}>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlId="eventTitle">
                    <Form.Label>eventTitle</Form.Label>
                    <Form.Control
                      type="text"
                      name="eventTitle"
                      required
                      placeholder="eventTitle"
                    />
                  </Form.Group>
                  <Form.Group controlId="descriptionOfTheEvent">
                    <Form.Label>descriptionOfTheEvent</Form.Label>
                    <Form.Control
                      type="text"
                      name="descriptionOfTheEvent"
                      required
                      placeholder="descriptionOfTheEvent"
                    />
                  </Form.Group>
                  <Form.Group controlId="plannedStartDate">
                    <Form.Label>plannedStartDate</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      name="plannedStartDate"
                      required
                      placeholder="plannedStartDate"
                    />
                  </Form.Group>
                  <Form.Group controlId="plannedEndDate">
                    <Form.Label>plannedEndDate</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      name="plannedEndDate"
                      required
                      placeholder="plannedEndDate"
                    />
                  </Form.Group>
                  <Form.Group controlId="imageEvents">
                    <Form.Label>imageEvents</Form.Label>
                    <Form.Control
                      type="text"
                      name="imageEvents"
                      required
                      placeholder="imageEvents"
                    />
                  </Form.Group>
                  <Form.Group>
                    <Button variant="primary" type="submit">
                      Add Events
                          </Button>
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}