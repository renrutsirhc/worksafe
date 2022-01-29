import React, { useState } from "react";
import { ListGroup } from "reactstrap";
import { Card, Button } from "react-bootstrap"

const ViewEntry = (props) => {

    return (
        <div className="view-entry">
            <Card>
                <Card.Header as="h5">{props.Title}</Card.Header>
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                        Card entry data here the card's content.
                    </Card.Text>
                    <Button variant="primary">Explore</Button>
                </Card.Body>
                <Card.Footer as="h5">Card Footer</Card.Footer>
            </Card>
        </div>
    )
};

export default ViewEntry;