import React, { useState } from "react";
import { ListGroup } from "reactstrap";
import { Card, Button, Form, FloatingLabel, Dropdown, FormControl, DropdownButton, InputGroup } from "react-bootstrap"

const ViewEntry = (props) => {

    return (
        <div className="view-entry">
            <Card>
                <Card.Header as="h5">{props.entry.Description}</Card.Header>
                <Card.Body>
                    <Card.Title>New Entry</Card.Title>
                    <Card.Text>
                        Enter the details below:
                    </Card.Text>
                    <>
                        <InputGroup className="mb-3">
                            <DropdownButton
                                variant="outline-secondary"
                                title="Date Picker"
                                id="input-group-dropdown-1"
                            >
                                <Dropdown.Item href="#">Date 1</Dropdown.Item>
                                <Dropdown.Item href="#">Date 2</Dropdown.Item>
                                <Dropdown.Item href="#">Date 3</Dropdown.Item>
                            </DropdownButton>
                        </InputGroup>
                        <FloatingLabel controlId="floatingTextarea" label="Title" className="mb-3">
                            <Form.Control as="textarea" placeholder="Project title" />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingTextarea2" label="Description">
                            <Form.Control
                                as="textarea"
                                placeholder="Description of the project"
                                style={{ height: '100px' }}
                            />
                        </FloatingLabel>
                        <Form.Select aria-label="Default select example">
                            <option>Pillers picker</option>
                            <option value="1">Embedding</option>
                            <option value="2">Resources</option>
                            <option value="3">Needs</option>
                            <option value="4">Leadership</option>
                            <option value="5">Connection</option>
                        </Form.Select>
                    </>
                    <Button variant="primary">Save Entry</Button>
                </Card.Body>
                <Card.Footer as="h5">Card Footer</Card.Footer>
            </Card>
        </div>
    )
};

export default ViewEntry;