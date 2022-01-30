import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFloppyDisk,
  faPlus,
  faPenToSquare,
  faCoffee,
} from "@fortawesome/free-solid-svg-icons";
import { Card, Button } from "react-bootstrap";

const ViewEntry = (props) => {
  return (
    <div className="view-entry">
      <Card>
        <Card.Header style={{ backgroundColor: "#ffcc80" }} as="h4">
          {props.entry.Description}
        </Card.Header>
        <Card.Body>
          <Card.Text> Card properties</Card.Text>
          <Button variant="light">View Entry</Button>
          <FontAwesomeIcon icon={faFloppyDisk} />
          <FontAwesomeIcon icon={faPlus} />
          <FontAwesomeIcon icon={faPenToSquare} />
          <FontAwesomeIcon icon={faCoffee} />
        </Card.Body>
        <Card.Footer style={{ backgroundColor: "#fff3e0" }} as="h5">
          Last Updated {props.entry.TimeStamp} by {props.entry.Id}
        </Card.Footer>
      </Card>
    </div>
  );
};

export default ViewEntry;
