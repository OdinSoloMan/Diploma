import React, { Component } from 'react'
import { Modal, Button, Row, Col, Form } from 'react-bootstrap'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'

export class EditNewsModal extends Component {
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

    fetch('https://localhost:44367/news/updatenews', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        GuidNewsId: event.target.GuidNewsId.value,
        newTitle: event.target.newTitle.value,
        newDescription: event.target.newDescription.value,
        dataNew: event.target.dataNew.value,
        imageNew: event.target.imageNew.value
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
              Edit News
              </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col sm={10}>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlId="GuidNewsId">
                    <Form.Label>GuidNewsId</Form.Label>
                    <Form.Control
                      type="text"
                      name="GuidNewsId"
                      disabled
                      defaultValue={this.props.depid}
                      placeholder="GuidNewsId"
                    />
                  </Form.Group>
                  <Form.Group controlId="newTitle">
                    <Form.Label>newTitle</Form.Label>
                    <Form.Control
                      type="text"
                      name="newTitle"
                      required
                      defaultValue={this.props.depnewtitle}
                      placeholder="newTitle"
                    />
                  </Form.Group>
                  <Form.Group controlId="newDescription">
                    <Form.Label>newDescription</Form.Label>
                    <Form.Control
                      type="text"
                      name="newDescription"
                      required
                      defaultValue={this.props.depnewdescription}
                      placeholder="newDescription"
                    />
                  </Form.Group>
                  <Form.Group controlId="dataNew">
                    <Form.Label>dataNew</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      name="dataNew"
                      required
                      defaultValue={this.props.depdatanew}
                      placeholder="dataNew"
                    />
                  </Form.Group>
                  <Form.Group controlId="imageNew">
                    <Form.Label>imageNew</Form.Label>
                    <Form.Control
                      type="text"
                      name="imageNew"
                      required
                      defaultValue={this.props.depimagenew}
                      placeholder="imageNew"
                    />
                  </Form.Group>
                  <Form.Group>
                    <Button variant="primary" type="submit">
                      Update News
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