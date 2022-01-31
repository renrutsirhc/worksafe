import React, { Component } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card } from 'react-bootstrap'
import CardHeader from 'react-bootstrap/esm/CardHeader';
import "../styles/view-entry.css";

class ViewFullEntry extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
        <Card>
            <Card.Header>
                <Button variant="light"><FontAwesomeIcon icon={fa-times-circle} /></Button>
                Full Entry
            </Card.Header>
            <Card.Body>
                <Card.Title>Title</Card.Title>
                <Card.Text>{props.entry.Title}</Card.Text>
                <Card.Title>Date</Card.Title>
                <Card.Text></Card.Text>
                <Card.Title>Description</Card.Title>
                <Card.Text>{props.entry.Description}</Card.Text>
                <Card.Title>Files</Card.Title>
                <Card.Text></Card.Text>
                <Card.Title>Learning</Card.Title>
                <Card.Text>{props.entry.Learning}</Card.Text>
                <Card.Title>Mindset</Card.Title>
                <Card.Text>{props.entry.Mindset}</Card.Text>
                <Card.Title>Impact</Card.Title>
                <Card.Text>{props.entry.Impact}</Card.Text>
                <Card.Title>Next Steps</Card.Title>
                <Card.Text>{props.entry.NextSteps}</Card.Text>
            </Card.Body>
        </Card>    
        )
    }
}

export default ViewFullEntry