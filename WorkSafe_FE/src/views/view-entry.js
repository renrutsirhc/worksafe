import React, { useState } from "react";
import { ListGroup } from "reactstrap";
import { Card, Button, Form, FloatingLabel, Dropdown, FormControl, DropdownButton, InputGroup } from "react-bootstrap"

const ViewEntry = (props) => {

    return (
        <div className="view-entry">
            <Card>
                <Card.Header as="h4">Title</Card.Header>
                <Card.Body>
                    <Card.Title>{props.entry.Description}y</Card.Title>
                    <Card.Text>
                    </Card.Text>
                    <Button variant="primary">View Entry</Button>
                </Card.Body>
                <Card.Footer as="h7">Last Updated {new Date().getFullYear()}</Card.Footer>
            </Card>
        </div>
    )
};

export default ViewEntry;