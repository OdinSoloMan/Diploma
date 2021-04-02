import React, {Component} from 'react'
import {Modal, Button, Row, Col, Form} from 'react-bootstrap'

import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'

export class AddNewsModal extends Component{
    constructor(props){
        super(props);

        this.state = {snackbaropen : false, snackbarmsg : ''};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    snackbarClose = (event) => {
      this.setState({snackbaropen : false});
    }

    handleSubmit(event){
      event.preventDefault();

      fetch('https://localhost:44367/news/addnews', {
        method :'POST',
        headers : {
          'Authorization' : 'Bearer '+'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMCIsIm5iZiI6MTYxNzM1OTkwMSwiZXhwIjoxNjE3MzYzNTAxLCJpc3MiOiJNeUF1dGhTZXJ2ZXIiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjQ0MzY3LyJ9.SvS81IgBMFGelgBumVV1AkrBllls0bkoyDL-JTNoDPg',
          'Accept' : 'application/json',
          'Content-Type' : 'application/json'
        },
        body :JSON.stringify({
          newTitle : event.target.newTitle.value,
          newDescription : event.target.newDescription.value,
          dataNew :  event.target.dataNew.value,
          imageNew : event.target.imageNew.value
        })
      })
      .then(res => res.json())
      .then((result) =>
      {        
        //alert(result);
        this.setState({snackbaropen : true, snackbarmsg : result});
      },
      (error) => {
        //alert('Failed')
        this.setState({snackbaropen : true, snackbarmsg : 'failed'});
      })
    }
  
    render(){
      return(
        <div className="container">
          <Snackbar
            anchorOrigin={{vertical : 'bottom', horizontal : 'right'}}
            open = {this.state.snackbaropen}
            autoHideDuration = {3000}
            onClose = {this.snackbarClose}

            message = {<span id="message-id">{this.state.snackbarmsg}</span>}
            action = {[
              <IconButton
                key = "close"
                arial-label = "Close"
                color = "inherit"
                onClick = {this.snackbarClose}
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
              Add News
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
                  <Row>
                    <Col sm={8}>
                    <Form onSubmit={this.handleSubmit}>
                      <Form.Group controlId="newTitle">
                        <Form.Label>newTitle</Form.Label>
                        <Form.Control
                          type="text"
                          name="newTitle"
                          required
                          placeholder="newTitle"
                        />                      
                      </Form.Group>
                      <Form.Group controlId="newDescription">
                        <Form.Label>newDescription</Form.Label>
                        <Form.Control
                          type="text"
                          name="newDescription"
                          required
                          placeholder="newDescription"
                        />
                      </Form.Group>
                      <Form.Group controlId="dataNew">
                        <Form.Label>dataNew</Form.Label>
                        <Form.Control
                          type="text"
                          name="dataNew"
                          required
                          placeholder="dataNew"
                        />
                      </Form.Group>
                      <Form.Group controlId="imageNew">
                        <Form.Label>imageNew</Form.Label>
                        <Form.Control
                          type="text"
                          name="imageNew"
                          required
                          placeholder="imageNew"
                        />
                      </Form.Group>
                      <Form.Group>
                        <Button variant="primary" type="submit">
                          Add News
                        </Button>
                      </Form.Group>
                    </Form>
                    </Col>
                  </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button  onClick={this.props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
      );
    }
}