import React, { useState } from "react";
import { ListGroup } from "reactstrap";
import { Card, Button, Form, FloatingLabel, Dropdown, FormControl, DropdownButton, InputGroup } from "react-bootstrap"

const ViewEntry = (props) => {

    return (
        <div className="view-entry">
            <Card>
                <Card.Header as="h4">{props.entry.Description}</Card.Header>
                <Card.Body>
                    <Card.Title>Card title</Card.Title>
                    <Card.Text> Card properties
                    </Card.Text>
                    <Button variant="primary">View Entry</Button>
                </Card.Body>
                <Card.Footer as="h7">Last Updated {new Date().getFullYear()}</Card.Footer>
            </Card>
        </div>
    )
};

export default ViewEntry;