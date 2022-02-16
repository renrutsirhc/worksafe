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
                <Modal.Body><b>Project Title - </b>{this.props.deletingEntry.Project.Title}</Modal.Body>
                <Modal.Footer>
                    <button onClick={this.props.handleModal} className="button button-grey">Cancel</button>
                    <button onClick={this.props.deleteEntry} className="button button-danger">Delete</button>
                </Modal.Footer>
            </Modal>
        </div>
        );
    }
}
export default DeleteConfirmationModal;