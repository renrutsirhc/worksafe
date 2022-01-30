import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFloppyDisk,
    faPlus,
    faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { Card, Button } from "react-bootstrap";

const ViewEntry = (props) => {
    return (
        <div className="view-entry">
            <Card>
                <Card.Header style={{ backgroundColor: "#ffcc80" }} as="h4">
                    {props.entry.Description}
                    <Button variant="light" className="mb-3"><FontAwesomeIcon icon={faFloppyDisk} /></Button>
                    <Button variant="light" className="mb-3"><FontAwesomeIcon icon={faPlus} /></Button>
                    <Button variant="light" className="mb-3"><FontAwesomeIcon icon={faPenToSquare} /></Button>
                </Card.Header>
                <Card.Body>
                    <Card.Text> Card properties</Card.Text>
                </Card.Body>
                <Card.Footer style={{ backgroundColor: "#fff3e0" }} as="h6">
                    Last Updated {props.entry.TimeStamp} by {props.entry.Id}
                </Card.Footer>
            </Card>
        </div>
    );
};

export default ViewEntry;
