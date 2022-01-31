import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { Card, Button } from "react-bootstrap";
import "../styles/view-entry.css";

const ViewEntry = (props) => {
  console.log(props.entry);
  return (
    <div className="view-entry">
      <Card>
        <Card.Header style={{ backgroundColor: "#ffcc80" }} as="h4">
          {props.entry.Description}
          <div className="EditButton">
            <Button variant="light">
              <FontAwesomeIcon icon={faPenToSquare} />
            </Button>
          </div>
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
