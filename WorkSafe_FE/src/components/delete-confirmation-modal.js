import React, { Component } from "react";
import { Button, Modal } from 'react-bootstrap';

class DeleteConfirmationModal extends Component {
    constructor() {
        super();
    }

    render() {
        return (<div>
            <Modal show={this.props.show} onHide={this.props.handleModal} centered>
                <Modal.Header closeButton><h4>Delete Confirmation</h4></Modal.Header>
                <Modal.Body>Are you sure you want to delete this entry?</Modal.Body>
                <Modal.Body><b>Entry Title - </b>{this.props.deletingEntry.Title}</Modal.Body>
                <Modal.Body><b>Projiect Title - </b>{this.props.deletingEntry.Project.Title}</Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.handleModal} className="btn btn-secondary">Cancel</Button>
                    <Button onClick={this.props.deleteEntry} className="btn btn-danger">Delete</Button>
                </Modal.Footer>
            </Modal>
        </div>
        );
    }
}
export default DeleteConfirmationModal;