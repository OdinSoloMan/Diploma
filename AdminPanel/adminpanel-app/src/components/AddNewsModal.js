import React, {Component} from 'react'
import {Modal, Button, Row, Col, Form} from 'react-bootstrap'

export class AddNewsModal extends Component{
    constructor(props){
        super(props);
    }
  
  render(){
    return(
        <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="container">
                To Add from fiels for News
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button  onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
        );
    }
}